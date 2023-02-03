<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import { clients } from '$lib/clients';
	import { onMount, onDestroy } from 'svelte';

	export let expandedCurrentUser;
	onMount(async () => {
		clients.set(expandedCurrentUser.expand.clients);
		if ($clients === undefined) {
			clients.set([]);
		}

		pb.collection('users').subscribe($currentUser?.id, async (e) => {
			if (e.action === 'update') {
				clients.set([]);
				for (let i = 0; i < e.record.clients.length; i++) {
					const clientID = e.record.clients[i];
					const user = await pb.collection('users').getOne(clientID);
					clients.set([...$clients, user]);
				}
			}
		});
	});

	onDestroy(() => {
		pb.collection('users').unsubscribe();
	});

	let userEmail = '';
	let user;
	let userIsClient = false;
	let searchVisible = false;

	const searchForUser = async () => {
		try {
			user = await pb
				.collection('users')
				.getFirstListItem(`email="${userEmail}"`);

			userIsClient = false;
			for (let i = 0; i < $clients.length; i++) {
				const client = $clients[i];
				if (client.email === user.email) {
					userIsClient = true;
				}
			}
		} catch {
			user = undefined;
		}
	};

	const addClient = async () => {
		let clientsArr = [];
		await clients.set([...$clients, user]);
		for (let i = 0; i < $clients.length; i++) {
			const contact = $clients[i];
			clientsArr.push(contact.id);
		}
		console.log(clientsArr);
		console.log($clients);
		const data = {
			clients: clientsArr
		};
		await pb.collection('users').update($currentUser.id, data);
		toggleSearch();
	};

	async function addAgent() {
		const data = {
			agent: user.id
		};

		const updateCurrentUser = await pb
			.collection('users')
			.update($currentUser.id, data);

		await currentUser.set(updateCurrentUser);
		location.reload();
	}

	const toggleSearch = () => {
		userEmail = '';
		if (searchVisible === true) {
			searchVisible = false;
			return;
		}
		searchVisible = true;
	};
</script>

{#if !$currentUser?.isAgent}
	{#if searchVisible}
		<dialog open>
			<article>
				<!-- svelte-ignore a11y-missing-content -->
				<!-- svelte-ignore a11y-invalid-attribute -->
				<a
					href="#"
					aria-label="Close"
					class="close"
					data-target="modal-example"
					on:click={toggleSearch}
				/>
				<h3>Add your agent!</h3>
				<input
					type="email"
					placeholder="Search email"
					bind:value={userEmail}
					on:keyup={searchForUser}
				/>
				{#if user && userEmail !== ''}
					<p>{user.fname}</p>
					<p>{user.lname}</p>
					<p>{user.email}</p>
					<section>
						{#if $currentUser.email === user.email}
							<button disabled>Hey that's me!</button>
						{:else}
							<button on:click={addAgent}>Add agent</button>
						{/if}
					</section>
				{/if}

				{#if !user && userEmail !== ''}
					<p>No user found.</p>
				{/if}
			</article>
		</dialog>
	{:else}
		<!-- svelte-ignore a11y-invalid-attribute -->
		<a href="#" on:click={toggleSearch}>Add my agent</a>
	{/if}
{/if}

{#if $currentUser?.isAgent}
	{#if searchVisible}
		<dialog open>
			<article>
				<!-- svelte-ignore a11y-missing-content -->
				<!-- svelte-ignore a11y-invalid-attribute -->
				<a href="#" aria-label="Close" class="close" on:click={toggleSearch} />
				<h3>Add your client!</h3>
				<input
					type="email"
					placeholder="Search email"
					bind:value={userEmail}
					on:keyup={searchForUser}
				/>
				{#if user && userEmail !== ''}
					<p>{user.fname}</p>
					<p>{user.lname}</p>
					<p>{user.email}</p>
					<section>
						{#if userIsClient}
							<button disabled>Client added</button>
						{:else if $currentUser.email === user.email}
							<button disabled>Hey that's me!</button>
						{:else}
							<button on:click={addClient}>Add client</button>
						{/if}
					</section>
				{/if}

				{#if !user && userEmail !== ''}
					<p>No user found.</p>
				{/if}
			</article>
		</dialog>
	{:else}
		<!-- svelte-ignore a11y-invalid-attribute -->
		<a href="#" on:click={toggleSearch}>Add client</a>
	{/if}
{/if}
