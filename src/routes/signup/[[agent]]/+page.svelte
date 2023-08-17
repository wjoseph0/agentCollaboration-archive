<script>
	import { goto } from '$app/navigation';
	import { pb, currentUser } from '$lib/pocketbase';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	$: if (browser && $currentUser) {
		goto('/');
	}

	export let data;

	let fname = '';
	let lname = '';
	let email = '';
	let password = '';
	let agentID;
	let agentIdInput;
	let isClient = true;
	let isAgent = false;
	let licenseNumber = '';
	let brokerage = '';

	const validateAgent = async () => {
		try {
			await pb.collection('users').getOne(`${agentID}`);
			agentIdInput.classList.remove('input-error');
			agentIdInput.classList.add('input-success');
		} catch (err) {
			agentIdInput.classList.remove('input-success');
			agentIdInput.classList.add('input-error');
		}
	};

	const signUp = async () => {
		try {
			const info = {
				fname: fname,
				lname: lname,
				email: email.toLowerCase(),
				emailVisibility: true,
				password: password,
				passwordConfirm: password
			};
			if (isClient) {
				info.agent = agentID;
			} else if (isAgent) {
				info.isAgent = true;
				info.licenseNumber = licenseNumber;
				info.brokerage = brokerage;
			}

			await pb.collection('users').create(info);
			await pb.collection('users').authWithPassword(
				email.toLowerCase(),
				password,
				{},
				{
					expand: 'agent,clients,focusedClient'
				}
			);
			goto('/');
		} catch (err) {
			console.error(err);
		}
	};

	onMount(async () => {
		if (data.agent) {
			agentID = data.agent;
			validateAgent();
		}
	});
</script>

<main class="container prose flex flex-col justify-center h-screen">
	<h1 class="text-center">Sign Up</h1>

	<form on:submit|preventDefault={signUp} class="flex flex-col space-y-3">
		<div class="flex flex-row gap-2 w-full">
			<input
				placeholder="First Name"
				type="text"
				class="input input-bordered w-1/2"
				bind:value={fname}
				required
			/>
			<input
				placeholder="Last Name"
				type="text"
				class="input input-bordered w-1/2"
				bind:value={lname}
				required
			/>
		</div>
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

		<br />
		<span class="text-xs text-center">Which one are you?</span>
		{#if isClient}
			<div class="flex gap-2 mx-auto">
				<span class="btn btn-neutral btn-sm">Client</span>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<span
					class="btn btn-neutral btn-outline btn-sm"
					on:click={() => {
						isAgent = true;
						isClient = false;
					}}>Agent</span
				>
			</div>
			<div class="form-control w-full">
				<label class="label" for="agentid">
					<span class="label-text">My Agent's ID</span>
				</label>
				<input
					name="agentid"
					placeholder=""
					type="text"
					class="input input-bordered"
					bind:this={agentIdInput}
					bind:value={agentID}
					on:change={validateAgent}
					required
				/>
			</div>
		{:else if isAgent}
			<div class="flex flex-row gap-2 mx-auto">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<span
					class="btn btn-neutral btn-outline btn-sm"
					on:click={() => {
						isClient = true;
						isAgent = false;
					}}>Client</span
				>
				<span class="btn btn-neutral btn-sm">Agent</span>
			</div>
			<div class="form-control w-full">
				<label class="label" for="licenseNumber">
					<span class="label-text">My License Number</span>
				</label>
				<input
					name="licenseNumber"
					type="text"
					class="input input-bordered"
					bind:value={licenseNumber}
					required
				/>
			</div>
			<div class="form-control w-full">
				<label class="label" for="brokerage">
					<span class="label-text">My Brokerage</span>
				</label>
				<input
					name="brokerage"
					type="text"
					class="input input-bordered"
					bind:value={brokerage}
					required
				/>
			</div>
		{/if}

		<p class="text-center text-xs">
			By clicking "Sign Up" below, I accept the <a
				href="https://app.termly.io/document/terms-and-conditions/ebafceeb-c35c-4515-9797-9f7b45202ab0"
				class="link link-primary link-hover">Terms and Conditions</a
			>. Your
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
