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

<!-- <main class="container">
	<h1>Login</h1>

	<form on:submit|preventDefault={login}>
		<input placeholder="Email" type="text" bind:value={email} required />
		<input placeholder="Password" type="password" bind:value={password} required />
		<button>Login</button>
	</form>

	<a href="/signup">I need an account!</a>
</main> -->

<div class="flex flex-col items-center h-full w-full pt-12 pr-4 pl-4">
	<h2 class="text-center text-3xl font-bold tracking-tight text-base-content">
		Sign in to your account
	</h2>
	<p class="text-center mt-1">
		Or <a href="/signup" class="text-primary font-medium hover:cursor-pointer">register</a> if you don't
		already have an account.
	</p>
	<form on:submit|preventDefault={login} class="flex flex-col items-center space-y-2 w-full mt-4">
		<div class="form-control w-full max-w-md">
			<label for="email" class="label font-medium pb-1">
				<span class="label-text">Email</span>
			</label>
			<input
				type="email"
				name="email"
				bind:value={email}
				class="input input-bordered w-full max-w-md"
				required
			/>
		</div>
		<div class="form-control w-full max-w-md">
			<label for="password" class="label font-medium pb-1">
				<span class="label-text">Password</span>
			</label>
			<input
				type="password"
				name="password"
				bind:value={password}
				class="input input-bordered w-full max-w-md"
				required
			/>
		</div>
		<div class="w-full max-w-md pt-3 pb-2">
			<button class="btn btn-primary w-full max-w-md">Login</button>
		</div>
	</form>
</div>
