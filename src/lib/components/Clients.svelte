<script>
	import { currentUser } from '$lib/pocketbase';
</script>

{#each $currentUser.expand.clients as client}
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
