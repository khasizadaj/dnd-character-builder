<script lang="ts">
	import { Accordion, AccordionItem, FileUploader, Link, Tile } from 'carbon-components-svelte';
	import { schemaValidator, characterSchema } from '$lib/schema';
	import { InformationSquareFilled } from 'carbon-icons-svelte';
	import type { ErrorObject } from 'ajv';
	import { characterInMemory } from '$lib/stores';
	import { page } from '$app/stores';

	const validate = schemaValidator.compile(characterSchema);
	let fileUploader;

	let validation: any;
	$: isInvalid = false;

	const loadCharacterFile = async (files) => {
		let characterDetails: any;
		const file = files.detail[0];
		const reader = new FileReader();
		reader.onload = () => {
			try {
				const fileContent = reader.result?.toString();
				if (!fileContent) {
					return;
				}
				const jsonData = JSON.parse(fileContent);
				validation = validate(jsonData);
				if (!validation) {
					console.error(validate.errors);
					isInvalid = true;
				} else {
					console.log('All is well.');
					isInvalid = false;
					if ($page.data.user) {
						fetch('/character', {
							method: 'POST',
							headers: {
								'Content-type': 'application/json'
							},
							body: JSON.stringify(jsonData)
						}).then((response) => {
							if (!response.ok) {
								// TODO Show error message to user
								console.error('Failed to save character.');
								characterDetails = new Promise(function (resolve) {
									resolve({
										isSample: true,
										data: null
									});
								});
								characterInMemory.set(characterDetails);
								return;
							}
							console.log('Character saved to database successfully.');
						});
					}
					/* Show laoded file in UI. This doesn't guarantee that the file is svaed to database.
					 * User will be informed about the status of the file saving to database.
					 */
					characterDetails = new Promise(function (resolve) {
						resolve({
							isSample: false,
							data: jsonData
						});
					});
					characterInMemory.set(characterDetails);
				}
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

	const getFriendlyMessage = (error: ErrorObject) => {
		console.log(error);
		let parts = error.instancePath.slice(1).split('/');
		if (error.keyword === 'required') {
			return `"${error.params.missingProperty} is required property.`;
		}
		if (error.keyword === 'type') {
			return `"${parts[parts.length - 1]}" should be of type ${error.params.type}.`;
		}
	};
	const getFriendlyInstancePath = (error: ErrorObject) => {
		console.log(error);
		let parts = error.instancePath.split('/');
		if (parts.length === 1) {
			return 'root';
		}
		return `root => ${parts.slice(1).join(' => ')}`;
	};

	const toSentenceCase = (text: string) => {
		return text.charAt(0).toUpperCase() + text.slice(1);
	};
</script>

<Tile>
	<FileUploader
		bind:this={fileUploader}
		labelTitle="Add your character"
		buttonLabel="Add file"
		accept={['.json']}
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
	{#if isInvalid}
		<div class="border-solid border-red-400 border-2">
			<div class="flex items-center gap-2 p-2 border-b-2 border-solid border-red-400">
				<InformationSquareFilled size={24} class="text-red-400" />
				<h5 class="text-base text-red-400">Invalid character file</h5>
			</div>
			<div class="flex flex-col gap-4">
				<Accordion>
					{#each validate.errors as error, index}
						<AccordionItem>
							<div slot="title">
								{getFriendlyMessage(error) || 'Error'}
							</div>
							<p>
								Description: <span class="font-medium"
									>{toSentenceCase(error.message.toString())}
								</span>
							</p>
							<p>
								Where: <span class="font-mono">
									{getFriendlyInstancePath(error) || 'Error'}
								</span>
							</p>
						</AccordionItem>
					{/each}
				</Accordion>
			</div>
		</div>
	{/if}
</Tile>
