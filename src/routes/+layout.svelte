<script lang="ts">
	import 'carbon-components-svelte/css/g90.css';
	import { CirclePacking, Logout } from 'carbon-icons-svelte';
	import {
		Button,
		Header,
		HeaderUtilities,
		Content,
		Grid,
		Row,
		Column
	} from 'carbon-components-svelte';

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

<Header company="DnD" platformName="Character Builder" bind:isSideNavOpen href="/">
	<HeaderUtilities>
		<Button kind="ghost" href="user-guide">User Guide</Button>
		<Button kind="ghost" icon={CirclePacking} iconDescription="Profile" disabled></Button>
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
<Content>
	<Grid>
		<Row>
			<Column noGutter md={1} lg={2}></Column>
			<Column noGutter md={14} lg={12}>
				<slot />
			</Column>
			<Column noGutter md={1} lg={2}></Column>
		</Row>
	</Grid>
</Content>
