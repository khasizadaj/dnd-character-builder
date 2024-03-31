<script type="ts">
	import {
		Button,
		DataTable,
		ExpandableTile,
		ListItem,
		Tag,
		Tile,
		UnorderedList
	} from 'carbon-components-svelte';
	const weapon = {
		name: 'Star Sickle',
		dice: [
			{ count: 3, type: 6, damage: 'default' },
			{ count: 2, type: 4, damage: 'radiant' }
		],
		description: [
			'The sickle has the finese and thrown properly (20/60). Immediately after you make a ranged attack with this waepon, it disipates into starlight and reappears in your hand.',
			'When you the attack action, you can replace one of your weapon attacks with special realty warping ranged attack. Choose a point you can see within 30 ft. throw the sickle, Each creature within 5 ft. must succeed on a DC 17 `STR` saving throw or take *3d6* force damage as it erupts in energy, reappearing in your hand.'
		],
		spells: [
			{
				name: 'Misty Spell',
				url: 'http://dnd5e.wikidot.com/spell:misty-step'
			}
		],
		modifier: 2
	};
	let data_table_rows = weapon.dice.map((die, index) => ({
		id: String.fromCharCode(97 + index), // generates 'a', 'b', 'c', etc.
		die: `${die.count}d${die.type}`,
		damage: 0,
		type: die.damage
	}));
	import AssemblyReference from 'carbon-icons-svelte/lib/AssemblyReference.svelte';
	import ChartRadar from 'carbon-icons-svelte/lib/ChartRadar.svelte';

	const roll = () => {
		console.log('Rolling for result...');
	};

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
				roll();
			}}
		>
			Roll
		</Button>
		<br /> <br />
		{#if resultIsShown}
			<Tile light>
				<p>Roll: 20</p>
				<p>Total Damage: 15</p>
			</Tile>
		{/if}
	</div>
	<div slot="below">
		<br />
		<h4>Roll results</h4>
		<br />
		<DataTable
			size="short"
			headers={[
				{ key: 'die', value: 'Die' },
				{ key: 'damage', value: 'Damage' },
				{ key: 'type', value: 'Type' }
			]}
			rows={data_table_rows}
		/>
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
