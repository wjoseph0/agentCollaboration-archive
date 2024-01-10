<script>
	import { currentUser } from '$lib/pocketbase.js';
	import Clients from '$lib/components/Clients.svelte';
</script>

{#if $currentUser.isAgent && $currentUser.expand.focusedClient}
	<div>
		<h2>
			{#if $currentUser.expand.focusedClient.profilePic}
				<img
					src="https://wjoseph0.cloud/api/files/_pb_users_auth_/{$currentUser.focusedClient}/{$currentUser
						.expand.focusedClient.profilePic}"
					alt="profile pic"
					width="40px"
				/>
			{:else}
				<img
					class="avatar"
					src={`https://api.dicebear.com/5.x/initials/svg?seed=${$currentUser.expand.focusedClient.fname}%20${$currentUser.expand.focusedClient.lname}`}
					alt="avatar"
					width="40px"
				/>
			{/if}

			{$currentUser.expand.focusedClient.fname}
			{$currentUser.expand.focusedClient.lname}
		</h2>
		<Clients />
	</div>
{/if}

<style>
	div {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 5vh;
		padding-top: 0.5rem;
	}

	h2 {
		margin: 0;
		text-align: center;
	}

	img {
		border-radius: 0.6rem;
	}
</style>
