<script>
	export let files;
</script>

<table class="table">
	<!-- <thead>
		<tr>
			<th />
		</tr>
	</thead> -->
	<tbody>
		{#each files as file}
			<tr class="hover">
				<a
					target="_blank"
					rel="noreferrer"
					href="https://wjoseph0.cloud/api/{file.collectionName}/{file.collectionId}/{file.id}/{file.file}"
				>
					<td>
						{file.name}
					</td>
				</a>
			</tr>
		{/each}
	</tbody>
</table>
