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
		const data = {
			clients: [...$currentUser.clients, searchedUser.id]
		};
		await pb.collection('users').update($currentUser.id, data);
		await pb
			.collection('users')
			.authRefresh({}, { expand: 'agent,clients,focusedClient' });
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
{:else if $currentUser.isAgent}
	<a href="#addmyclient" on:click={toggleSearchModal}>Add my client</a>
{:else}
	<a href="#addmyagent" on:click={toggleSearchModal}>Add my agent</a>
{/if}
