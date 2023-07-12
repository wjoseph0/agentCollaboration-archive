<script>
	import { page } from '$app/stores';
	import File from '$lib/components/File.svelte';

	export let files;

	$: path = $page.url.pathname;
</script>

{#if path === '/files'}
	<table class="table">
		<!-- head -->
		<thead>
			<tr>
				<!-- <th>
				<label>
					<input type="checkbox" class="checkbox" />
				</label>
			</th> -->
				<th>Name</th>
			</tr>
		</thead>
		<tbody>
			{#each files as file (file.id)}
				<tr class="hover cursor-pointer py-6" onclick="c{file.id}.showModal()">
					<td class="py-5">
						<div class="font-bold">
							{file.name}
						</div>
					</td>
				</tr>
				<File {file} />
			{/each}
		</tbody>
	</table>
{:else}
	<table class="table">
		<tbody>
			{#each files as file (file.id)}
				<tr class="hover cursor-pointer py-6" onclick="c{file.id}.showModal()">
					<td class="py-5">
						<div class="font-bold">
							{file.name}
						</div>
					</td>
				</tr>
				<File {file} />
			{/each}
		</tbody>
	</table>
{/if}
