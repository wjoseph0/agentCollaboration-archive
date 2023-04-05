<script>
	import { pb } from '$lib/pocketbase';
	import UploadAgentFile from '$lib/components/UploadAgentFile.svelte';

	export let files;
	$: myFiles = files.filter((f) => f.client === '');

	const makePublic = async (id) => {
		const data = {
			isPublic: true
		};

		await pb.collection('files').update(id, data);
	};

	let modalVisible = false;
	function toggleModal() {
		if (modalVisible === true) {
			modalVisible = false;
			return;
		}
		modalVisible = true;
	}
</script>

{#if modalVisible}
	<dialog open>
		<article>
			<!-- svelte-ignore a11y-missing-content -->
			<a
				href="#top"
				aria-label="Close"
				class="close"
				data-target="modal-example"
				on:click={toggleModal}
			/>

			<h1>My Files</h1>

			<table>
				<thead>
					<tr>
						<th scope="col" />
						<th scope="col" />
						<th scope="col" />
					</tr>
				</thead>
				<tbody>
					{#each myFiles as file}
						<tr>
							<th scope="row"><i class="bi bi-file-earmark" /></th>
							<td>
								<a
									target="_blank"
									rel="noreferrer"
									href="https://wjoseph0.cloud/api/{file.collectionName}/{file.collectionId}/{file.id}/{file.file}"
								>
									{file.name}
								</a>
							</td>
							{#if !file.isPublic}
								<td><a href="#top" role="button" on:click={makePublic(file.id)}>Make public</a></td>
							{:else}
								<td>PUBLIC</td>
							{/if}
						</tr>
					{/each}
				</tbody>
			</table>
			<UploadAgentFile />
		</article>
	</dialog>
{:else}
	<button on:click={toggleModal}>My Files</button>
{/if}

<style>
	button {
		margin-bottom: 0;
	}

	article {
		width: 100%;
	}
</style>
