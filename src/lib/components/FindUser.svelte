<script>
	import { pb, currentUser } from '$lib/pocketbase';

	let inputEmail = '';
	let searchedUser;
	let searchModalVisible = false;

	async function searchForUser() {
		try {
			searchedUser = await pb
				.collection('users')
				.getFirstListItem(`email="${inputEmail.toLowerCase()}"`);
		} catch {
			searchedUser = null;
		}
	}

	async function addClient() {
		const currentUserData = {
			clients: [...$currentUser.clients, searchedUser.id]
		};
		const journeyData = {
			agent: $currentUser.id,
			client: searchedUser.id,
			step: 1
		};

		await pb.collection('users').update($currentUser.id, currentUserData);
		await pb
			.collection('users')
			.authRefresh({}, { expand: 'agent,clients,focusedClient' });
		await pb.collection('journeys').create(journeyData);
		toggleSearchModal();
	}

	async function addAgent() {
		const data = {
			agent: searchedUser.id
		};
		await pb.collection('users').update($currentUser.id, data);
		await pb
			.collection('users')
			.authRefresh({}, { expand: 'agent,clients,focusedClient' });
		toggleSearchModal();
	}

	function toggleSearchModal() {
		if (searchModalVisible === true) {
			inputEmail = '';
			searchModalVisible = false;
			return;
		}
		searchModalVisible = true;
	}
</script>

{#if searchModalVisible}
	<dialog open>
		<article>
			<!-- svelte-ignore a11y-missing-content -->
			<a
				href="#close"
				aria-label="Close"
				class="close"
				on:click={toggleSearchModal}
			/>
			{#if $currentUser.isAgent}
				<h3>Add your client!</h3>
			{:else}
				<h3>Add your agent!</h3>
			{/if}
			<input
				placeholder="Search email"
				bind:value={inputEmail}
				on:keyup={searchForUser}
			/>
			{#if searchedUser}
				<p>{searchedUser.fname}</p>
				<p>{searchedUser.lname}</p>
				<p>{searchedUser.email}</p>
				<section>
					{#if $currentUser.email === searchedUser.email}
						<button disabled>Hey that's me!</button>
					{:else if $currentUser.isAgent}
						<button on:click={addClient}>Add client</button>
					{:else}
						<button on:click={addAgent}>Add agent</button>
					{/if}
				</section>
			{:else if inputEmail !== ''}
				<p>No user found.</p>
			{/if}
		</article>
	</dialog>
{:else}
	<a href="#top" on:click={toggleSearchModal}
		><i class="bi bi-plus-circle-dotted" /></a
	>
{/if}

<style>
	i {
		font-size: 2em;
	}
</style>
