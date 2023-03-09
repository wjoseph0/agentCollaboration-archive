<script>
	import Signout from '$lib/components/Signout.svelte';
	import { pb, currentUser } from '$lib/pocketbase';
	import FindUser from '$lib/components/FindUser.svelte';
	import Clients from '$lib/components/Clients.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import Invite from '$lib/components/Invite.svelte';

	$: if (browser && !$currentUser) {
		goto('/login');
	}

	let modalVisible = false;
	let clientSelectorVisible = false;

	onMount(async () => {
		await pb
			.collection('users')
			.authRefresh({}, { expand: 'agent,clients,focusedClient' });
	});

	function toggleChangeClientSelector() {
		if (clientSelectorVisible === true) {
			clientSelectorVisible = false;
			return;
		}
		clientSelectorVisible = true;
	}

	function toggleModal() {
		if (modalVisible === true) {
			modalVisible = false;
			return;
		}
		modalVisible = true;
	}

	async function switchAccountType() {
		let data;
		if ($currentUser.isAgent) {
			data = {
				isAgent: false
			};
		} else {
			data = {
				isAgent: true
			};
		}

		await pb.collection('users').update($currentUser.id, data);

		toggleModal();

		await pb
			.collection('users')
			.authRefresh({}, { expand: 'agent,clients,focusedClient' });
	}
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
				<strong>{$currentUser.fname} {$currentUser.lname}</strong>
				<br />
				{$currentUser.email} <br />
				{#if !$currentUser.expand.agent && !$currentUser.isAgent}
					<FindUser />
				{/if}
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
					<h3>My Focused Client</h3>
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
						<a href="#top" on:click={toggleChangeClientSelector}>Change</a>
					</p>
					{#if clientSelectorVisible}
						<FindUser />
						<p />
						<Clients />
					{/if}
				</section>
			{:else if $currentUser.isAgent && !$currentUser.focusedClient}
				<section>
					<h3>Select a client:</h3>
					<FindUser />
					<p />
					<Clients />
				</section>
			{:else if $currentUser.expand.agent}
				<h3>My Agent</h3>
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
			{/if}
		</section>

		<section>
			{#if $currentUser.isAgent}
				<button on:click={toggleModal}>Switch to Client</button>
			{:else}
				<button on:click={toggleModal}>Switch to Agent</button>
			{/if}
		</section>

		<section>
			<Signout />
		</section>
	</main>
{/if}

{#if modalVisible}
	<dialog open>
		<article>
			<!-- svelte-ignore a11y-missing-content -->
			<a
				href="/account"
				aria-label="Close"
				class="close"
				data-target="modal-example"
				on:click={toggleModal}
			/>
			<h3>Confirm change!</h3>
			{#if $currentUser.isAgent}
				<p>Your account type will revert back to a <strong>client</strong>.</p>
			{:else}
				<p>Your account type will change to an <strong>agent</strong>.</p>
			{/if}
			<footer>
				<a
					href="/account"
					role="button"
					class="secondary"
					on:click={toggleModal}
				>
					Cancel
				</a>
				<a href="/account" role="button" on:click={switchAccountType}>
					Confirm
				</a>
			</footer>
		</article>
	</dialog>
{/if}

<style>
	main {
		height: 90vh;
		overflow-y: scroll;
		padding-right: 16px;
		padding-left: 16px;
	}

	#me {
		text-align: center;
	}

	img {
		border-radius: 0.6rem;
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
