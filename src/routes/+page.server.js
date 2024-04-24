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
		let result = await loginEmailPassword(email, password);
		return JSON.stringify(result);
	},
	signup: async ({ request }) => {
		const formData = request.formData();
		let email = (await formData).get('email');
		let password = (await formData).get('password');
		let result = await signupEmailPassword(email, password);
		return JSON.stringify(result);
	},
	signout: async () => {
		signUserOut();
		// monitorAuthState;
		return { success: true };
	}
};