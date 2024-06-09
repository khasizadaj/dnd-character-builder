import { auth } from '$lib/auth.server'
import { redirect } from '@sveltejs/kit';


export async function load({ request }) {
	let user = auth.currentUser;

	if (!user) {
		redirect(307, '/account/signin');
	}
	return {
		user: user?.toJSON(),
	};
}