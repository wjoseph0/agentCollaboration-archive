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
		<input
			placeholder="Password"
			type="password"
			bind:value={password}
			required
		/>
		<button>Login</button>
	</form>

	<a href="/signup">I need an account!</a>
</main>
