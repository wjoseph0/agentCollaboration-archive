<script>
	import Files from '$lib/components/Files.svelte';
	import UploadFile from '$lib/components/UploadFile.svelte';
	import { currentUser } from '$lib/pocketbase';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	$: if (
		browser &&
		(($currentUser.isAgent && !$currentUser.focusedClient) ||
			(!$currentUser.isAgent && !$currentUser.agent))
	) {
		goto('/account');
	}
</script>

{#if $currentUser}
	{#if ($currentUser.isAgent && $currentUser.focusedClient) || (!$currentUser.isAgent && $currentUser.agent)}
		<main class="container">
			{#if $currentUser.isAgent}
				<section>
					<UploadFile />
				</section>
			{/if}
			<section>
				<Files />
			</section>
		</main>
	{/if}
{/if}
