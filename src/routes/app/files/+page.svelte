<script>
	import Files from '$lib/components/Files.svelte';
	import UploadFile from '$lib/components/UploadFile.svelte';
	import { currentUser } from '$lib/pocketbase';
</script>

<main class="container">
	{#if $currentUser?.isAgent}
		<section>
			<UploadFile />
		</section>
	{/if}
	<section>
		<h1>Files</h1>
		<Files />
	</section>
</main>
