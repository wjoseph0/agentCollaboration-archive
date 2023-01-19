<script>
	import { pb, currentUser } from '$lib/pocketbase';

	let showForm = false;
	let newFile;
	let fileName;

	const uploadFile = async () => {
		const formData = new FormData();
		formData.append('file', newFile[0]);
		formData.append('name', fileName);
		formData.append('user', $currentUser.id);
		await pb.collection('files').create(formData);
		formVisibilty();
	};

	const formVisibilty = () => {
		if (showForm === true) {
			showForm = false;
			return;
		}

		showForm = true;
	};
</script>

{#if showForm}
	<form on:submit|preventDefault={uploadFile}>
		<select bind:value={fileName} required>
			<option value="" selected>Select file type...</option>
			<option value="Inspection Report">Inspection Report</option>
		</select>
		<input bind:files={newFile} type="file" required />
		<div>
			<button type="submit">Upload</button>
			<button type="button" class="secondary" on:click={formVisibilty}>Cancel</button>
		</div>
	</form>
{/if}

{#if !showForm}
	<button on:click={formVisibilty}>New</button>
{/if}
