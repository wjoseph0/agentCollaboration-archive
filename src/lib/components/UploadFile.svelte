<script>
	import { pb, currentUser } from '$lib/pocketbase';

	let showForm = false;
	let newFile;
	let fileName;

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
	<dialog open>
		<article>
			<h1>Upload File</h1>
			<form on:submit|preventDefault={uploadFile}>
				<input
					type="text"
					class="input input-bordered"
					bind:value={fileName}
					placeholder="Name"
					required
				/>
				<input type="file" class="file-input" bind:files={newFile} required />
				<div>
					<button type="submit" class="btn">Upload</button>
					<button type="button" class="btn" on:click={formVisibilty}>Cancel</button>
				</div>
			</form>
		</article>
	</dialog>
{/if}

{#if !showForm}
	<button class="btn btn-primary" on:click={formVisibilty}>New</button>
{/if}
