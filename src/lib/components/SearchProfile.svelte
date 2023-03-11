<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import { onMount } from 'svelte';

	export let journey;

	let searchProfilePromise;
	let searchProfile;
	let buyerName;
	let priceRange;
	let location;
	let bed;
	let bath;
	let timelineToClose;
	let modalVisible = false;

	$: if ($currentUser.isAgent) {
		buyerName = `${$currentUser.expand.focusedClient.fname} ${$currentUser.expand.focusedClient.lname}`;
	} else {
		buyerName = `${$currentUser.fname} ${$currentUser.lname}`;
	}

	$: data = {
		journey: journey.id,
		buyerName: buyerName,
		priceRange: priceRange,
		location: location,
		bed: bed,
		bath: bath,
		timelineToClose: timelineToClose
	};

	onMount(() => {
		searchProfilePromise = pb
			.collection('search_profiles')
			.getFirstListItem(`journey='${journey.id}'`);

		searchProfilePromise.then((result) => {
			buyerName = result.buyerName;
			priceRange = result.priceRange;
			location = result.location;
			bed = result.bed;
			bath = result.bath;
			timelineToClose = result.timelineToClose?.substring(0, 10);
		});
	});

	async function setSearchProfile() {
		if (searchProfile) {
			searchProfile = await pb
				.collection('search_profiles')
				.update(searchProfile.id, data);
			toggleModal();
			return;
		}

		searchProfile = await pb.collection('search_profiles').create(data);
		toggleModal();
	}

	function toggleModal() {
		if (modalVisible === true) {
			modalVisible = false;
			return;
		}
		modalVisible = true;
	}
</script>

<div class="container">
	{#if searchProfile}
		<a href="#top" on:click={toggleModal}>View search profile</a>
	{:else}
		{#await searchProfilePromise}
			<!-- svelte-ignore a11y-missing-content -->
			<a href="#top" aria-busy="true" />
		{:then}
			<a href="#top" on:click={toggleModal}>View search profile</a>
		{:catch}
			<a href="#top" on:click={toggleModal}>Fill out search profile</a>
		{/await}
	{/if}
</div>

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
			<h1>Search Profile</h1>
			<form>
				<label>
					Buyer's Name
					<input bind:value={buyerName} type="text" />
				</label>

				<label>
					Price Range
					<input bind:value={priceRange} type="text" />
				</label>

				<label>
					Location
					<input bind:value={location} type="text" />
				</label>

				<label>
					Bed
					<input bind:value={bed} type="number" />
				</label>

				<label>
					Bath
					<input bind:value={bath} type="number" />
				</label>

				<label>
					Closing Date
					<input bind:value={timelineToClose} type="date" />
				</label>
			</form>
			<footer>
				<a href="#top" role="button" class="secondary" on:click={toggleModal}>
					Cancel
				</a>
				<a href="#top" role="button" on:click={setSearchProfile}>Update</a>
			</footer>
		</article>
	</dialog>
{/if}

<style>
	.container {
		padding-top: 0.5em;
	}
</style>
