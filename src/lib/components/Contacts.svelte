<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import { onMount, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';

	export const contacts = writable([]);

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

{#if ($contacts = [])}
	<a href="/app/account/contacts">Add contacts</a>
{/if}
