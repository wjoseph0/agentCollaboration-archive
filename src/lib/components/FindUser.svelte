<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import { contacts } from '$lib/contacts';
	import { onMount, onDestroy } from 'svelte';

	onMount(async () => {
		const user = await pb.collection('users').getOne($currentUser?.id, {
			expand: 'contacts'
		});
		contacts.set(user.expand.contacts);
		if ($contacts === undefined) {
			contacts.set([]);
		}

		pb.collection('users').subscribe($currentUser?.id, async (e) => {
			if (e.action === 'update') {
				contacts.set([]);
				for (let i = 0; i < e.record.contacts.length; i++) {
					const contactID = e.record.contacts[i];
					const user = await pb.collection('users').getOne(contactID);
					contacts.set([...$contacts, user]);
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

	const searchForUser = async () => {
		try {
			user = await pb
				.collection('users')
				.getFirstListItem(`email="${userEmail}"`);

			userInContacts = false;
			for (let i = 0; i < $contacts.length; i++) {
				const contact = $contacts[i];
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
		await contacts.set([...$contacts, user]);
		for (let i = 0; i < $contacts.length; i++) {
			const contact = $contacts[i];
			contactsArr.push(contact.id);
		}
		const data = {
			contacts: contactsArr
		};
		await pb.collection('users').update($currentUser.id, data);
		window.location.assign('/app/chat');
	};
</script>

<section>
	<input
		type="email"
		placeholder="Search email"
		bind:value={userEmail}
		on:keyup={searchForUser}
	/>
</section>

{#if user}
	<section>
		<p>{user.fname}</p>
		<p>{user.lname}</p>
		<p>{user.email}</p>
		{#if userInContacts}
			<button disabled>Already in contacts</button>
		{:else if $currentUser.email === user.email}
			<button disabled>Hey that's me!</button>
		{:else}
			<button on:click={addToContacts}>Add to contacts</button>
		{/if}
	</section>
{/if}

{#if !user && userEmail}
	<section>
		<p>No user found.</p>
	</section>
{/if}
