<script lang="ts">
	import {
		Tag
	} from 'carbon-components-svelte';

	export let character;
</script>

<div class="character-details">
			<div
				class="image border-2 border-stone-900 border-solid"
				style="background-image: url({character.profilePicture});"
			></div>
			<h1 class="text-4xl">{character.name}</h1>
			<h3 class="text-2xl">
				{character.level}th level {character.class}
			</h3>
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

<style>
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

