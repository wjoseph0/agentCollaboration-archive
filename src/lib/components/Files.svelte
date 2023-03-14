<script>
	export let files;
</script>

{#each files as file}
	<a
		target="_blank"
		rel="noreferrer"
		href="https://wjoseph0.cloud/api/{file.collectionName}/{file.collectionId}/{file.id}/{file.file}"
	>
		<div>
			<img
				src="https://wjoseph0.cloud/api/{file.collectionName}/{file.collectionId}/{file.id}/{file.file}?thumb=100x300"
				alt=" "
				style="width: 100px"
			/>
			<small>{file.name}</small>
		</div>
	</a>
{/each}

<style>
	div {
		margin-bottom: 2em;
		font-weight: bold;
	}
</style>
