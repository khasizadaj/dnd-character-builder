<script lang="ts">
	import { page } from '$app/stores';
	import { characterInMemory } from '$lib/stores.js';

	import { Tile, Tabs, Tab, TabContent, Loading } from 'carbon-components-svelte';

	import AbilityScores from '$lib/components/AbilityScores.svelte';
	import CharacterDetails from '$lib/components/CharacterDetails.svelte';
	import CharacterUpload from '$lib/components/CharacterUpload.svelte';
	import Features from '$lib/components/Features.svelte';
	import Health from '$lib/components/Health.svelte';
	import Weapon from '$lib/components/Weapon.svelte';

	export let data;

	let { character: characterDetails } = data;

	/* Subscribe to the characterInMemory store which is updated when
	 * a new character file is uploaded
	 */
	characterInMemory.subscribe((value: any) => {
		/* If the value is null, don't do anything
		 * This is to prevent the characterDetails from being set to null
		 * when the characterDetails is already set to a value from the server
		 */
		if (value == null) {
			return;
		}
		characterDetails = value;
	});
</script>

<CharacterUpload></CharacterUpload>

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
