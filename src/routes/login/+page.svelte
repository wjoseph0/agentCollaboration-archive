<script>
	import { goto } from '$app/navigation';
	import { pb } from '$lib/pocketbase';

	let email;
	let password;

	export const login = async () => {
		try {
			await pb.collection('users').authWithPassword(
				email,
				password,
				{},
				{
					expand: 'agent,clients,focusedClient'
				}
			);
			goto('/');
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
