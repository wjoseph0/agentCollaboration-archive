<script>
	import { goto } from '$app/navigation';
	import { pb, currentUser } from '$lib/pocketbase';
	import { browser } from '$app/environment';

	$: if (browser && $currentUser) {
		goto('/account');
	}

	export let data;

	let fname = '';
	let lname = '';
	let email = '';
	let password = '';

	const signUp = async () => {
		try {
			const info = {
				fname: fname,
				lname: lname,
				email: email.toLowerCase(),
				emailVisibility: true,
				password: password,
				passwordConfirm: password,
				agent: data.agent
			};
			await pb.collection('users').create(info);
			await pb.collection('users').authWithPassword(
				email.toLowerCase(),
				password,
				{},
				{
					expand: 'agent,clients,focusedClient'
				}
			);
			goto('/account');
		} catch (err) {
			console.error(err);
		}
	};
</script>

<main class="container prose flex flex-col justify-center h-screen">
	<h1 class="text-center">Sign Up</h1>

	<form on:submit|preventDefault={signUp} class="flex flex-col space-y-3">
		<input
			placeholder="First Name"
			type="text"
			class="input input-bordered"
			bind:value={fname}
			required
		/>
		<input
			placeholder="Last Name"
			type="text"
			class="input input-bordered"
			bind:value={lname}
			required
		/>
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
			minlength="8"
			required
		/>
		<p class="text-center text-xs">
			By clicking "Sign Up" below, I accept the <a
				href="https://app.termly.io/document/terms-and-conditions/ebafceeb-c35c-4515-9797-9f7b45202ab0"
				class="link link-primary link-hover"
			>
				Terms and Conditions
			</a>. Your
			<a
				class="link link-primary link-hover"
				href="https://app.termly.io/document/privacy-policy/bc7e25ed-f732-455f-98f9-e97843ec792a"
			>
				privacy
			</a> is protected.
		</p>
		<button class="btn btn-primary">Sign Up</button>
	</form>

	<p class="text-center text-sm">
		Have an account already? <a href="/login" class="link link-primary link-hover">Sign in</a> here now.
	</p>
</main>
