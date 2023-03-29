<script>
	export let events;
</script>

{#each events as event}
	<div>
		<input type="date" value={event.date.substring(0, 10)} disabled />
		<p>{event.name}</p>
	</div>
{/each}

<style>
	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
