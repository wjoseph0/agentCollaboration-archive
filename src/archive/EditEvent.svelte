<script>
	import { pb } from '$lib/pocketbase';

	export let recordId;
	export let name;
	export let date;

	const edit = async () => {
		const data = {
			name: name,
			date: date
		};

		await pb.collection('events').update(recordId, data);
		toggleModal();
	};

	const del = async () => {
		await pb.collection('events').delete(recordId);
		toggleModal();
	};

	let editPromise;
	const editEvent = () => {
		editPromise = edit();
	};

	let deletePromise;
	const deleteEvent = () => {
		deletePromise = del();
	};

	let modalVisible = false;
	const toggleModal = () => {
		if (modalVisible === true) {
			modalVisible = false;
			editPromise = undefined;
			deletePromise = undefined;
			return;
		}
		modalVisible = true;
	};
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

			<h1>Edit Event</h1>

			<label>Name<input type="text" bind:value={name} required /></label>
			<label>Date <input type="date" bind:value={date} required /></label>

			<footer>
				{#await deletePromise}
					<!-- svelte-ignore a11y-missing-content -->
					<a href="#delete" id="delete" aria-busy="true" />
				{:then}
					<a href="#delete" id="delete" on:click={deleteEvent}>Delete</a>
				{:catch}
					<div>
						<p style="color: red">Failed to delete event.</p>
					</div>
				{/await}

				{#await editPromise}
					<!-- svelte-ignore a11y-missing-content -->
					<a href="#edit" role="button" aria-busy="true" />
				{:then}
					<a href="#edit" role="button" on:click={editEvent}>Edit</a>
				{:catch}
					<div>
						<a href="#edit" role="button" on:click={editEvent}>Edit</a>
						<p style="color: red">Failed to edit event.</p>
					</div>
				{/await}
			</footer>
		</article>
	</dialog>
{:else}
	<a href="#top" on:click={toggleModal}>Edit</a>
{/if}

<style>
	article {
		width: 100%;
	}

	footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	#delete {
		color: red;
	}
</style>
