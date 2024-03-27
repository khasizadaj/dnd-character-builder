<script>
	import 'carbon-components-svelte/css/g90.css';
	import { Tag, Grid, Row, Column, TooltipDefinition } from 'carbon-components-svelte';

	import profilePicture from '$lib/assets/dnd-character-photo.jpg';

	let character = {
		profilePicture: profilePicture,
		name: 'Python Kei Klax',
		class: 'Fighter',
		level: 13,
		race: 'Shifter',
		gender: 'Female',
		hair_color: 'Black',
		skin_color: 'Gray',
		eye_color: 'Black',
		height: '220',
		weight: '220',
		appearance: 'Tall with brown hair and blue eyes'
	};
</script>

<Grid narrow padding>
	<Row>
		<Column noGutter md={1} lg={2}></Column>
		<Column noGutter md={14} lg={12}>
			<div class="character-details">
				<div class="image" style="background-image: url({character.profilePicture});"></div>
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
		</Column>
		<Column noGutter md={1} lg={2}></Column>
	</Row>
</Grid>

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
		margin-inline: 1rem;
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
		margin-top: 48px;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 12px;
	}
</style>
