<script>
	import { currentUser } from '$lib/pocketbase';
	import { page } from '$app/stores';
	import File from '$lib/components/File.svelte';

	export let files;
	export let loading;

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
			{#if loading}
				<tr><td><span class="loading loading-spinner loading-sm" /></td></tr>
			{:else if files.length > 0}
				{#each files as file (file.id)}
					{#if $currentUser.isAgent}
						{#if file.isPublic}
							<tr class="hover cursor-pointer py-6" onclick="c{file.id}.showModal()">
								<td class="py-5">
									<div class="font-bold">
										{file.name}
									</div>
								</td>
								<td>
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
								</td>
							</tr>
						{:else if file.clientsOnly}
							<tr class="hover cursor-pointer py-6" onclick="c{file.id}.showModal()">
								<td class="py-5">
									<div class="font-bold">
										{file.name}
									</div>
								</td>
								<td>
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
										<span>Clients Only</span>
									</div>
								</td>
							</tr>
						{:else if !file.client}
							<tr class="hover cursor-pointer py-6" onclick="c{file.id}.showModal()">
								<td class="py-5">
									<div class="font-bold">
										{file.name}
									</div>
								</td>
								<td>
									<div class="flex flex-row justify-end items-center">
										<span>Archive</span>
									</div>
								</td>
							</tr>
						{/if}
					{:else if !$currentUser.isAgent}
						<tr class="hover cursor-pointer py-6" onclick="c{file.id}.showModal()">
							<td class="py-5 flex flex-row justify-between items-center">
								<div class="font-bold">
									{file.name}
								</div>
								{#if !file.client}
									<div class="flex flex-row justify-end items-center">
										{#if $currentUser.expand.agent.profilePic}
											<div class="avatar">
												<div class="w-8 rounded-full">
													<img
														src="https://wjoseph0.cloud/api/files/_pb_users_auth_/{$currentUser.agent}/{$currentUser
															.expand.agent.profilePic}"
														alt=""
													/>
												</div>
											</div>
										{:else}
											<div class="avatar placeholder">
												<div class="rounded-full bg-neutral-focus text-neutral-content w-8">
													<span class="text-md">
														{$currentUser.expand.agent.fname[0]}{$currentUser.expand.agent.lname[0]}
													</span>
												</div>
											</div>
										{/if}
									</div>
								{/if}
							</td>
						</tr>
					{/if}
					<File {file} />
				{/each}
			{:else}
				<tr>
					<td class="text-xs prose"> No files to show </td>
				</tr>
			{/if}
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
