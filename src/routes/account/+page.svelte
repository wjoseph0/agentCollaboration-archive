<script>
	import Signout from '$lib/components/Signout.svelte';
	import { pb, currentUser } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import FindUser from '$lib/components/FindUser.svelte';
	import Clients from '$lib/components/Clients.svelte';

	let modalVisible = false;
	let expandedCurrentUser;

	onMount(async () => {
		expandedCurrentUser = await pb.collection('users').getOne($currentUser.id, {
			expand: 'agent,clients'
		});

		await currentUser.set(expandedCurrentUser);
	});

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

		const updatedRecord = await pb
			.collection('users')
			.update($currentUser.id, data, {
				expand: 'agent'
			});

		await currentUser.set(updatedRecord);

		toggleModal();
	}
</script>

<main class="container">
	<section>
		<img
			class="avatar"
			src={`https://avatars.dicebear.com/api/identicon/${$currentUser?.id}.svg`}
			alt="avatar"
			width="120px"
		/>
		<p>
			{$currentUser?.fname}
			{$currentUser?.lname} <br />
			{$currentUser?.email} <br />
			{#if !$currentUser?.agent && expandedCurrentUser}
				<FindUser {expandedCurrentUser} />
			{/if}
		</p>
	</section>

	<section />

	{#if $currentUser?.agent && !$currentUser?.isAgent}
		<section>
			<h3>My Agent</h3>
			<img
				class="avatar"
				src={`https://avatars.dicebear.com/api/identicon/${$currentUser?.expand?.agent?.id}.svg`}
				alt="avatar"
				width="50px"
			/>
			<p>
				{$currentUser?.expand?.agent?.fname}
				{$currentUser?.expand?.agent?.lname} <br />
				{$currentUser?.expand?.agent?.email}
			</p>
		</section>
	{/if}

	{#if $currentUser?.isAgent && expandedCurrentUser}
		<section>
			<h3>My Clients</h3>
			<FindUser {expandedCurrentUser} />
			<p />
			<Clients {expandedCurrentUser} />
		</section>
	{/if}

	<section>
		{#if $currentUser?.isAgent}
			<button on:click={toggleModal}>Switch to Client</button>
		{:else}
			<button on:click={toggleModal}>Switch to Agent</button>
		{/if}
	</section>

	<section>
		<Signout />
	</section>
</main>

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
