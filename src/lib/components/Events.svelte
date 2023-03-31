<script>
	export let events;
</script>

<table>
	<thead>
		<tr>
			<th scope="col" />
			<th scope="col" />
			<th scope="col" />
		</tr>
	</thead>
	<tbody>
		{#each events as event}
			<tr>
				<th scope="row"><input type="date" value={event.date.substring(0, 10)} disabled /></th>
				<td id="title">{event.name}</td>
				<td><a href="#top">Edit</a></td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	input {
		width: auto;
	}

	#title {
		font-size: large;
		font-weight: 600;
	}
</style>
