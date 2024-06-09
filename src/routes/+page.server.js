import default_character from '../uploads/jkhasizada.json'
import { auth } from '$lib/auth.server'
import { redirect } from '@sveltejs/kit';

export async function load({ fetch }) {
	let user = auth.currentUser;
	if (user) {
		redirect(307, '/app');
	}
}
