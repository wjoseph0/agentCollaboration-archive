<script>
	import { pb, currentUser } from '$lib/pocketbase';

	let uploadFileForm;
	let fileName;
	let newFile;

	const uploadFile = async () => {
		const formData = new FormData();
		formData.append('file', newFile[0]);
		formData.append('name', fileName);
		if ($currentUser.isAgent) {
			formData.append('agent', $currentUser.id);
			formData.append('client', $currentUser.focusedClient);
		} else if (!$currentUser.isAgent) {
			formData.append('agent', $currentUser.agent);
			formData.append('client', $currentUser.id);
		}
		await pb.collection('files').create(formData);
		uploadFileForm.close();
		fileName = undefined;
		newFile = null;
	};
</script>

<!-- Open the modal using ID.showModal() method -->
<button class="btn btn-primary" onclick="uploadFile.showModal()">Upload File</button>
<dialog bind:this={uploadFileForm} id="uploadFile" class="modal modal-bottom sm:modal-middle">
	<form method="dialog" class="modal-box space-y-3" on:submit|preventDefault={uploadFile}>
		<h3 class="font-bold text-lg">Upload a file</h3>
		<input
			type="text"
			class="input input-bordered"
			bind:value={fileName}
			placeholder="File Name"
			required
		/>
		<input type="file" class="file-input" bind:files={newFile} required />
		<div class="modal-action">
			<!-- if there is a button in form, it will close the modal -->
			<button class="btn btn-secondary btn-outline" type="button" onclick="uploadFile.close()"
				>Cancel</button
			>
			<button class="btn btn-primary" type="submit"> Upload </button>
		</div>
	</form>
</dialog>
