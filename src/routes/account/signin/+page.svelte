<script lang="ts">
	import { Button, FormGroup, TextInput, Form, PasswordInput, Link } from 'carbon-components-svelte';

	import { signinEmailPasswordFront, signupEmailPasswordFront } from '$lib/auth';
	let email: string = '';
	let password: string = '';

	const useDemoCharacterForSignin = (event) => {
		email = 'test@demo.xyz';
		password = 'demo1234';
		setInterval(() => {
			signinEmailPasswordFront(event);
		}, 1000);
	};
</script>

<Form id="signin-form" method="POST">
	<h4 style="text-align: left">Sign in</h4>
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
	<Button kind="secondary" size="field" href="/account/signup">No account? Sign up now!</Button>

	<Button kind="ghost" size="field" on:click={useDemoCharacterForSignin}
		>Show me demo character</Button
	>
</Form>
<br />
