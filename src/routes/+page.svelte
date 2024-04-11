<script lang="ts">
	import AbilityScores from '../lib/components/AbilityScores.svelte';

	import 'carbon-components-svelte/css/g90.css';

	import Health from '../lib/components/Health.svelte';
	import Weapon from '$lib/components/Weapon.svelte';
	import Features from '$lib/components/Features.svelte';

	import {
		Tag,
		Grid,
		Row,
		Button,
		Column,
		Tile,
		FileUploader,
		Link,
		Header,
		Content
	} from 'carbon-components-svelte';

	export let data;
	let character = data.character;
	let fileUploader;

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
				character = jsonData;
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
	let isSideNavOpen = false;
</script>

<Header company="DnD" platformName="Character Builder" bind:isSideNavOpen></Header>
<Content>
	<Grid>
		<Row>
			<Column noGutter md={1} lg={2}></Column>
			<Column noGutter md={14} lg={12}>
				<Tile>
					<FileUploader
						bind:this={fileUploader}
						labelTitle="Add character details"
						buttonLabel="Add file"
						accept={['.json	']}
						status="complete"
						on:change={(files) => loadCharacterFile(files)}
					>
						<span slot="labelDescription"
							>Only JSON files are accepted. See sample character file
							<Link
								target="_blank"
								href="https://gist.github.com/khasizadaj/66804c314e9e31b0d148b68057e4564a"
								>here</Link
							>.
						</span>
					</FileUploader>
				</Tile>
				<div class="character-details">
					<div class="image" style="background-color: gray"></div>
					<h1>{character.name}</h1>
					<h4>
						{character.level}th level {character.class}
					</h4>
					<div class="info">
						<Tag size="default">Gender: {character.gender}</Tag>
						<Tag>Race: {character.race}</Tag>
						<Tag>Hair: {character.hair_color}</Tag>
						<Tag>Eye color: {character.eye_color}</Tag>
						<Tag>Skin color: {character.skin_color}</Tag>
						<Tag>Weight: {character.weight}</Tag>
						<Tag>Height: {character.height}</Tag>
					</div>
				</div>
				<AbilityScores {data} />
				<Health {character}></Health>
				<div>
					<Tile>
						<h1>Weapons</h1>
					</Tile>
					{#each character.weapons as weapon}
						<Weapon {weapon} {character} />
					{/each}
				</div>
				<Features {character}/>
			</Column>
			<Column noGutter md={1} lg={2}></Column>
		</Row>
	</Grid>
</Content>

<style>
	h1,
	h4 {
		text-align: center;
	}

	.character-details {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 1rem;
		margin: 1rem;
	}

	.character-details .image {
		background-size: cover;
		width: 400px;
		max-width: 100%;
		aspect-ratio: 1/1;
		border-radius: 16px;
		overflow: hidden;
		margin-bottom: 24px;
	}

	.character-details .info {
		margin-top: 1rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 12px;
	}

	@media (max-width: 400px) {
		.character-details .image {
			width: 100%;
		}
	}
</style>
