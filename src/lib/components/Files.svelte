<script>
	export let files;
</script>

{#each files as file}
	<a
		target="_blank"
		rel="noreferrer"
		href="https://wjoseph0.cloud/api/{file.collectionName}/{file.collectionId}/{file.id}/{file.file}"
	>
		<p>
			<img
				src="https://wjoseph0.cloud/api/{file.collectionName}/{file.collectionId}/{file.id}/{file.file}?thumb=100x300"
				alt=" "
				style="width: 100px"
			/>{file.name}
		</p>
	</a>
{/each}
