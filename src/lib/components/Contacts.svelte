<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import { onMount, onDestroy } from 'svelte';
	import { contacts } from '$lib/contacts';

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
</script>

<section>
	<a href="/app/account/contacts/new">Add Contact</a>
</section>

<section id="contacts">
	{#each $contacts as contact}
		<section>
			<a href="/app/chat/{contact.email}">
				<img
					class="avatar"
					src={`https://avatars.dicebear.com/api/identicon/${contact.id}.svg`}
					alt="avatar"
					width="40px"
				/>
				<small>{contact.fname} {contact.lname} | {contact.email}</small>
			</a>
		</section>
	{/each}
</section>

<style>
	#contacts {
		overflow-y: scroll;
	}

	/* width */
	::-webkit-scrollbar {
		width: 1px;
	}

	/* Track */
	::-webkit-scrollbar-track {
		background: hsl(205deg, 16%, 77%);
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background: #888;
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: #555;
	}
</style>
