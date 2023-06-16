<script>
	import Signout from '$lib/components/Signout.svelte';
	import { pb, currentUser } from '$lib/pocketbase';
	import FindUser from '$lib/components/FindUser.svelte';
	import Clients from '$lib/components/Clients.svelte';
	import { onMount } from 'svelte';
	import Invite from '$lib/components/Invite.svelte';
	import AccountType from '$lib/components/AccountType.svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import ChooseClient from '$lib/components/ChooseClient.svelte';

	$: if (browser && !$currentUser) {
		goto('/login');
	}

	onMount(async () => {
		await pb.collection('users').authRefresh({}, { expand: 'agent,clients,focusedClient' });
	});
</script>

{#if $currentUser}
	<main class="container prose">
		{#if $currentUser.profilePic}
			<img
				src="https://wjoseph0.cloud/api/files/{$currentUser.collectionId}/{$currentUser.id}/{$currentUser.profilePic}"
				alt="profile pic"
				width="200px"
			/>
		{:else}
			<img
				class="avatar"
				src={`https://api.dicebear.com/5.x/initials/svg?seed=${$currentUser.fname}%20${$currentUser.lname}`}
				alt="avatar"
				width="120px"
			/>
		{/if}
		<p>
			<strong>{$currentUser.fname} {$currentUser.lname}</strong><br />
			{$currentUser.email}
		</p>

		{#if $currentUser.isAgent}
			<Invite />
		{/if}

		{#if $currentUser.isAgent && !$currentUser.focusedClient}
			<ChooseClient />
		{:else if !$currentUser.isAgent && $currentUser.expand.agent}
			<h2>My Agent</h2>
			<div class="avatar">
				<div class="rounded-xl w-24">
					{#if $currentUser.expand.agent.profilePic}
						<img
							src="https://wjoseph0.cloud/api/files/_pb_users_auth_/{$currentUser.agent}/{$currentUser
								.expand.agent.profilePic}"
							alt="avatar"
						/>
					{:else}
						<img
							class="avatar"
							src={`https://api.dicebear.com/5.x/initials/svg?seed=${$currentUser.expand.agent.fname}%20${$currentUser.expand.agent.lname}`}
							alt="avatar"
						/>
					{/if}
				</div>
			</div>
			<br />
			<span>
				{$currentUser.expand.agent.fname}
				{$currentUser.expand.agent.lname} <br />
				{$currentUser.expand.agent.email}
			</span>
			<br />
		{:else if !$currentUser.isAgent && !currentUser.agent}
			<h2>My Agent</h2>
			<FindUser />
		{/if}

		<!-- <AccountType /> -->
		<Signout />
	</main>
{/if}
