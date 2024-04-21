import character from '../uploads/jkhasizada.json'
import { loginEmailPassword, signupEmailPassword, signUserOut } from '$lib/auth.server'

export function load() {
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
		// monitorAuthState;
		return { success: true };
	},
	signup: async ({ request }) => {
		const formData = request.formData();
		let email = (await formData).get('email');
		let password = (await formData).get('password');

		signupEmailPassword(email, password);
		// monitorAuthState;
		return { success: true };
	},
	signout: async () => {
		signUserOut();
		// monitorAuthState;
		return { success: true };
	}
};