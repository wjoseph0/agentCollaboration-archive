<script>
	import { pb, currentUser } from '$lib/pocketbase';

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
				<img
					class="avatar"
					src={`https://avatars.dicebear.com/api/identicon/${client.id}.svg`}
					alt="avatar"
					width="40px"
				/>
				<small>{client.fname} {client.lname} | {client.email}</small>
			</a>
		</section>
	{/each}
{/if}
