<script>
	import Signout from '$lib/components/Signout.svelte';
	import { pb, currentUser } from '$lib/pocketbase';
	import FindUser from '$lib/components/FindUser.svelte';
	import Clients from '$lib/components/Clients.svelte';
	import { onMount } from 'svelte';
	import Invite from '$lib/components/Invite.svelte';
	import AccountType from '$lib/components/AccountType.svelte';

	onMount(async () => {
		await pb.collection('users').authRefresh({}, { expand: 'agent,clients,focusedClient' });
	});
</script>

{#if $currentUser}
	<main class="container">
		<section id="me">
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
				<section>
					<Invite />
				</section>
			{/if}
		</section>

		<section>
			{#if $currentUser.isAgent && $currentUser.expand.focusedClient}
				<section>
					<h2>Client in Focus</h2>
					<Clients /> <br />
					{#if $currentUser.expand.focusedClient.profilePic}
						<img
							src="https://wjoseph0.cloud/api/files/_pb_users_auth_/{$currentUser.focusedClient}/{$currentUser
								.expand.focusedClient.profilePic}"
							alt="profile pic"
							width="50px"
						/>
					{:else}
						<img
							class="avatar"
							src={`https://api.dicebear.com/5.x/initials/svg?seed=${$currentUser.expand.focusedClient.fname}%20${$currentUser.expand.focusedClient.lname}`}
							alt="avatar"
							width="50px"
						/>
					{/if}
					<p>
						{$currentUser.expand.focusedClient.fname}
						{$currentUser.expand.focusedClient.lname} <br />
						{$currentUser.expand.focusedClient.email} <br />
					</p>
				</section>
			{:else if $currentUser.isAgent && !$currentUser.focusedClient}
				<section>
					<h2>Select a client:</h2>
					<Clients />
				</section>
			{:else if $currentUser.expand.agent}
				<h2>My Agent</h2>
				{#if $currentUser.expand.agent.profilePic}
					<img
						src="https://wjoseph0.cloud/api/files/_pb_users_auth_/{$currentUser.agent}/{$currentUser
							.expand.agent.profilePic}"
						alt="profile pic"
						width="50px"
					/>
				{:else}
					<img
						class="avatar"
						src={`https://api.dicebear.com/5.x/initials/svg?seed=${$currentUser.expand.agent.fname}%20${$currentUser.expand.agent.lname}`}
						alt="avatar"
						width="50px"
					/>
				{/if}
				<p>
					{$currentUser.expand.agent.fname}
					{$currentUser.expand.agent.lname} <br />
					{$currentUser.expand.agent.email}
				</p>
			{:else if !currentUser.agent}
				<h2>My Agent</h2>
				<FindUser />
			{/if}
		</section>

		<section>
			<AccountType />
			<Signout />
		</section>
	</main>
{/if}

<style>
	main {
		height: 90vh;
		overflow-y: scroll;
		padding-right: 16px;
		padding-left: 16px;
	}

	img {
		border-radius: 0.6rem;
	}

	h2 {
		margin-bottom: 0em;
	}

	section,
	#me {
		text-align: center;
	}

	/* width */
	::-webkit-scrollbar {
		width: 1px;
	}

	/* Track */
	::-webkit-scrollbar-track {
		background: #11191f;
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background: hsl(205deg, 16%, 77%);
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: rgb(185, 185, 185);
	}
</style>
