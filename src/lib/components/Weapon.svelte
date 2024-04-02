<script lang="ts">
	import { Restart, ChartRadar, AssemblyReference } from 'carbon-icons-svelte';

	import { AttackModifiers, WeaponInfo, AbilityScore } from '$lib/types';
	import { calculateAbilityScoreModifier } from '$lib/utils';

	import {
		Button,
		DataTable,
		ExpandableTile,
		ListItem,
		Tag,
		Tile,
		UnorderedList
	} from 'carbon-components-svelte';

	export let weapon: WeaponInfo;
	export let character: any;
	console.log(weapon);
	const getAbilityScore = (ability: string, abilityScores: any[]) => {
		console.log('Ability: ', ability);
		console.log('Scores: ', abilityScores);
		for (const element of abilityScores) {
			if (element.type == ability) {
				console.log('Gotta exit.');
				return element;
			}
		}
		console.log("Couldn't found it");
		return null;
	};

	const attackAbilityInfo: AbilityScore | null = getAbilityScore(
		weapon.attackAbility,
		character.abilityScores
	);

	console.log('TEST INFO', attackAbilityInfo);
	const attackModifiers = new AttackModifiers(
		character.proficiencyBonus,
		calculateAbilityScoreModifier(attackAbilityInfo?.score)
	);
	console.log('TEST', attackModifiers);

	let data_table_rows: any = null;

	const getDataTableRows = () => {
		return damageRolls.map((roll: any, index: number) => ({
			id: String.fromCharCode(97 + index), // generates 'a', 'b', 'c', etc.
			die: `1d${roll.type}`,
			damage: roll.damage,
			damageType: roll.damageType
		}));
	};

	const rollDie = (max: number) => {
		let result;
		var randomBytes = new Uint8Array(4);
		crypto.getRandomValues(randomBytes);
		var randomInt =
			(randomBytes[0] << 24) | (randomBytes[1] << 16) | (randomBytes[2] << 8) | randomBytes[3];
		result = Math.floor((Math.abs(randomInt) / 0x7fffffff) * max) + 1;
		console.log(`--:`, result);
		return result;
	};

	const rollForAttack = (weapon: Weapon) => {
		let attack = rollDie(20);
		attack += weapon.modifier;
		console.log('Weapon modifier:', weapon.modifier);
		attack += attackModifiers.proficiency;
		console.log('Prof. bonus:', attackModifiers.proficiency);
		attack += attackModifiers.ability;
		console.log('Attack ability bonus:', attackModifiers.ability);
		console.log('Attack roll:', attack);
		return attack;
	};

	const rollForDamage = (weapon: Weapon) => {
		let rolls: Object[] = [];
		weapon.dice.forEach((die: Die) => {
			for (let i = 0; i < die.count; i++) {
				rolls.push({ type: die.type, damageType: die.damage, damage: rollDie(die.type) });
			}
		});
		return rolls;
	};

	const calculateDamage = (rolls: Object[]) => {
		let totalDamage = 0;
		rolls.forEach((roll: Object) => {
			totalDamage += roll.damage;
		});
		totalDamage += weapon.modifier;
		console.log('Weapon modifier:', weapon.modifier);
		totalDamage += attackModifiers.proficiency;
		console.log('Prof. bonus:', attackModifiers.proficiency);
		totalDamage += attackModifiers.ability;
		console.log('Attack ability bonus:', attackModifiers.ability);
		console.log('Total damage:', totalDamage);
		return totalDamage;
	};

	let totalDamage: number;
	let damageRolls: Object[];
	let attackResult: number;
	let resultIsShown = false;
</script>

<ExpandableTile tileExpandedLabel="View less" tileCollapsedLabel="View more">
	<div slot="above">
		<h3>{weapon.name}</h3>
		{#each weapon.dice as die}
			{#if die.damage == 'default'}
				<Tag icon={AssemblyReference}>{die.count}d{die.type}</Tag>
			{:else if die.damage == 'radiant'}
				<Tag icon={ChartRadar}>{die.count}d{die.type}</Tag>
			{/if}
		{/each}
		<Tag type="green">+{weapon.modifier}</Tag>
		<br /><br />
		<Button
			size="small"
			on:click={(e) => {
				e.stopPropagation();
				resultIsShown = true;
				damageRolls = rollForDamage(weapon);
				data_table_rows = getDataTableRows();
				totalDamage = calculateDamage(damageRolls);
				attackResult = rollForAttack(weapon);
			}}
		>
			Attack
		</Button>
		<Button
			size="small"
			icon={Restart}
			iconDescription="Reset attack"
			kind="secondary"
			on:click={(e) => {
				e.stopPropagation();
				resultIsShown = false;
			}}
		/>
		<br /> <br />
		{#if resultIsShown}
			<Tile light>
				<p>Roll: {attackResult}</p>
				<p>Total Damage: {totalDamage}</p>
				<br />
				<DataTable
					size="compact"
					headers={[
						{ key: 'die', value: 'Die' },
						{ key: 'damage', value: 'Damage' },
						{ key: 'damageType', value: 'Type' }
					]}
					rows={data_table_rows}
				/>
				<br />
				<Tile>
					<p>Proficiency Bonus: {attackModifiers.proficiency}</p>
					<p>Attack Ability Modifier: {attackModifiers.ability}</p>
				</Tile>
			</Tile>
		{/if}
	</div>
	<div slot="below">
		<br />
		<h4>Description</h4>
		<br />
		<UnorderedList expressive>
			{#each weapon.description as line}
				<ListItem>{line}</ListItem>
			{/each}
		</UnorderedList>
		<br />
	</div>
</ExpandableTile>
