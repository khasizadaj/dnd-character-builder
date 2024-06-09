<script lang="ts">
	import {
		Tile,
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
		<div class="p-4 bg-emerald-700 w-full h-full">
			<InformationSquareFilled size={24} class="mb-2" />
			<h4 class="mb-1 text-lg font-bold text-left">New tools are on the way...</h4>
			<p class="text-base">
				Exciting new tools are on the way to make your gameplay even more immersive. Stay tuned!
			</p>
		</div>
	</div>
</section>

<section class="">
	<div class="p-4 bg-gray-50 text-gray-900 w-full h-full">
		<h4 class="mb-2 text-2xl">Ready to streamline your D&D adventures?</h4>
		<p class="mb-4 text-base">Dive in and simplify your journey with DnD Character Builder.</p>
		<Button size="field" icon={ArrowRight} href="/account/signin">Get started now!</Button>
	</div>
</section>
