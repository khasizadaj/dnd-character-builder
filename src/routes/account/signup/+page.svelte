<script lang="ts">
	import { Button, FormGroup, TextInput, Form, PasswordInput } from 'carbon-components-svelte';

	import { signupEmailPasswordFront } from '$lib/auth';
</script>

<Form id="signin-form" method="POST">
	<h4 style="text-align: left">Sign up</h4>
	<br />
	<FormGroup>
		<TextInput name="email" labelText="Email" placeholder="Enter email..." />
	</FormGroup>
	<FormGroup>
		<PasswordInput
			name="password"
			labelText="Password"
			placeholder="Enter password..."
		/>
	</FormGroup>
	<Button size="field" type="submit" on:click={signupEmailPasswordFront}>Sign up</Button>
	<Button kind="ghost" size="field" href="/account/signin">Already signed in?</Button>
</Form>
<br />
