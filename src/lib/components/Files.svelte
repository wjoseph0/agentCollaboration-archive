<script>
	export let files;
</script>

<table>
	<thead>
		<tr>
			<th scope="col" />
			<th scope="col" />
		</tr>
	</thead>
	<tbody>
		{#each files as file}
			<tr>
				<th scope="row"><i class="bi bi-file-earmark" /></th>
				<td>
					<a
						target="_blank"
						rel="noreferrer"
						href="https://wjoseph0.cloud/api/{file.collectionName}/{file.collectionId}/{file.id}/{file.file}"
					>
						{file.name}
					</a>
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	tbody > tr {
		height: 4em;
	}

	td {
		font-size: medium;
	}
</style>
