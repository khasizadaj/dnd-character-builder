<script lang="ts">
	import 'carbon-components-svelte/css/g90.css';
	import '../app.css';

	import { ArrowRight, Logout, UserAvatar } from 'carbon-icons-svelte';
	import {
		Button,
		Header,
		HeaderUtilities,
		Content,
		Grid,
		Row,
		Column
	} from 'carbon-components-svelte';

	import { config as configStore } from '$lib/stores';

	import { signoutEmailPasswordFront } from '$lib/auth';
	import type { Config } from '$lib/types';

	import { page } from '$app/stores';

	let isSideNavOpen = false;

	let config: Config;
	configStore.subscribe((value: Config) => {
		config = { ...value };
	});

	if ($page.data.user) {
		console.log('User logged in.');
	} else {
		console.log('No user data / User not logged in.');
	}
</script>

<Header company="DnD" platformName="Character Builder" bind:isSideNavOpen href="/">
	<HeaderUtilities>
		<Button kind="ghost" href="/user-guide">User Guide</Button>
		{#if config.auth && $page.data.user && !$page.data.user?.isAnonymous}
			<Button kind="primary" href="/profile" icon={UserAvatar} iconDescription="Profile">
				{$page.data.user.email.split('@')[0].toUpperCase()}
			</Button>
			<form method="POST">
				<Button
					icon={Logout}
					kind="danger"
					iconDescription="Signout"
					on:click={signoutEmailPasswordFront}
				></Button>
			</form>
		{:else}
			<Button icon={ArrowRight} href="/account/signin">Get started now</Button>
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
