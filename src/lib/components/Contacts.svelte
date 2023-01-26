<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import { onMount, onDestroy } from 'svelte';

	let contacts = [];
	onMount(async () => {
		const user = await pb.collection('users').getOne($currentUser?.id, {
			expand: 'contacts'
		});
		contacts = user.expand.contacts;

		pb.collection('users').subscribe($currentUser?.id, async (record) => {
			record.expand = 'contacts';
			console.log(record);
		});
	});

	onDestroy(() => {
		pb.collection('users').unsubscribe($currentUser?.id);
	});
</script>

{#each contacts as contact}
	<img
		class="avatar"
		src={`https://avatars.dicebear.com/api/identicon/${contact.id}.svg`}
		alt="avatar"
		width="40px"
	/>
	<small>{contact.id}</small>
	<small>{contact.fname} {contact.lname} | {contact.email}</small>
{/each}
