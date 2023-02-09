<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import { onMount } from 'svelte';

	onMount(async () => {
		await pb
			.collection('users')
			.authRefresh({}, { expand: 'agent,clients,focusedClient' });
	});

	async function focusClient(clientID) {
		const data = {
			focusedClient: clientID
		};

		await pb.collection('users').update($currentUser.id, data);
		await pb
			.collection('users')
			.authRefresh({}, { expand: 'agent,clients,focusedClient' });
	}
</script>

{#if $currentUser.expand.clients}
	{#each $currentUser.expand.clients as client}
		<section>
			<a href="/account" on:click={focusClient(client.id)}>
				{#if client.profilePic}
					<img
						src="https://wjoseph0.cloud/api/files/_pb_users_auth_/{client.id}/{client.profilePic}"
						alt="profile pic"
						width="50px"
					/>
				{:else}
					<img
						class="avatar"
						src={`https://api.dicebear.com/5.x/initials/svg?seed=${client.fname}%20${client.lname}`}
						alt="avatar"
						width="50px"
					/>
				{/if}
				<small>{client.fname} {client.lname} | {client.email}</small>
			</a>
		</section>
	{/each}
{/if}

<style>
	img {
		border-radius: 0.6rem;
		height: 50px;
	}
</style>
