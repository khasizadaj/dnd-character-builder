<script lang="ts">
	import {
		Tag,
		Tile,
		FileUploader,
		Link,
		Tabs,
		Tab,
		TabContent,
		Loading,
		Button
	} from 'carbon-components-svelte';
	import {
		ArrowRight,
		HealthCross,
		InformationSquareFilled,
		ManageProtection,
		ToolKit,
		WatsonHealthBrushFreehand
	} from 'carbon-icons-svelte';

	import { config as configStore } from '$lib/stores';

	import Authentication from '../lib/components/Authentication.svelte';
	import AbilityScores from '../lib/components/AbilityScores.svelte';
	import Health from '../lib/components/Health.svelte';
	import Weapon from '$lib/components/Weapon.svelte';
	import Features from '$lib/components/Features.svelte';

	import type { Config } from '$lib/types';

	export let data;
	import { page } from '$app/stores';

	let { character: characterDetails } = data;

	$: user = data.user;

	let fileUploader;

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
				if ($page.data.user) {
					fetch('/character', {
						method: 'POST',
						headers: {
							'Content-type': 'application/json'
						},
						body: JSON.stringify(jsonData)
					}).then((response) => {
						if (!response.ok) {
							console.error('Failed to save character.');
							characterDetails = new Promise(function (resolve) {
								resolve({
									isSample: true,
									data: null
								});
							});
							return;
						}
						console.log('Character saved to database successfully.');
					});
				}
				characterDetails = new Promise(function (resolve) {
					resolve({
						isSample: false,
						data: jsonData
					});
				});
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

	let config: Config;
	configStore.subscribe((value: Config) => {
		config = { ...value };
	});
</script>

<section class="mt-16 mb-28 md:mt-32 md:mb-56">
	<h2 class="mb-4 text-4xl">Unleash Your Inner Hero with the DnD Character Builder!</h2>
	<p class="mb-4 text-base">
		Elevate your Dungeons & Dragons experience with our intuitive Character Builder. Craft unique
		characters effortlessly and access powerful in-game tools to enhance your adventures.
	</p>
	<Button size="field" icon={ArrowRight} href="/account/signin">Get started now</Button>
</section>

<section class="mb-16">
	<h2 class="mb-4 text-2xl">Why Choose the DnD Character Builder?</h2>
	<div class="flex gap-4 flex-col md:flex-row">
		<Tile class="flex-1">
			<WatsonHealthBrushFreehand size={24} class="mb-2" />
			<h4 class="mb-1 text-lg font-bold text-left">Effortless Customization</h4>
			<p class="text-base">Create distinct characters without the hassle</p>
		</Tile>
		<Tile class="flex-1">
			<ToolKit size={24} class="mb-2" />
			<h4 class="mb-1 text-lg font-bold text-left">Game-Ready Tools</h4>
			<p class="text-base">Enhance your gameplay with essential, easy-to-use tools.</p>
		</Tile>
	</div>
</section>

<section class="mb-16">
	<h2 class="mb-4 text-2xl">Why Choose the DnD Character Builder?</h2>
	<div class="flex gap-4 flex-col">
		<Tile>
			<HealthCross size={24} class="mb-2" />
			<h4 class="mb-1 text-lg font-bold text-left">Health Points Tracker</h4>
			<p class="text-base">
				Effortlessly monitor your character's health, adjust HP with a click, and reset after rests
				for fast-paced combat.
			</p>
		</Tile>
		<Tile>
			<ManageProtection size={24} class="mb-2" />
			<h4 class="mb-1 text-lg font-bold text-left">Weapon Manager</h4>
			<p class="text-base">
				Master your attacks! View your weapon stats, let the tool roll for you, and get detailed
				breakdowns of attack and damage results.
			</p>
		</Tile>
		<Tile>
			<ManageProtection size={24} class="mb-2" />
			<h4 class="mb-1 text-lg font-bold text-left">Ability Tracker</h4>
			<p class="text-base">Keep tabs on your character's skills and abilities.</p>
		</Tile>
		<Tile class="bg-emerald-700">
			<InformationSquareFilled size={24} class="mb-2" />
			<h4 class="mb-1 text-lg font-bold text-left">New tools are on the way...</h4>
			<p class="text-base">
				Exciting new tools are on the way to make your gameplay even more immersive. Stay tuned!
			</p>
		</Tile>
	</div>
</section>

<section class="mb-16">
	<Tile light class="bg-gray-50 text-gray-900">
		<h4 class="mb-2 text-2xl">
			Ready to streamline your D&D adventures?
		</h4>
		<p class="mb-4 text-base">
			Dive in and simplify your journey with DnD Character Builder.
		</p>
	<Button size="field" icon={ArrowRight} href="/account/signin">Get started now!</Button>
	</Tile>
</section>

