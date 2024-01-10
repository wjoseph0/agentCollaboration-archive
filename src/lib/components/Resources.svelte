<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import UploadResource from '$lib/components/UploadResource.svelte';
	import Resource from '$lib/components/Resource.svelte';

	let resources = [];
	let loading = false;

	onMount(async () => {
		loading = true;
		resources = await pb.collection('resources').getFullList();

		pb.collection('resources').subscribe('*', async () => {
			resources = await pb.collection('resources').getFullList();
		});
		loading = false;
	});
</script>

{#if $currentUser.isAgent}
	<button
		class="btn btn-secondary w-full mx-auto lg:w-3/4 xl:w-2/4"
		onclick="agent_resourcesModal.showModal()">Resources</button
	>
	<dialog id="agent_resourcesModal" class="modal modal-bottom sm:modal-middle">
		<div class="modal-box">
			<div class="flex justify-between items-center">
				<h3 class="font-bold text-lg">Resources</h3>
				<UploadResource />
			</div>
			<br /><br />
			<table class="table my-6">
				<thead>
					<tr> </tr>
				</thead>
				<tbody>
					{#if loading}
						<tr><td><span class="loading loading-spinner loading-sm" /></td></tr>
					{:else if resources.length > 0}
						{#each resources as resource (resource.id)}
							<tr
								class="hover:bg-base-200 cursor-pointer py-6"
								onclick="resourceModal_{resource.id}.showModal()"
							>
								<td class="py-5 flex flex-row justify-between items-center">
									<div class="font-bold">
										{resource.name}
									</div>
									<div>
										{#if resource.clientsOnly}
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
										{:else}
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
										{/if}
									</div>
								</td>
							</tr>
							<Resource {resource} />
						{/each}
					{:else}
						<tr>
							<td class="text-xs prose"> No resources to show </td>
						</tr>
					{/if}
				</tbody>
			</table>
		</div>
		<form method="dialog" class="modal-backdrop">
			<button>close</button>
		</form>
	</dialog>
{:else if !$currentUser.isAgent}
	<button class="btn" onclick="client_resourcesModal.showModal()"
		>{$currentUser.expand.agent.fname}'s Resources</button
	>
	<dialog id="client_resourcesModal" class="modal modal-bottom sm:modal-middle">
		<div class="modal-box">
			<h3 class="font-bold text-lg">{$currentUser.expand.agent.fname}'s Resources</h3>
			<br />
			<table class="table my-6">
				<thead>
					<tr> </tr>
				</thead>
				<tbody>
					{#if loading}
						<tr><td><span class="loading loading-spinner loading-sm" /></td></tr>
					{:else if resources.length > 0}
						{#each resources as resource (resource.id)}
							<tr
								class="hover:bg-base-200 cursor-pointer py-6"
								onclick="resourceModal_{resource.id}.showModal()"
							>
								<td class="py-5 flex flex-row justify-between items-center">
									<div class="font-bold">
										{resource.name}
									</div>
								</td>
							</tr>
							<Resource {resource} />
						{/each}
					{:else}
						<tr>
							<td class="text-xs prose"> No resources to show </td>
						</tr>
					{/if}
				</tbody>
			</table>
		</div>
		<form method="dialog" class="modal-backdrop">
			<button>close</button>
		</form>
	</dialog>
{/if}
