<script lang="ts">
	import {
		Tile,
		Link,
		Tabs,
		Tab,
		TabContent,
		Loading,
	} from 'carbon-components-svelte';

	import { config as configStore } from '$lib/stores';

	import CharacterDetails from '$lib/components/CharacterDetails.svelte';
	import AbilityScores from '$lib/components/AbilityScores.svelte';
	import Health from '$lib/components/Health.svelte';
	import Weapon from '$lib/components/Weapon.svelte';
	import Features from '$lib/components/Features.svelte';

	import type { Config } from '$lib/types';

	export let data;
	import { page } from '$app/stores';
	import CharacterUpload from '$lib/components/CharacterUpload.svelte';

	let { character: characterDetails } = data;

	let config: Config;
	configStore.subscribe((value: Config) => {
		config = { ...value };
	});
</script>

<CharacterUpload characterDetails></CharacterUpload>

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
		<CharacterDetails character={characterDetails.data}></CharacterDetails>
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
	.loading {
		margin-block: 4rem;
	}
</style>
