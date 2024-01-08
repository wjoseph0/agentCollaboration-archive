<script>
	import { pb, currentUser } from '$lib/pocketbase';

	let name;
	let date;
	let agent;
	let client;

	if ($currentUser.isAgent) {
		agent = $currentUser.id;
		client = $currentUser.focusedClient;
	} else {
		agent = $currentUser.agent;
		client = $currentUser.id;
	}

	const createEvent = async () => {
		const data = {
			name: name,
			agent: agent,
			client: client,
			date: date
		};

		await pb.collection('events').create(data);
		toggleModal();
		name = undefined;
		date = undefined;
		promise = undefined;
	};

	let promise;

	const handleSubmit = () => {
		promise = createEvent();
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

			<h1>Create Event</h1>

			<form on:submit|preventDefault={handleSubmit}>
				<label>Name<input type="text" bind:value={name} required /></label>
				<label>Date <input type="date" bind:value={date} required /></label>

				{#await promise}
					<button aria-busy="true" />
				{:then}
					<button>Create</button>
				{:catch error}
					<button>Create</button>
					<p style="color: red">Error: {error}</p>
				{/await}
			</form>
		</article>
	</dialog>
{:else}
	<button on:click={toggleModal}>Create Event</button>
{/if}

<style>
	button {
		margin-bottom: 0;
	}

	article {
		width: 100%;
	}
</style>
