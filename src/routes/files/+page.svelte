<script>
	import Files from '$lib/components/Files.svelte';
	import UploadFile from '$lib/components/UploadFile.svelte';
	import { currentUser } from '$lib/pocketbase';
</script>

{#if $currentUser}
	<main class="container">
		{#if $currentUser?.isAgent}
			<section>
				<UploadFile />
			</section>
		{/if}
		<section>
			<Files />
		</section>
	</main>
{/if}
