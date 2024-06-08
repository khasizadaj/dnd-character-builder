<script lang="ts">
	import {
		Tag,
		Tile,
		FileUploader,
		Link,
		Tabs,
		Tab,
		TabContent,
		Loading,
		Button,
		UnorderedList,
		ListItem
	} from 'carbon-components-svelte';
	import {
		ArrowDownRight,
		HealthCross,
		InformationSquareFilled,
		ManageProtection,
		ToolKit,
		WatsonHealthBrushFreehand
	} from 'carbon-icons-svelte';

	import { config as configStore } from '$lib/stores';

	import Authentication from '../lib/components/Authentication.svelte';
	import AbilityScores from '../lib/components/AbilityScores.svelte';
	import Health from '../lib/components/Health.svelte';
	import Weapon from '$lib/components/Weapon.svelte';
	import Features from '$lib/components/Features.svelte';

	import type { Config } from '$lib/types';

	export let data;
	import { page } from '$app/stores';

	let { character: characterDetails } = data;

	$: user = data.user;

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
				if ($page.data.user) {
					fetch('/character', {
						method: 'POST',
						headers: {
							'Content-type': 'application/json'
						},
						body: JSON.stringify(jsonData)
					}).then((response) => {
						if (!response.ok) {
							console.error('Failed to save character.');
							characterDetails = new Promise(function (resolve) {
								resolve({
									isSample: true,
									data: null
								});
							});
							return;
						}
						console.log('Character saved to database successfully.');
					});
				}
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

	let config: Config;
	configStore.subscribe((value: Config) => {
		config = { ...value };
	});
</script>

<section class="mt-16 mb-28 md:mt-32 md:mb-56">
	<h2 class="mb-4 text-4xl">Unleash Your Inner Hero with the DnD Character Builder!</h2>
	<p class="mb-4 text-base">
		Elevate your Dungeons & Dragons experience with our intuitive Character Builder. Craft unique
		characters effortlessly and access powerful in-game tools to enhance your adventures.
	</p>
	<Button size="field" icon={ArrowDownRight}>Get started now</Button>
</section>

<section class="mb-16">
	<h2 class="mb-4 text-2xl">Why Choose the DnD Character Builder?</h2>
	<div class="flex gap-4 flex-col md:flex-row">
		<Tile class="flex-1">
			<WatsonHealthBrushFreehand size={24} class="mb-2" />
			<h4 class="mb-1 text-lg font-bold text-left">Effortless Customization</h4>
			<p class="text-base">Create distinct characters without the hassle</p>
		</Tile>
		<Tile class="flex-1">
			<ToolKit size={24} class="mb-2" />
			<h4 class="mb-1 text-lg font-bold text-left">Game-Ready Tools</h4>
			<p class="text-base">Enhance your gameplay with essential, easy-to-use tools.</p>
		</Tile>
	</div>
</section>

<section class="mb-16">
	<h2 class="mb-4 text-2xl">Why Choose the DnD Character Builder?</h2>
	<div class="flex gap-4 flex-col">
		<Tile>
			<HealthCross size={24} class="mb-2" />
			<h4 class="mb-1 text-lg font-bold text-left">Health Points Tracker</h4>
			<p class="text-base">
				Effortlessly monitor your character's health, adjust HP with a click, and reset after rests
				for fast-paced combat.
			</p>
		</Tile>
		<Tile>
			<ManageProtection size={24} class="mb-2" />
			<h4 class="mb-1 text-lg font-bold text-left">Weapon Manager</h4>
			<p class="text-base">
				Master your attacks! View your weapon stats, let the tool roll for you, and get detailed
				breakdowns of attack and damage results.
			</p>
		</Tile>
		<Tile>
			<ManageProtection size={24} class="mb-2" />
			<h4 class="mb-1 text-lg font-bold text-left">Ability Tracker</h4>
			<p class="text-base">Keep tabs on your character's skills and abilities.</p>
		</Tile>
		<Tile class=" bg-emerald-700">
			<InformationSquareFilled size={24} class="mb-2" />
			<h4 class="mb-1 text-lg font-bold text-left">New tools are on the way...</h4>
			<p class="text-base">
				Exciting new tools are on the way to make your gameplay even more immersive. Stay tuned!
			</p>
		</Tile>
	</div>
</section>

<section>
	<br />
	<br />
</section>

<section class="hero-section">
	<h2 class="hero-heading">
		Ready to streamline your D&D adventures? Dive in and simplify your journey!
	</h2>
	<Button size="field" icon={ArrowDownRight}>Get started now!</Button>
	<br />
	<br />
</section>

{#if config.auth && !$page.data.user}
	<Authentication />
{/if}

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

{#await characterDetails}
	<div class="loading">
		<Loading withOverlay={false} />
	</div>
{:then characterDetails}
	{#if characterDetails.isSample == true && $page.data.user}
		<Tile>You are seeing sample character data. Please, upload your own character file.</Tile>
	{/if}
	{#if characterDetails.data == null && $page.data.user}
		<br />
		<Tile>Your character hasn't been saved in database. Please, upload it again.</Tile>
	{:else}
		<div class="character-details">
			<div
				class="image"
				style="background-image: url({characterDetails.data.profilePicture});"
			></div>
			<h1>{characterDetails.data.name}</h1>
			<h4>
				{characterDetails.data.level}th level {characterDetails.data.class}
			</h4>
			<div class="info">
				<Tag size="default">Gender: {characterDetails.data.gender}</Tag>
				<Tag>Race: {characterDetails.data.race}</Tag>
				<Tag>Hair: {characterDetails.data.hair_color}</Tag>
				<Tag>Eye color: {characterDetails.data.eye_color}</Tag>
				<Tag>Skin color: {characterDetails.data.skin_color}</Tag>
				<Tag>Weight: {characterDetails.data.weight}</Tag>
				<Tag>Height: {characterDetails.data.height}</Tag>
			</div>
		</div>
		<AbilityScores character={characterDetails.data} />
		<Health character={characterDetails.data}></Health>

		<Tabs>
			<Tab label="1. Weapons" />
			<Tab label="2. Features" />
			<svelte:fragment slot="content">
				<TabContent>
					{#each characterDetails.data.weapons as weapon}
						<Weapon {weapon} character={characterDetails.data} />
					{/each}
				</TabContent>
				<TabContent>
					<Features character={characterDetails.data} />
				</TabContent>
			</svelte:fragment>
		</Tabs>
	{/if}
{:catch error}
	<h2>Error loading character. Please, refresh the page.</h2>
{/await}

<style>
	/* h1,
	h4 {
		text-align: center;
	} */

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

	.loading {
		margin-block: 4rem;
	}

	@media (max-width: 400px) {
		.character-details .image {
			width: 100%;
		}
	}
</style>
