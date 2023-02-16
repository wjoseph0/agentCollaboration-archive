<script>
	import { currentUser } from '$lib/pocketbase.js';
</script>

{#if $currentUser.isAgent}
	<h2>
		{#if $currentUser.expand.focusedClient.profilePic}
			<img
				src="https://wjoseph0.cloud/api/files/_pb_users_auth_/{$currentUser.focusedClient}/{$currentUser
					.expand.focusedClient.profilePic}"
				alt="profile pic"
				width="50px"
			/>
		{:else}
			<img
				class="avatar"
				src={`https://api.dicebear.com/5.x/initials/svg?seed=${$currentUser.expand.focusedClient.fname}%20${$currentUser.expand.focusedClient.lname}`}
				alt="avatar"
				width="50px"
			/>
		{/if}

		{$currentUser.expand.focusedClient.fname}
		{$currentUser.expand.focusedClient.lname}
	</h2>
{:else if !$currentUser.isAgent && $currentUser.agent}
	<h2>
		{#if $currentUser.expand.agent.profilePic}
			<img
				src="https://wjoseph0.cloud/api/files/_pb_users_auth_/{$currentUser.agent}/{$currentUser
					.expand.agent.profilePic}"
				alt="profile pic"
				width="50px"
			/>
		{:else}
			<img
				class="avatar"
				src={`https://api.dicebear.com/5.x/initials/svg?seed=${$currentUser.expand.agent.fname}%20${$currentUser.expand.agent.lname}`}
				alt="avatar"
				width="50px"
			/>
		{/if}
		{$currentUser.expand.agent.fname}
		{$currentUser.expand.agent.lname}
	</h2>
{/if}

<style>
	h2 {
		margin: 0;
		text-align: center;
		height: 5vh;
	}

	img {
		border-radius: 0.6rem;
	}
</style>
