<script>
	import File from '$lib/components/File.svelte';
	export let files;
	export let loading;
</script>

<table class="table my-6">
	<thead>
		<tr> </tr>
	</thead>
	<tbody>
		{#if loading}
			<tr><td><span class="loading loading-spinner loading-sm" /></td></tr>
		{:else if files.length > 0}
			{#each files as file (file.id)}
				<tr class="hover:bg-base-200 cursor-pointer py-6" onclick="c{file.id}.showModal()">
					<td class="py-5 flex flex-row justify-between items-center">
						<div class="font-bold">
							{file.name}
						</div>
					</td>
				</tr>
				<File {file} />
			{/each}
		{:else}
			<tr>
				<td class="text-xs prose"> No files to show </td>
			</tr>
		{/if}
	</tbody>
</table>
