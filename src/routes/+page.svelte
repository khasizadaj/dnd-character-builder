<script lang="ts">
	import 'carbon-components-svelte/css/g90.css';
	import Restart from 'carbon-icons-svelte/lib/Restart.svelte';
	import SubtractLarge from 'carbon-icons-svelte/lib/SubtractLarge.svelte';
	import AddLarge from 'carbon-icons-svelte/lib/AddLarge.svelte';
	import Weapon from '$lib/components/Weapon.svelte';
	import {
		Tag,
		Grid,
		Row,
		Button,
		Column,
		Tile,
		FileUploader,
		Link,
		ProgressBar,
		NumberInput,
		Header,
		Content
	} from 'carbon-components-svelte';

	export let data;
	let character = data.character;
	let username = 'jkhasizada';
	$: currHp = character.maxHp;
	let status = 'active';
	let fileUploader;

	function calculateAbilityScoreModifier(score: number) {
		let result = Math.floor((score - 10) / 2);
		if (result > 0) {
			return `+${result}`;
		}
		return result;
	}

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
				<div class="ability-scores">
					{#each character.abilityScores as abilityScore}
						{#if abilityScore.proficient}
							<div class="ability proficient">
								<div class="type">
									<span>{abilityScore.type.slice(0, 3).toString().toUpperCase()}</span>
								</div>
								<div class="modifier">
									<span>{calculateAbilityScoreModifier(abilityScore.score)}</span>
								</div>
								<div class="score">
									<span>{abilityScore.score}</span>
								</div>
							</div>
						{:else}
							<div class="ability">
								<div class="type">
									<span>{abilityScore.type.slice(0, 3).toString().toUpperCase()}</span>
								</div>
								<div class="modifier">
									<span>{calculateAbilityScoreModifier(abilityScore.score)}</span>
								</div>
								<div class="score">
									<span>{abilityScore.score}</span>
								</div>
							</div>
						{/if}
					{/each}
				</div>
				<div class="health">
					<div>
						<ProgressBar
							{status}
							value={currHp}
							max={character.maxHp}
							labelText="Health Points"
							helperText="{currHp} HP out of {character.maxHp} left"
						/>
					</div>
					<div class="damage-section">
						<div class="input">
							<NumberInput id="current-damage" value={1} size="xl" min={1} max={character.maxHp} />
						</div>
						<div class="actions">
							<Button
								kind="danger"
								iconDescription="Subtract HP"
								icon={SubtractLarge}
								size="lg"
								on:click={() => {
									let damageInput = document.getElementById('current-damage');
									if (damageInput?.value == 0) return;
									currHp -= parseInt(damageInput?.value);
									if (currHp <= 0) {
										currHp = 0;
										damageInput.disabled = true;
										status = 'error';
									}
									damageInput.value = 1;
								}}
							/>
							<Button
								kind="primary"
								iconDescription="Add HP"
								icon={AddLarge}
								size="lg"
								on:click={() => {
									let damageInput = document.getElementById('current-damage');
									if (damageInput?.value == 0) return;
									currHp += parseInt(damageInput?.value);
									if (currHp >= character.maxHp) {
										currHp = character.maxHp;
										status = 'active';
									}
									damageInput.value = 1;
								}}
							/>
							<Button
								kind="secondary"
								iconDescription="Reset damage"
								icon={Restart}
								size="lg"
								on:click={() => {
									currHp = character.maxHp;
									status = 'active';
								}}
							/>
						</div>
					</div>
				</div>
				<div>
					<Tile>
						<h1>Weapons</h1>
					</Tile>
					<Weapon />
				</div>
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

	.ability-scores {
		margin-block: 3rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
	}

	.ability {
		padding-inline: 4px;
		border-radius: 0.5rem;
		background: #525252;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-weight: 500;
		font-size: 1rem;
	}

	.ability.proficient {
		background: #24a148;
	}

	.ability .score {
		font-weight: bold;
		padding-block: 0.5rem;
	}

	.ability .type {
		font-weight: bold;
		padding-block: 0.5rem;
	}

	.ability .modifier {
		text-align: center;
		width: 5rem;
		border-radius: 0.25rem;
		background: #f4f4f4;
		color: #262626;
		padding: 1.5rem;
		font-size: 2rem;
	}

	.health {
		margin-block: 3rem;
	}

	.health > .damage-section {
		margin-block-start: 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}

	.damage-section .input {
		width: 100%;
	}
	
	.damage-section > .actions {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
	}

	@media (max-width: 400px) {
		.character-details .image {
			width: 100%;
		}
	
		.health > .damage-section {
			flex-direction: column;
		}
	
		.damage-section > .actions,
	
		.damage-section > .input {
			width: 100%;
			justify-content: start;
		}
	}
</style>
