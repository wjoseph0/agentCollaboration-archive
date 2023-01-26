<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import { onMount } from 'svelte';

	let contacts = [];
	onMount(async () => {
		const user = await pb.collection('users').getOne($currentUser.id, {
			expand: 'contacts'
		});
		contacts = user.expand.contacts;
	});
</script>

{#each contacts as contact}
	<img
		class="avatar"
		src={`https://avatars.dicebear.com/api/identicon/${contact.id}.svg`}
		alt="avatar"
		width="40px"
	/>
	<small>{contact.fname} {contact.lname} | {contact.email}</small>
{/each}
