<script>
	import { goto } from '$app/navigation';
	import { pb, currentUser } from '$lib/pocketbase';
	import { browser } from '$app/environment';

	$: if (browser && $currentUser) {
		goto('/account');
	}

	let email;
	let password;

	export const login = async () => {
		try {
			await pb.collection('users').authWithPassword(
				email.toLowerCase(),
				password,
				{},
				{
					expand: 'agent,clients,focusedClient'
				}
			);
			goto('/account');
		} catch (error) {
			console.error(error);
		}
	};
</script>

<main class="container">
	<h1>Login</h1>

	<form on:submit|preventDefault={login}>
		<input placeholder="Email" type="text" bind:value={email} required />
		<input placeholder="Password" type="password" bind:value={password} required />
		<button>Login</button>
	</form>

	<a href="/signup">I need an account!</a>
</main>

<footer>
	<a href="https://app.termly.io/document/privacy-policy/bc7e25ed-f732-455f-98f9-e97843ec792a">
		Privacy Policy
	</a>

	<a
		href="https://app.termly.io/document/terms-and-conditions/ebafceeb-c35c-4515-9797-9f7b45202ab0"
	>
		Terms and Conditions
	</a>

	<a href="https://app.termly.io/document/disclaimer/80837b1b-cd4d-47e0-bec7-b39ceb8646d2">
		Disclaimer
	</a>

	<a
		href="https://app.termly.io/document/acceptable-use-policy/c8445309-d475-4d68-bf8e-675ca412faf3"
	>
		Acceptable Use Policy
	</a>
</footer>

<style>
	footer {
		position: fixed;
		bottom: 0;
		text-align: center;
		font-size: x-small;
	}

	footer > a {
		padding: 0 0.2em;
	}
</style>
