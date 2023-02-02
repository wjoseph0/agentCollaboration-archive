<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import { clients } from '$lib/clients';
	import { onMount, onDestroy } from 'svelte';

	onMount(async () => {
		const user = await pb.collection('users').getOne($currentUser?.id, {
			expand: 'agent,clients'
		});
		clients.set(user.expand.clients);
		if ($clients === undefined) {
			clients.set([]);
		}

		pb.collection('users').subscribe($currentUser?.id, async (e) => {
			if (e.action === 'update') {
				clients.set([]);
				for (let i = 0; i < e.record.contacts.length; i++) {
					const contactID = e.record.contacts[i];
					const user = await pb.collection('users').getOne(contactID);
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
	let userInContacts = false;
	let searchVisible = false;

	const searchForUser = async () => {
		try {
			user = await pb
				.collection('users')
				.getFirstListItem(`email="${userEmail}"`);

			userInContacts = false;
			for (let i = 0; i < $clients.length; i++) {
				const contact = $clients[i];
				if (contact.email === user.email) {
					userInContacts = true;
				}
			}
		} catch {
			user = undefined;
		}
	};

	const addToContacts = async () => {
		let contactsArr = [];
		await clients.set([...$clients, user]);
		for (let i = 0; i < $clients.length; i++) {
			const contact = $clients[i];
			contactsArr.push(contact.id);
		}
		const data = {
			contacts: contactsArr
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
