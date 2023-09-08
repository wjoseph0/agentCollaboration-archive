<script>
	import { goto } from '$app/navigation';
	import { pb, currentUser } from '$lib/pocketbase';
	import { browser } from '$app/environment';
	import PasswordReset from '$lib/components/PasswordReset.svelte';

	$: if (browser && $currentUser) {
		goto('/');
	}

	let email;
	let password;
	let loading = false;
	let failed = false;

	export const login = async () => {
		loading = true;
		try {
			await pb.collection('users').authWithPassword(
				email.toLowerCase(),
				password,
				{},
				{
					expand: 'agent,clients,focusedClient'
				}
			);
			goto('/');
		} catch (error) {
			console.error(error);
			failed = true;
			setTimeout(() => {
				failed = false;
			}, 7000);
		}
		loading = false;
	};
</script>

<main class="container prose flex flex-col justify-center h-screen">
	<h1 class="text-center">Login</h1>

	<form on:submit|preventDefault={login} class="flex flex-col space-y-3">
		<input
			placeholder="Email"
			type="email"
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
		<PasswordReset />
		{#if loading}
			<button class="btn btn-primary"><span class="loading loading-spinner loading-sm" /></button>
		{:else}
			<button class="btn btn-primary">Login</button>
		{/if}
		<p class="text-center text-sm">
			Don't have an account? <a href="/signup" class="link link-primary link-hover">Sign up</a> to create
			one.
		</p>
	</form>
</main>

{#if failed}
	<div class="toast toast-center">
		<div class="alert alert-error">
			<span>Login failed.</span>
		</div>
	</div>
{/if}
