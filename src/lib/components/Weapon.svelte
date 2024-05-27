<script lang="ts">
	import {
		Restart,
		AssemblyReference,
		Area,
		Calls,
		Moon,
		Sun,
		Monster,
		Subflow
	} from 'carbon-icons-svelte';

	import { AttackModifiers, WeaponInfo, AbilityScore, Dice, AttackResult } from '$lib/types';
	import { calculateAbilityScoreModifier, getAbilityScore, rollDie } from '$lib/utils';

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

	const attackAbilityInfo: AbilityScore | null = getAbilityScore(
		weapon.attackAbility,
		character.abilityScores
	);

	const attackModifiers = new AttackModifiers(
		character.proficiencyBonus,
		calculateAbilityScoreModifier(attackAbilityInfo?.score)
	);

	let data_table_rows: any = null;

	const getDataTableRows = () => {
		return damageRolls.map((roll: any, index: number) => ({
			id: String.fromCharCode(97 + index), // generates 'a', 'b', 'c', etc.
			die: `1d${roll.type}`,
			damage: roll.damage,
			damageType: roll.damageType
		}));
	};

	const rollForAttack = (weapon: WeaponInfo) => {
		let roll = rollDie(20);
		return new AttackResult(
			roll,
			weapon.modifier,
			attackModifiers.proficiency,
			attackModifiers.ability
		);
	};

	const rollForDamage = (weapon: WeaponInfo) => {
		let rolls: Object[] = [];
		weapon.dice.forEach((die: Dice) => {
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
		totalDamage += attackModifiers.proficiency;
		totalDamage += attackModifiers.ability;
		return totalDamage;
	};

	

	let totalDamage: number;
	let damageRolls: Object[];
	let attackResult: AttackResult;
	let resultIsShown = false;
</script>

<ExpandableTile tileExpandedLabel="View less" tileCollapsedLabel="View more">
	<div slot="above">
		<h3>{weapon.name}</h3>
		{#each weapon.dice as die}
			{#if die.damage == 'default'}
				<Tag icon={AssemblyReference}>
					Default: {die.count}d{die.type}
				</Tag>
			{:else if die.damage == 'slashing'}
				<Tag icon={Moon}>
					Slashing: {die.count}d{die.type}
				</Tag>
			{:else if die.damage == 'bludgeoning'}
				<Tag icon={Area}>
					Bludgeoning: {die.count}d{die.type}
				</Tag>
			{:else if die.damage == 'piercing'}
				<Tag icon={Calls}>
					Piercing: {die.count}d{die.type}
				</Tag>
			{:else if die.damage == 'radiant'}
				<Tag icon={Sun}>
					Radiant: {die.count}d{die.type}
				</Tag>
			{:else if die.damage == 'necrotic'}
				<Tag icon={Monster}>
					Necrotic: {die.count}d{die.type}
				</Tag>
			{:else if die.damage == 'force'}
				<Tag icon={Subflow}>
					Force: {die.count}d{die.type}
				</Tag>
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
		{#if resultIsShown}
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
		{/if}
		<br /> <br />
		{#if resultIsShown}
			<Tile light>
				<p>
					Roll: {attackResult.total()} [ {attackResult.roll} (1d20) + {attackResult.weaponModifier} (Wep.
					mod.) + {attackResult.abilityModifier} (Abil. mod.) + {attackResult.proficiencyBonus} (Prof.
					bonus) ]
				</p>
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
			<br /> <br />
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
		<br /> <br />
	</div>
</ExpandableTile>
