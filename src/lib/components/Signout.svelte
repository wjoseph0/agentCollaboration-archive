<script>
	import { pb } from '$lib/pocketbase';

	const signOut = () => {
		pb.authStore.clear();
	};
</script>

<!-- Open the modal using ID.showModal() method -->
<div class="w-full mx-auto lg:w-3/4 xl:w-1/2">
	<button class="btn btn-outline btn-error w-full mx-auto" onclick="confirmSignout.showModal()"
		>Sign Out</button
	>
</div>

<dialog id="confirmSignout" class="modal modal-bottom sm:modal-middle">
	<form method="dialog" class="modal-box">
		<h3 class="font-bold text-lg">Confirm Sign Out</h3>
		<div class="modal-action">
			<!-- if there is a button in form, it will close the modal -->
			<button class="btn">Cancel</button>
			<button class="btn btn-outline btn-error" on:click={signOut}> Sign Out </button>
		</div>
	</form>
</dialog>
