<script lang="ts">
	import 'carbon-components-svelte/css/g90.css';
	import { Document, Logout } from 'carbon-icons-svelte';
	import { Button, Header, HeaderUtilities, HeaderGlobalAction } from 'carbon-components-svelte';

	import { userIsAuthenticated, config as configStore } from '$lib/stores';

	import { signoutEmailPasswordFront } from '$lib/auth';
	import type { Config } from '$lib/types';

	let isSideNavOpen = false;
	let newIsAuthenticatedValue: string;

	userIsAuthenticated.subscribe((value: string) => {
		newIsAuthenticatedValue = value;
	});

	let config: Config;
	configStore.subscribe((value: Config) => {
		config = { ...value };
	});
</script>

<Header company="DnD" platformName="Character Builder" bind:isSideNavOpen>
	<HeaderUtilities>
		<HeaderGlobalAction
			href="user-guide"
			iconDescription="User guide"
			tooltipAlignment="end"
			icon={Document}
		/>
		{#if config.auth && newIsAuthenticatedValue == '1'}
			<form method="POST">
				<Button
					icon={Logout}
					kind="danger"
					iconDescription="Signout"
					on:click={signoutEmailPasswordFront}
				></Button>
			</form>
		{/if}
	</HeaderUtilities>
</Header>

<slot />
