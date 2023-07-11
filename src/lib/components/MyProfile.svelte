<script>
	import { currentUser } from '$lib/pocketbase';
</script>

<div>
	<div class="card card-side bg-base-100 shadow-xl xl:w-2/4 mx-auto">
		<figure class="w-2/6">
			{#if $currentUser.profilePic}
				<img
					class="h-full w-full"
					src="https://wjoseph0.cloud/api/files/{$currentUser.collectionId}/{$currentUser.id}/{$currentUser.profilePic}"
					alt="profile pic"
				/>
			{:else}
				<img
					class="h-full w-full"
					src={`https://api.dicebear.com/5.x/initials/svg?seed=${$currentUser.fname}%20${$currentUser.lname}`}
					alt="avatar"
				/>
			{/if}
		</figure>
		<div class="card-body">
			<h2 class="card-title">
				{$currentUser.fname}
				{$currentUser.lname}
			</h2>
			<p>{$currentUser.email}</p>
		</div>
	</div>
</div>
