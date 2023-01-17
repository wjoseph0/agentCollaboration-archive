<script>
	import { goto } from '$app/navigation';
	import { pb } from '$lib/pocketbase';

	let username;
	let password;

	export const login = async () => {
		try {
			await pb.collection('users').authWithPassword(username, password);
			goto('/app');
		} catch (error) {
			console.error(error);
		}
	};
</script>

<main class="container">
	<h2>Login</h2>

	<form on:submit|preventDefault={login}>
		<input placeholder="Username" type="text" bind:value={username} required />
		<input placeholder="Password" type="password" bind:value={password} required />
		<button type="submit">Login</button>
	</form>

	<a href="/signup">I need an account!</a>
</main>
