import character from '../uploads/jkhasizada.json'
import { userStore } from '$lib/stores'
import { browser } from '$app/environment';
import { loginEmailPassword, signupEmailPassword, signUserOut, monitorAuthState } from './auth.server'

/** @type {import('./$types').PageServerLoad} */
export function load() {
	let isAuthenticated = true;
	if (browser)
		isAuthenticated = Boolean(localStorage.getItem("user-isAuthenticated"));
	userStore.update((value) => ({ ...value, isAuthenticated }));
	return {
		character: character
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	signin: async ({ request }) => {
		const formData = request.formData();
		let email = (await formData).get('email');
		let password = (await formData).get('password');
		loginEmailPassword(email, password);
		monitorAuthState;
		return { success: true };
	},
	signup: async ({ request }) => {
		const formData = request.formData();
		let email = (await formData).get('email');
		let password = (await formData).get('password');

		signupEmailPassword(email, password);
		monitorAuthState;
		return { success: true };
	},
	signout: async () => {
		signUserOut();
		monitorAuthState;
		return { success: true };
	}
};