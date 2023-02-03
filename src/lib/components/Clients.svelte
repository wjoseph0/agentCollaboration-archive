<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import { onMount, onDestroy } from 'svelte';
	import { clients } from '$lib/clients';

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
</script>

{#each $clients as client}
	<section>
		<a href="/app/chat/{client.id}">
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
