<script lang="ts">
	import {
		Breadcrumb,
		BreadcrumbItem,
		ListItem,
		OrderedList,
		UnorderedList
	} from 'carbon-components-svelte';
	import { WeaponInfo } from '$lib/types';

	import Weapon from '$lib/components/Weapon.svelte';

	import character from '$lib/assets/demo-character.json';
	import { InformationSquareFilled } from 'carbon-icons-svelte';
	import AbilityScores from '$lib/components/AbilityScores.svelte';
	import CharacterDetails from '$lib/components/CharacterDetails.svelte';
	const sampleWeapon: WeaponInfo = character.weapons[0];
</script>

<Breadcrumb noTrailingSlash class="mb-8">
	<BreadcrumbItem href="/">Home</BreadcrumbItem>
	<BreadcrumbItem href="/user-guide" isCurrentPage>User Guide</BreadcrumbItem>
</Breadcrumb>

<section class="mb-16 text-base">
	<h1 class="mb-4 text-4xl">Welcome to the DnD Character Builder!</h1>
	<p>
		The DnD Character Builder streamlines your Dungeons & Dragons experience by allowing you to
		create, customize, and manage your character effortlessly using a JSON file. Our tool enhances
		your gameplay and simplifies character management.
	</p>
</section>
<section class="mb-16 text-base">
	<h2 class="mb-4 text-3xl">Introduction</h2>
	<div class="mb-4">
		<h3 class="mb-4 text-2xl">Purpose</h3>
		<p>
			Our tool empowers you to quickly build and manage your D&D character with ease, ensuring a
			seamless and enjoyable experience.
		</p>
	</div>
	<div class="mb-4">
		<h3 class="mb-4 text-2xl">What You Need</h3>
		<p>
			To make the most of the DnD Character Builder, you will need a JSON file containing your
			character's data. This file serves as the foundation for all the tools and features available
			within the builder. For those new to JSON files, we've provided a sample character to help you
			get started.
		</p>
	</div>
	<div class="mb-4 h-full w-full bg-emerald-700 p-4">
		<InformationSquareFilled size={24} class="mb-2" />
		<h4 class="mb-1 text-left text-lg font-bold">Limited To Single Character</h4>
		<p>
			At the moment, the DnD Character Builder supports only one character at a time. This ensures a
			focused and detailed character management experience, though support for multiple characters
			may be added in the future.
		</p>
	</div>
	<div>
		<p>
			Ready to dive in? Let's simplify your D&D adventures and bring your character to life with the
			DnD Character Builder!
		</p>
	</div>
</section>

<section class="mb-16 text-base">
	<h2 class="mb-4 text-3xl">Getting started</h2>
	<div class="mb-4">
		<h3 class="mb-4 text-2xl">Account setup</h3>
		<p class="mb-4">
			To begin using the DnD Character Builder, you need to create an account. Follow these simple
			steps to get started:
		</p>
		<OrderedList expressive class="ml-6">
			<ListItem
				>Go to our <a
					href="/account/signup"
					class="text-blue-400 decoration-blue-400 hover:underline hover:underline-offset-2"
					>Signup</a
				> page.</ListItem
			>
			<ListItem>Create account by providing email and password.</ListItem>
			<ListItem>Return to the application and log in using your email and password.</ListItem>
		</OrderedList>
	</div>
</section>

<section class="text-base">
	<h2 class="mb-4 text-3xl">Using character builder</h2>
	<div class="mb-4">
		<h3 class="mb-4 text-2xl">User interface overview</h3>
		<div class="mb-4">
			<h4 class="mb-4 text-xl">Basic information</h4>
			<p class="mb-4">
				On this part of the application you can find basic information about your character:
			</p>
			<OrderedList expressive class="mb-4 ml-6">
				<ListItem>Picture of your character</ListItem>
				<ListItem>Name of your character</ListItem>
				<ListItem>Level & Class name</ListItem>
				<ListItem>Race & Appearance details</ListItem>
				<ListItem>Ability scores</ListItem>
				<ListItem>Proficiency bonus & AC & Speed & Initiative</ListItem>
			</OrderedList>
			<div class="border-2 border-solid border-emerald-700">
				<div class="mb-8 flex items-center gap-2 border-b-2 border-solid border-emerald-700 p-4">
					<InformationSquareFilled size={24} class="text-emerald-700" />
					<h5 class="text-lg text-emerald-700">Sample</h5>
				</div>
				<CharacterDetails {character}></CharacterDetails>
				<AbilityScores {character}></AbilityScores>
			</div>
		</div>
		<div class="mb-4">
			<h4 class="mb-4 text-xl">Weapons</h4>
			<p class="mb-4">
				On this part of the application you can find all necessary information about your weapons:
			</p>
			<OrderedList expressive class="mb-4 ml-6">
				<ListItem>Name of weapon</ListItem>
				<ListItem>Weapon description (when expanded)</ListItem>
				<ListItem>Damage dice and types</ListItem>
				<ListItem>Weapon modifiers</ListItem>
				<ListItem>Button to roll for attack</ListItem>
			</OrderedList>
			<div class="mb-4 border-2 border-solid border-emerald-700">
				<div class="mb-4 flex items-center gap-2 border-b-2 border-solid border-emerald-700 p-4">
					<InformationSquareFilled size={24} class="text-emerald-700" />
					<h5 class="text-lg text-emerald-700">Sample weapon</h5>
				</div>
				<div class="mx-4 mb-4">
					<Weapon weapon={sampleWeapon} {character}></Weapon>
				</div>
			</div>
			<div class="border-2 border-solid border-emerald-700">
				<div class="mb-4 flex items-center gap-2 border-b-2 border-solid border-emerald-700 p-4">
					<InformationSquareFilled size={24} class="text-emerald-700" />
					<h5 class="text-lg text-emerald-700">Sample weapon - Expanded</h5>
				</div>
				<div class="mx-4 mb-4">
					<Weapon weapon={sampleWeapon} {character} expanded={true}></Weapon>
				</div>
			</div>
		</div>
	</div>
	<div class="mb-4">
		<h3 class="mb-4 text-2xl">How to create character</h3>
		<div class="mb-4 flex h-full w-full items-center gap-2 bg-orange-600 p-4">
			<InformationSquareFilled size={24} class="" />
			<h4 class="text-left text-lg font-bold">Coming soon ...</h4>
		</div>
	</div>
	<div class="mb-4">
		<h3 class="mb-4 text-2xl">How to modify character</h3>
		<div class="mb-4 flex h-full w-full items-center gap-2 bg-orange-600 p-4">
			<InformationSquareFilled size={24} class="" />
			<h4 class="text-left text-lg font-bold">Coming soon ...</h4>
		</div>
	</div>
	<div class="mb-4">
		<h3 class="mb-4 text-2xl">In-game tools</h3>
		<div class="mb-4 flex h-full w-full items-center gap-2 bg-orange-600 p-4">
			<InformationSquareFilled size={24} class="" />
			<h4 class="text-left text-lg font-bold">Coming soon ...</h4>
		</div>
	</div>
</section>
