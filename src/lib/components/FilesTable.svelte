<script>
	import { currentUser } from '$lib/pocketbase';
	import File from '$lib/components/File.svelte';
	export let files;
	export let loading;
</script>

<table class="table">
	<thead>
		<tr>
			<th>Name</th>
		</tr>
	</thead>
	<tbody>
		{#if loading}
			<tr><td><span class="loading loading-spinner loading-sm" /></td></tr>
		{:else if files.length > 0}
			{#each files as file (file.id)}
				<tr class="hover cursor-pointer py-6" onclick="c{file.id}.showModal()">
					<td class="py-5 flex flex-row justify-between items-center">
						<div class="font-bold">
							{file.name}
						</div>
						{#if $currentUser.isAgent}
							<div class="avatar placeholder">
								<div class="rounded-full bg-neutral-focus text-neutral-content w-8">
									<span class="text-md">
										{file.expand.client.fname[0]}{file.expand.client.lname[0]}
									</span>
								</div>
							</div>
						{/if}
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
