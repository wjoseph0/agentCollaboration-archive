<script>
	import Files from '$lib/components/Files.svelte';
	import UploadFile from '$lib/components/UploadFile.svelte';
</script>

<main class="container">
	<section>
		<UploadFile />
	</section>

	<h1>My Files</h1>
	<section class="grid">
		<Files />
	</section>
</main>
