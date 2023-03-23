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

<!-- <main class="container">
	<h1>Create an account</h1>

	<form on:submit|preventDefault={signUp}>
		<input placeholder="First Name" type="text" bind:value={fname} required />
		<input placeholder="Last Name" type="text" bind:value={lname} required />
		<input placeholder="Email" type="email" bind:value={email} required />
		<input placeholder="Password" type="password" bind:value={password} minlength="8" required />
		<button>Signup</button>
	</form>

	<a href="/login">I have an account!</a>
</main> -->

<div class="flex flex-col items-center h-full w-full pt-12 pr-4 pl-4">
	<h2 class=" text-center text-3xl font-bold tracking-tight text-base-content">
		Register for an account
	</h2>
	<p class="text-center mt-1">
		Or <a href="/login" class="text-primary font-medium hover:cursor-pointer">sign in</a> if you already
		have an account.
	</p>
	<form on:submit|preventDefault={signUp} class="flex flex-col items-center space-y-2 w-full mt-4">
		<div class="form-control w-full max-w-md">
			<label for="name" class="label font-medium pb-1">
				<span class="label-text">First Name</span>
			</label>
			<input
				type="text"
				name="name"
				bind:value={fname}
				class="input input-bordered w-full max-w-md mb-2"
				required
			/>
		</div>
		<div class="form-control w-full max-w-md">
			<label for="name" class="label font-medium pb-1">
				<span class="label-text">Last Name</span>
			</label>
			<input
				type="text"
				name="name"
				bind:value={lname}
				class="input input-bordered w-full max-w-md mb-2"
				required
			/>
		</div>
		<div class="form-control w-full max-w-md">
			<label for="email" class="label font-medium pb-1">
				<span class="label-text">Email</span>
			</label>
			<input
				type="email"
				name="email"
				bind:value={email}
				class="input input-bordered w-full max-w-md mb-2"
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
				class="input input-bordered w-full max-w-md mb-2"
				minlength="8"
				required
			/>
		</div>
		<div class="w-full max-w-md pt-3">
			<button class="btn btn-primary w-full max-w-md">Register</button>
		</div>
	</form>
</div>
