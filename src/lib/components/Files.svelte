<script>
	import { currentUser } from '$lib/pocketbase';
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
					<td>
						{#if $currentUser.isAgent}
							{#if file.isPublic}
								<div class="flex flex-row justify-end items-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										class="w-5 h-5"
									>
										<path
											fill-rule="evenodd"
											d="M14.5 1A4.5 4.5 0 0010 5.5V9H3a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1.5V5.5a3 3 0 116 0v2.75a.75.75 0 001.5 0V5.5A4.5 4.5 0 0014.5 1z"
											clip-rule="evenodd"
										/>
									</svg>

									<span>Public</span>
								</div>
							{:else if !file.isPublic && !file.client}
								<div class="flex flex-row justify-end items-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										class="w-5 h-5"
									>
										<path
											fill-rule="evenodd"
											d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
											clip-rule="evenodd"
										/>
									</svg>
									<span>Private</span>
								</div>
							{:else if file.client}
								<div class="flex flex-row justify-end items-center">
									<div class="avatar placeholder">
										<div class="bg-neutral-focus text-neutral-content rounded-full w-8">
											<span class="text-xs" />
										</div>
									</div>
								</div>
							{/if}
						{/if}
					</td>
				</tr>
				<File {file} />
			{/each}
		</tbody>
	</table>
{:else if path === '/'}
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
