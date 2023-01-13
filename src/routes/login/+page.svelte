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

<h2>Login</h2>

<form on:submit|preventDefault={login}>
	<input placeholder="Username" type="text" bind:value={username} required />
	<input placeholder="Password" type="password" bind:value={password} required />
	<button type="submit">Login</button>
</form>

<a href="/signup">I need an account!</a>

<style>
	form {
		display: flex;
		flex-direction: column;
	}

	input {
		margin-top: 5px;
		margin-bottom: 5px;
		border-radius: 10px;
		border: none;
		padding: 10px;
	}

	button {
		margin-top: 5px;
		height: 50px;
		background-color: lightcyan;
		border: none;
		border-radius: 10px;
	}

	button:is(:hover, :focus) {
		background-color: rgba(224, 255, 255, 0.9);
		cursor: pointer;
	}

	input:focus {
		outline: none;
	}

	a {
		margin-top: 10px;
		color: lightcyan;
	}
</style>
