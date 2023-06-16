<script>
	import { pb } from '$lib/pocketbase';

	const signOut = () => {
		pb.authStore.clear();
	};
</script>

<!-- Open the modal using ID.showModal() method -->
<button class="btn btn-outline btn-error" onclick="confirmSignout.showModal()">Sign Out</button>
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
