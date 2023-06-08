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

<main class="container prose flex flex-col justify-center h-screen">
	<h1 class="text-center">Login</h1>

	<form on:submit|preventDefault={login} class="flex flex-col space-y-2">
		<input
			placeholder="Email"
			type="text"
			class="input input-bordered"
			bind:value={email}
			required
		/>
		<input
			placeholder="Password"
			type="password"
			class="input input-bordered"
			bind:value={password}
			required
		/>
		<button class="btn btn-primary">Login</button>
		<a href="/signup" class="link">I need an account!</a>
	</form>
</main>
