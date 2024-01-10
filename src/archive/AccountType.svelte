<script>
	import { pb, currentUser } from '$lib/pocketbase';

	async function switchAccountType() {
		let data;
		if ($currentUser.isAgent) {
			data = {
				isAgent: false
			};
		} else {
			data = {
				isAgent: true
			};
		}

		await pb.collection('users').update($currentUser.id, data, {
			expand: 'agent,clients,focusedClient'
		});

		await pb.collection('users').authRefresh({}, { expand: 'agent,clients,focusedClient' });
	}
</script>

<!-- Open the modal using ID.showModal() method -->
<button class="btn btn-outline btn-secondary" onclick="my_modal_5.showModal()"
	>Change Account Type</button
>
<dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
	<form method="dialog" class="modal-box">
		<h3 class="font-bold text-lg">Confirm Change</h3>
		{#if $currentUser.isAgent}
			<p class="py-4">Your account type will revert back to a <strong>client</strong>.</p>
		{:else}
			<p class="py-4">Your account type will change to an <strong>agent</strong>.</p>
		{/if}
		<div class="modal-action">
			<!-- if there is a button in form, it will close the modal -->
			<button class="btn">Cancel</button>
			<button class="btn btn-outline btn-secondary" on:click={switchAccountType}> Confirm </button>
		</div>
	</form>
</dialog>
