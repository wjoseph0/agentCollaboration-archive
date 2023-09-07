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
	let agentLicenseNumber;
	let agentLicenseNumberInput;
	let clientType = '';
	let isClient = true;
	let isAgent = false;
	let licenseNumber = '';
	let brokerage = '';

	const validateAgent = async () => {
		try {
			const record = await pb
				.collection('users')
				.getFirstListItem(`licenseNumber="${agentLicenseNumber}"`, {});
			agentLicenseNumberInput.classList.remove('input-error');
			agentLicenseNumberInput.classList.add('input-success');
			return record.id;
		} catch (err) {
			agentLicenseNumberInput.classList.remove('input-success');
			agentLicenseNumberInput.classList.add('input-error');
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
				info.clientType = clientType;
				info.agent = await validateAgent();
			} else if (isAgent) {
				info.isAgent = true;
				info.licenseNumber = licenseNumber;
				info.brokerage = brokerage;
			}

			await pb.collection('users').create(info);
			await pb.collection('users').requestVerification(info.email);
			await pb.collection('users').authWithPassword(
				email.toLowerCase(),
				password,
				{},
				{
					expand: 'agent'
				}
			);
			goto('/');
		} catch (err) {
			console.error(err);
		}
	};

	onMount(async () => {
		if (data.agent) {
			agentLicenseNumber = data.agent;
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
				<label class="label" for="clientType">
					<span class="label-text">Buying or Selling</span>
				</label>
				<select
					bind:value={clientType}
					name="clientType"
					class="select select-bordered w-full"
					required
				>
					<option disabled selected />
					<option value="buyer">Buying</option>
					<option value="seller">Selling</option>
				</select>
			</div>
			<div class="form-control w-full">
				<label class="label" for="agentLicenseNumberInput">
					<span class="label-text">My Agent's License Number</span>
				</label>
				<input
					name="agentLicenseNumberInput"
					placeholder=""
					type="text"
					class="input input-bordered"
					bind:this={agentLicenseNumberInput}
					bind:value={agentLicenseNumber}
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
					<span class="label-text">License Number</span>
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
					<span class="label-text">Brokerage</span>
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
				href="https://www.freeprivacypolicy.com/live/1c0ba0e1-eeab-497f-ab10-35a5fe5bffe3"
				class="link link-primary link-hover">Terms and Conditions</a
			>. Your
			<a
				class="link link-primary link-hover"
				href="https://www.freeprivacypolicy.com/live/7a5ad8b3-b864-4fb1-85a7-471501d01620"
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
