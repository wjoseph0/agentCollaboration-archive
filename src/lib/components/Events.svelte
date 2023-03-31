<script>
	import EditEvent from '$lib/components/EditEvent.svelte';
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
				<td>
					<EditEvent recordId={event.id} name={event.name} date={event.date.substring(0, 10)} />
				</td>
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
