import default_character from '../uploads/jkhasizada.json'
import { loginEmailPassword, signupEmailPassword, signUserOut, auth } from '$lib/auth.server'

export async function load({ fetch }) {
	let user = auth.currentUser;
	const fetchCharacter = async (user) => {
		if (!user) return default_character;

		let res = await fetch(`/character`);
		let character = await res.json();
		return character;
	}
	return {
		user: user?.toJSON(),
		character: fetchCharacter(user)
	};
}
