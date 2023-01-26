<script>
	import Files from '$lib/components/Files.svelte';
	import UploadFile from '$lib/components/UploadFile.svelte';
</script>

<main class="container">
	<section>
		<UploadFile />
	</section>
	<section>
		<h1>Files</h1>
		<Files />
	</section>
</main>
