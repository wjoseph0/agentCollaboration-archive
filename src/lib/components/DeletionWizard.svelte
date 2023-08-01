<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import { onMount } from 'svelte';

	let confirmCheckbox;
	let deleteButton;
	let journey;
	let cheatsheet;
	let searchProfile;
	let files;

	$: if (confirmCheckbox && deleteButton) {
		if (confirmCheckbox.checked) {
			deleteButton.disabled = false;
		} else {
			deleteButton.disabled = true;
		}
	}

	onMount(async () => {
		if ($currentUser.isAgent) {
			files = await pb.collection('files').getFullList(200, {
				filter: `agent = '${$currentUser.id}' && client = ''`
			});
		} else if (!$currentUser.isAgent) {
			journey = await pb.collection('journeys').getFirstListItem(`client="${$currentUser.id}"`, {});
			cheatsheet = await pb
				.collection('cheatsheets')
				.getFirstListItem(`journey="${journey.id}"`, {});
			searchProfile = await pb
				.collection('search_profiles')
				.getFirstListItem(`journey="${journey.id}"`, {});
		}
	});

	const deleteAccount = async () => {
		if ($currentUser.isAgent) {
			for (let index = 0; index < files.length; index++) {
				await pb.collection('files').delete(files[index].id);
			}
		} else if (!$currentUser.isAgent) {
			await pb.collection('search_profiles').delete(searchProfile.id);
			await pb.collection('cheatsheets').delete(cheatsheet.id);
			await pb.collection('journeys').delete(journey.id);
		}

		await pb.collection('users').delete($currentUser.id);
		pb.authStore.clear();
	};
</script>

<!-- Open the modal using ID.showModal() method -->
<div class="mx-auto xl:w-1/2">
	<button class="btn btn-outline btn-error w-full mx-auto" onclick="accountDeletion.showModal()"
		>Delete Your Account</button
	>
</div>

<dialog id="accountDeletion" class="modal modal-bottom sm:modal-middle">
	<form method="dialog" class="modal-box">
		<h3 class="font-bold text-lg">Can we help?</h3>
		<p>
			If you are encountering a problem, please reach out to <strong>support@agentpadapp.com</strong
			> and we will work to resolve it.
		</p>
		<br />
		<p>If you still wish to delete your account, press continue.</p>
		<div class="modal-action">
			<!-- if there is a button in form, it will close the modal -->
			<button class="btn btn-outline btn-error" onclick="confirmAccountDeletion.showModal()">
				Continue
			</button>
		</div>
	</form>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>

<dialog id="confirmAccountDeletion" class="modal modal-bottom sm:modal-middle">
	<form method="dialog" class="modal-box">
		<h3 class="font-bold text-lg">Confirm Account Deletion</h3>
		<br />
		<div class="flex gap-1">
			<input
				bind:this={confirmCheckbox}
				on:click={() => {
					deleteButton.disabled = false;
				}}
				type="checkbox"
				class="checkbox checkbox-error"
			/>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<span class="text-error">I want to delete my account.</span>
		</div>

		<div class="modal-action">
			<!-- if there is a button in form, it will close the modal -->
			<button bind:this={deleteButton} on:click={deleteAccount} class="btn btn-outline btn-error">
				Delete My Account
			</button>
		</div>
	</form>
	<form method="dialog" class="modal-backdrop">
		<button
			on:click={() => {
				confirmCheckbox.checked = false;
				deleteButton.disabled = true;
			}}>close</button
		>
	</form>
</dialog>
