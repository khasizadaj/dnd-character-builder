<script lang="ts">
	import 'carbon-components-svelte/css/g90.css';
	import Restart from 'carbon-icons-svelte/lib/Restart.svelte';
	import SubtractLarge from 'carbon-icons-svelte/lib/SubtractLarge.svelte';
	import AddLarge from 'carbon-icons-svelte/lib/AddLarge.svelte';
	import {
		Button,
		ProgressBar,
		NumberInput,
	} from 'carbon-components-svelte';

	export let character: Object;
	$: currHp = character.maxHp;
	let status = 'active';
</script>

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
									}
									status = 'active';
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

<style>
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

