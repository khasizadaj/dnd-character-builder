import { readFileSync } from 'fs';

export function load() {
	let filename = 'src/uploads/jkhasizada.json';
	const content = readFileSync(filename, 'utf8');
	let data = JSON.parse(content);
	return {
		character: data
	};
}
