<script>
	import { currentUser } from '$lib/pocketbase';
</script>

<div>
	<div class="card card-side bg-base-100 shadow-xl xl:w-2/4 mx-auto">
		<figure class="w-2/6">
			{#if $currentUser.expand.agent.profilePic}
				<img
					class="h-full w-full"
					src="https://wjoseph0.cloud/api/files/_pb_users_auth_/{$currentUser.agent}/{$currentUser
						.expand.agent.profilePic}"
					alt="avatar"
				/>
			{:else}
				<img
					class="h-full w-full"
					src={`https://api.dicebear.com/5.x/initials/svg?seed=${$currentUser.expand.agent.fname}%20${$currentUser.expand.agent.lname}`}
					alt="avatar"
				/>
			{/if}
		</figure>
		<div class="card-body">
			<div class="badge badge-secondary badge-outline">My Agent</div>
			<h2 class="card-title">
				{$currentUser.expand.agent.fname}
				{$currentUser.expand.agent.lname}
			</h2>
			<p>{$currentUser.expand.agent.email}</p>
		</div>
	</div>
</div>
