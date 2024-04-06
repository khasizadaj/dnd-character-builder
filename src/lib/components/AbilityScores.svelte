<script lang="ts">
	import 'carbon-components-svelte/css/g90.css';
	import { slide } from 'svelte/transition';
	import { quintIn } from 'svelte/easing';

	import { calculateAbilityScoreModifier, getAbilityScore, rollDie } from '$lib/utils';
	import { Tag, ToastNotification, TooltipDefinition } from 'carbon-components-svelte';
	import { Badge, IbmWatsonMachineLearning, ManageProtection, Running } from 'carbon-icons-svelte';

	export let data;
	let character = data.character;

	const initiative = calculateAbilityScoreModifier(
		getAbilityScore('dexterity', character.abilityScores).score
	);

	let notification_id = 0;
	const handleClickOnAbility = (e: Event) => {
		let modifier = calculateAbilityScoreModifier(
			getAbilityScore(e.currentTarget.id, character.abilityScores).score
		);
		let dieResult = rollDie(20);
		let rollResult = dieResult + modifier + character.proficiencyBonus;

		let notificationTitle = `${getShortAbilityName(e.currentTarget.id).toUpperCase()}: SAVE : ${rollResult}`;
		let notificationSubtitle = `${dieResult} + (${modifier}) + (${character.proficiencyBonus})`;

		notifications.map((notification) => {
			notification.subtitle = '';
		});
		notifications = [
			...notifications,
			{
				id: notification_id++,
				lowContrast: true,
				kind: 'info-square',
				title: notificationTitle,
				subtitle: notificationSubtitle,
				hideCloseButton: true,
				timeout: 60 * 1000
			}
		];
		if (notifications.length > 3) {
			notifications.shift();
		}
	};

	const getShortAbilityName = (abilityName: string) => {
		return abilityName.slice(0, 3).toString();
	};
	let notifications: any[] = [];
</script>

<div id="notifications">
	{#each notifications as notification}
		<div transition:slide={{ axis: 'y', easing: quintIn }}>
			<svelte:component
				this={ToastNotification}
				{...notification}
				on:click={() => {
					let index = notifications.findIndex((n) => n.id === notification.id);
					notifications.splice(index, 1);
					notifications = [...notifications];
				}}
			/>
		</div>
	{/each}
</div>

<div class="ability-scores">
	{#each character.abilityScores as abilityScore}
		{#if abilityScore.proficient}
			<button
				id={abilityScore.type.toLowerCase()}
				class="ability proficient"
				on:click={(e) => handleClickOnAbility(e)}
			>
				<div class="type">
					<span>{getShortAbilityName(abilityScore.type).toUpperCase()}</span>
				</div>
				<div class="modifier">
					{#if calculateAbilityScoreModifier(abilityScore.score) > 0}
						<span>+{calculateAbilityScoreModifier(abilityScore.score)}</span>
					{:else}
						<span>{calculateAbilityScoreModifier(abilityScore.score)}</span>
					{/if}
				</div>
				<div class="score">
					<span>{abilityScore.score}</span>
				</div>
			</button>
		{:else}
			<button
				id={abilityScore.type.toLowerCase()}
				class="ability"
				on:click={(e) => handleClickOnAbility(e)}
			>
				<div class="type">
					<span>{getShortAbilityName(abilityScore.type).toUpperCase()}</span>
				</div>
				<div class="modifier">
					{#if calculateAbilityScoreModifier(abilityScore.score) > 0}
						<span>+{calculateAbilityScoreModifier(abilityScore.score)}</span>
					{:else}
						<span>{calculateAbilityScoreModifier(abilityScore.score)}</span>
					{/if}
				</div>
				<div class="score">
					<span>{abilityScore.score}</span>
				</div>
			</button>
		{/if}
	{/each}
</div>
<div class="ability-scores">
	<Tag icon={Badge}>
		<TooltipDefinition
			tooltipText="Bonus added to rolls for skills and actions your character is proficient in."
		>
			Prof. Bonus: {character.proficiencyBonus}
		</TooltipDefinition>
	</Tag>
	<Tag icon={ManageProtection}>
		<TooltipDefinition
			tooltipText="Defense score determining how difficult you are to hit in combat."
		>
			AC: {character.armorClass}
		</TooltipDefinition>
	</Tag>
	<Tag icon={Running}>
		<TooltipDefinition
			tooltipText="Measurement of how far your character can move on their turn in combat."
		>
			Speed: {character.speed}
		</TooltipDefinition>
	</Tag>
	<Tag icon={IbmWatsonMachineLearning}>
		<TooltipDefinition tooltipText="Bonus added to a roll to determine turn order in combat.">
			Initiative:
			{#if initiative > 0}
				+{initiative}
			{:else}
				{initiative}
			{/if}
		</TooltipDefinition>
	</Tag>
</div>

<style>
	button {
		border: none;
		background: none;
		color: inherit;
		cursor: pointer;
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

	#notifications {
		position: fixed;
		bottom: 1rem;
		left: 1rem;
		z-index: 1000;
	}
</style>
