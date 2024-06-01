import { auth } from '$lib/auth.server'


export async function load({ request }) {
	let user = auth.currentUser;
	return {
		user: user?.toJSON(),
	};
}