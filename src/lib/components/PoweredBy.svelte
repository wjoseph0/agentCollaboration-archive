<script>
	import { currentUser } from '$lib/pocketbase';
</script>

{#if $currentUser.expand.agent.teamLogo}
	<div class="flex justify-center items-center gap-2">
		<span class="prose italic text-xs">powered by</span>
		<img
			class="w-12 my-0"
			src="https://wjoseph0.cloud/api/files/_pb_users_auth_/{$currentUser.agent}/{$currentUser
				.expand.agent.teamLogo}"
			alt="Team Logo"
		/>
	</div>
{:else if $currentUser.expand.agent.brokerageLogo}
	<div class="flex justify-center items-center gap-2">
		<span class="prose italic text-xs">powered by</span>
		<img
			class="w-12 my-0"
			src="https://wjoseph0.cloud/api/files/_pb_users_auth_/{$currentUser.agent}/{$currentUser
				.expand.agent.brokerageLogo}"
			alt="Brokerage Logo"
		/>
	</div>
{/if}
