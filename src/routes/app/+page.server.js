import default_character from '../../uploads/jkhasizada.json'
import { auth } from '$lib/auth.server'
import { redirect } from '@sveltejs/kit';

export async function load({ fetch }) {
	let user = auth.currentUser;
	if (!user) {
		redirect(307, '/account/signin');
	}

	const fetchCharacter = async (user) => {
		if (!user) {
			return new Promise(function (resolve) {
				resolve({
					isSample: true,
					data: default_character
				});
			});
		}

		let res = await fetch(`/character`);
		let character = await res.json();
		if (res.status === 200) {
			return new Promise(function (resolve) {
				resolve({
					isSample: false,
					data: character.data
				});
			});
		};
		return new Promise(function (resolve) {
			resolve({
				isSample: false,
				data: null
			});
		});
	}

	return {
		user: user?.toJSON(),
		character: fetchCharacter(user)
	};
}
