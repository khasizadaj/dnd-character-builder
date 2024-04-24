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
		try {
			const formData = request.formData();
			let email = (await formData).get('email');
			let password = (await formData).get('password');
			let result = await loginEmailPassword(email, password);
			return JSON.stringify(result);
		} catch (error) {
			console.error("Login failed.");
			return {
				status: 500,
				message: "Login failed."
			};
		}
	},
	signup: async ({ request }) => {
		try {
			const formData = request.formData();
			let email = (await formData).get('email');
			let password = (await formData).get('password');
			let result = await signupEmailPassword(email, password);
			return JSON.stringify(result);
		} catch (error) {
			console.error("Signup failed.");
			return {
				status: 500,
				message: "Signup failed."
			};
		}
	},
	signout: async () => {
		try {
			let result = await signUserOut();
			return JSON.stringify(result);
		} catch (error) {
			console.error("Signout failed.");
			return {
				status: 500,
				message: "Signout failed."
			};
		}
	}
};