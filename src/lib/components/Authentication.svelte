<script lang="ts">
	import { Button, FormGroup, TextInput, Form, PasswordInput } from 'carbon-components-svelte';

	import { signinEmailPasswordFront, signupEmailPasswordFront } from '$lib/auth';
	let email: string = 'test@demo.xyz';
	let password: string = 'demo1234';
</script>

<Form id="signin-form" method="POST">
	<h4 style="text-align: left">Sign in to save your character</h4>
	<br />
	<FormGroup>
		<TextInput name="email" value={email} labelText="Email" placeholder="Enter email..." />
	</FormGroup>
	<FormGroup>
		<PasswordInput
			name="password"
			value={password}
			labelText="Password"
			placeholder="Enter password..."
		/>
	</FormGroup>
	<Button size="field" type="submit" on:click={signinEmailPasswordFront}>Sign in</Button>
	<Button size="field" type="submit" on:click={signupEmailPasswordFront}>Sign up</Button>
</Form>
<br />
