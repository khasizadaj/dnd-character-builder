<script lang="ts">
	import { Breadcrumb, BreadcrumbItem, ListItem, UnorderedList } from 'carbon-components-svelte';
	import { WeaponInfo } from '$lib/types';

	import Weapon from '$lib/components/Weapon.svelte';

	import character from '$lib/assets/demo-character.json';
	import Features from '$lib/components/Features.svelte';
	import Health from '$lib/components/Health.svelte';
	const sampleWeapon: WeaponInfo = character.weapons[0];
</script>

<Breadcrumb noTrailingSlash>
	<BreadcrumbItem href="/">Home</BreadcrumbItem>
	<BreadcrumbItem href="/user-guide" isCurrentPage>User Guide</BreadcrumbItem>
</Breadcrumb>
<br />

<h1>Welcome to the DnD Character Builder!</h1>
<br />
<p>
	Get ready to streamline your Dungeons & Dragons experience and create awesome custom characters
	with ease! Our DnD Character Builder takes the hassle out of character management and empowers you
	with handy in-game tools.
</p>
<br />

<h2>Why use the DnD Character Builder?</h2>
<br />
<UnorderedList expressive>
	<ListItem>
		Effortless Customization: Build unique D&D characters without the tedious number-crunching.
		Game-ready
	</ListItem>
	<ListItem>Tools: Access essential tools at your fingertips to enhance your gameplay.</ListItem>
</UnorderedList>
<br />

<h2>Features</h2>
<br />
<UnorderedList expressive>
	<ListItem
		><strong>Health Points Tracker:</strong> Effortlessly monitor your character's health, adjust HP
		with a click, and reset after rests for fast-paced combat.</ListItem
	>
	<ListItem
		><strong>Weapon Manager:</strong> Master your attacks! View your weapon stats, let the tool roll
		for you, and get detailed breakdowns of attack and damage results.</ListItem
	>
	<ListItem
		><strong>Ability Tracker:</strong> Keep tabs on your character's skills and abilities.</ListItem
	>
</UnorderedList>
<br />

<p>Ready to dive in? Get started and simplify your D&D adventures!</p>
<br />

<h3>Keep Track of Your Health, Not the Math</h3>
<br />

<p>
	The Health Points Tracker makes managing your character's health a breeze in Dungeons & Dragons.
	Here's how:
</p>

<Health {character} />
<br />

<UnorderedList expressive>
	<ListItem
		><strong>Simple at a Glance:</strong> See your character's current HP and their max HP in one clear
		spot.</ListItem
	>
	<ListItem><strong>Damage and Healing Made Easy:</strong></ListItem>
	<UnorderedList expressive nested>
		<ListItem>Took a hit? Tap the "Damage" button to quickly subtract HP.</ListItem>
		<ListItem>Received a healing spell? Press "Heal" to add HP back.</ListItem>
	</UnorderedList>
	<ListItem
		><strong>Full Reset, Fast:</strong> Need a quick refresh after a rest? Hit the "Restore HP" button
		to instantly set your HP back to its maximum.</ListItem
	>
</UnorderedList>
<br />

<p>Forget complicated calculations and focus on staying alive during those intense D&D battles!</p>
<br />

<h3>Master Your Combat with the Weapon Manager</h3>
<br />

<p>
	Are you tired of fumbling with dice and calculating damage during combat? The Weapon Manager is
	your solution!
</p>
<br />

<Weapon weapon={sampleWeapon} {character} />
<br />

<UnorderedList expressive>
	<ListItem
		><strong>Your Weapons at a Glance:</strong> Easily view all your character's weapons, each with a
		clear display of its name, attack dice, modifier, and damage type (indicated by handy icons).</ListItem
	>
	<ListItem
		><strong>Detailed Weapon Info:</strong> Need a refresher? Click a weapon for a full description,
		perfect for those with special properties.</ListItem
	>
	<ListItem
		><strong>Attack with a Click:</strong> Ready to attack? Click the "Attack" button and let the Weapon
		Manager handle the rest! It'll roll the dice for you and deliver a full breakdown of the results,
		including:</ListItem
	>
	<UnorderedList expressive nested>
		<ListItem><em>Attack Roll:</em> Did you hit? Find out instantly!</ListItem>
		<ListItem><em>Total Damage:</em> See the total damage you dealt with one look.</ListItem>
		<ListItem
			><em>Damage Breakdown:</em> Understand exactly how your damage was calculated – dice rolls, damage
			types, and any extra modifiers!</ListItem
		>
	</UnorderedList>
</UnorderedList>
<br />

<p>
	With the Weapon Manager, you'll spend less time on the mechanics and more time strategizing your
	next epic move!
</p>
<br />

<h3>Track Your Abilities with Ease</h3>
<br />

<p>
	The Ability Tracker is your go-to resource for managing and understanding all your character's
	abilities in Dungeons & Dragons. Here's what it does for you:
</p>

<Features {character} />
<br />

<br />

<UnorderedList expressive>
	<ListItem
		><strong>All Abilities in One Place:</strong> See every ability your character possesses, neatly
		organized and showing whether it comes from your class or subclass.</ListItem
	>
	<ListItem
		><strong>Handles Multiple Classes:</strong> Got a character with a mix of classes or subclasses?
		No problem! The Ability Tracker keeps everything sorted.</ListItem
	>
	<ListItem
		><strong>Plan Ahead:</strong> The tracker marks abilities you haven't unlocked yet, often with a
		dimmed appearance and a level tag (like "6th Lvl"). This helps you anticipate your character's future
		powers!</ListItem
	>
</UnorderedList>

<style>
	.feature-showcase {
		width: 100%;
	}
</style>
