<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import { onMount, onDestroy } from 'svelte';
	import { clients } from '$lib/clients';

	onMount(async () => {
		const user = await pb.collection('users').getOne($currentUser?.id, {
			expand: 'clients'
		});

		clients.set(user.expand.clients);

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
</script>

{#each $clients as client}
	<section>
		<a href="/app/chat/{client.email}">
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
