<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import NewPreferredVendor from '$lib/components/NewPreferredVendor.svelte';

	let vendors = [];

	onMount(async () => {
		vendors = await pb.collection('preferred_vendors').getFullList();

		pb.collection('preferred_vendors').subscribe('*', async () => {
			vendors = await pb.collection('preferred_vendors').getFullList();
		});
	});

	const deleteVendor = async (vendor) => {
		await pb.collection('preferred_vendors').delete(vendor.id);
	};
</script>

{#if $currentUser.isAgent}
	<button
		class="btn btn-neutral w-full lg:w-3/4 xl:w-2/4 mx-auto"
		onclick="agent_preferredVendorsModal.showModal()">Preferred Vendors</button
	>
	<dialog id="agent_preferredVendorsModal" class="modal modal-bottom sm:modal-middle">
		<div class="modal-box">
			<div class="flex justify-between items-center">
				<h3 class="font-bold text-lg">Preferred Vendors</h3>
				<NewPreferredVendor />
			</div>
			<br /><br />
			{#each vendors as vendor}
				<div class="flex justify-between items-center">
					<h4 class="font-bold">{vendor.type}</h4>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div class="hover:brightness-75 hover:cursor-pointer" on:click={deleteVendor(vendor)}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-5 h-5 text-error"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
							/>
						</svg>
					</div>
				</div>
				<p>{vendor.name}</p>
				<p>{vendor.contact}</p>
				<p>{vendor.phone}</p>
				<p>{vendor.email}</p>
				<br />
			{/each}
		</div>
		<form method="dialog" class="modal-backdrop">
			<button>close</button>
		</form>
	</dialog>
{:else if !$currentUser.isAgent}
	<button class="btn btn-neutral" onclick="client_preferredVendorsModal.showModal()"
		>Preferred Vendors</button
	>
	<dialog id="client_preferredVendorsModal" class="modal modal-bottom sm:modal-middle">
		<div class="modal-box">
			<h3 class="font-bold text-lg">Preferred Vendors</h3>
			<br />
			{#each vendors as vendor}
				<h4 class="font-bold">{vendor.type}</h4>
				<p>{vendor.name}</p>
				<p>{vendor.contact}</p>
				<p>{vendor.phone}</p>
				<p>{vendor.email}</p>
				<br />
			{/each}
		</div>
		<form method="dialog" class="modal-backdrop">
			<button>close</button>
		</form>
	</dialog>
{/if}
