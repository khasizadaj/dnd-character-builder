<script>
	import Ajv from 'ajv';
	import { FileUploader, Link, Tile } from 'carbon-components-svelte';

	export let characterDetails;

	let fileUploader;
	const ajv = new Ajv();

	const schema = {
		type: 'object',
		properties: {
			name: { type: 'string' },
			class: { type: 'string' },
			level: { type: 'integer' },
			race: { type: 'string' },
			gender: { type: 'string' },
			abilityScores: {
				type: 'array',
				maxItems: 6,
				minItems: 6,
				items: {
					type: 'object',
					properties: {
						type: { type: 'string' },
						score: { type: 'integer' },
						proficient: { type: 'boolean' }
					},
					required: ['type', 'score', 'proficient']
				}
			},
			weapons: {
				type: 'array',
				items: {
					type: 'object',
					properties: {
						name: { type: 'string' },
						dice: {
							type: 'array',
							items: {
								type: 'object',
								properties: {
									count: { type: 'integer' },
									type: { type: 'integer' },
									damage: { type: 'string' }
								},
								required: ['count', 'type', 'damage']
							}
						},
						attackAbility: { type: 'string' }
					},
					required: ['name', 'dice', 'attackAbility', 'modifier']
				}
			},
			feature_sources: {
				type: 'array',
				items: {
					type: 'object',
					properties: {
						type: { type: 'string' },
						title: { type: 'string' },
						features: {
							type: 'array',
							items: {
								type: 'object',
								properties: {
									title: { type: 'string' },
									acccessedLevel: { type: 'number', minimum: 1 },
									description: {
										type: 'array',
										items: {
											type: 'string'
										}
									}
								}
							}
						}
					}
				}
			}
		},
		required: ['name', 'class', 'level', 'abilityScores', 'weapons'],
		additionalProperties: true
	};
	const validate = ajv.compile(schema);
	const loadCharacterFile = (files) => {
		const file = files.detail[0];
		const reader = new FileReader();
		reader.onload = () => {
			try {
				const fileContent = reader.result?.toString();
				if (!fileContent) {
					return;
				}
				const jsonData = JSON.parse(fileContent);
				let validJson = validate(jsonData);
				if (!validJson) {
					console.error(validate.errors);
				} else {
					console.log('All is well.');
				}
				console.log(jsonData);
				// if ($page.data.user) {
				// 	fetch('/character', {
				// 		method: 'POST',
				// 		headers: {
				// 			'Content-type': 'application/json'
				// 		},
				// 		body: JSON.stringify(jsonData)
				// 	}).then((response) => {
				// 		if (!response.ok) {
				// 			console.error('Failed to save character.');
				// 			characterDetails = new Promise(function (resolve) {
				// 				resolve({
				// 					isSample: true,
				// 					data: null
				// 				});
				// 			});
				// 			return;
				// 		}
				// 		console.log('Character saved to database successfully.');
				// 	});
				// }
				characterDetails = new Promise(function (resolve) {
					resolve({
						isSample: false,
						data: jsonData
					});
				});
			} catch (e) {
				console.error('Error parsing JSON:', e);
				return;
			}
		};

		reader.onerror = (error) => {
			console.error('File reading error:', error);
			return;
		};
		reader.readAsText(file);
	};
</script>

<Tile>
	<FileUploader
		bind:this={fileUploader}
		labelTitle="Add your character"
		buttonLabel="Add file"
		accept={['.json	']}
		status="complete"
		on:change={(files) => loadCharacterFile(files)}
	>
		<article slot="labelDescription">
			Only JSON files are accepted. See sample character file
			<Link
				target="_blank"
				href="https://gist.github.com/khasizadaj/66804c314e9e31b0d148b68057e4564a">here</Link
			>.
			<p style="font-size: inherit">
				<strong>[ NOTE ]</strong> Currently sample data is loaded from example character of mine.
			</p>
		</article>
	</FileUploader>
</Tile>
