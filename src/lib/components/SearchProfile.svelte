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
	let searchProfileForm;

	$: if ($currentUser.isAgent) {
		buyerName = `${journey.expand.client.fname} ${journey.expand.client.lname}`;
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
			searchProfile = result;
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
			searchProfile = await pb.collection('search_profiles').update(searchProfile.id, data);
			searchProfileForm.close();
			return;
		}

		searchProfile = await pb.collection('search_profiles').create(data);
		searchProfileForm.close();
	}
</script>

<span class="btn" onclick="sp{journey.id}.showModal()">Search Profile</span>
<dialog
	bind:this={searchProfileForm}
	id="sp{journey.id}"
	class="modal modal-bottom sm:modal-middle"
>
	<form
		method="dialog"
		class="modal-box space-y-3 overflow-y-auto prose"
		on:submit|preventDefault={setSearchProfile}
	>
		<span
			class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
			onclick="sp{journey.id}.close()">✕</span
		>
		<h3>Search Profile</h3>

		<div class="form-control w-full max-w-xs">
			<label class="label" for="buyerName">
				<span class="label-text">Buyer's Name</span>
			</label>
			<input bind:value={buyerName} type="text" name="buyerName" class="input input-bordered" />
		</div>

		<div class="form-control w-full max-w-xs">
			<label class="label" for="priceRange">
				<span class="label-text">Price Range</span>
			</label>
			<input bind:value={priceRange} type="text" name="priceRange" class="input input-bordered" />
		</div>

		<div class="form-control w-full max-w-xs">
			<label class="label" for="location">
				<span class="label-text">Location</span>
			</label>
			<input bind:value={location} type="text" name="location" class="input input-bordered" />
		</div>

		<div class="form-control w-full max-w-xs">
			<label class="label" for="bed">
				<span class="label-text">Bedrooms</span>
			</label>
			<input bind:value={bed} type="number" name="bed" class="input input-bordered" />
		</div>

		<div class="form-control w-full max-w-xs">
			<label class="label" for="bath">
				<span class="label-text">Bathrooms</span>
			</label>
			<input bind:value={bath} type="number" name="bath" class="input input-bordered" />
		</div>

		<div class="form-control w-full max-w-xs">
			<label class="label" for="timelineToClose">
				<span class="label-text">Closing Date</span>
			</label>
			<input
				bind:value={timelineToClose}
				type="date"
				name="timelineToClose"
				class="input input-bordered"
			/>
		</div>

		<div class="divider" />

		<div class="modal-action">
			<!-- if there is a button in form, it will close the modal -->
			<button class="btn btn-secondary btn-outline" type="button" onclick="sp{journey.id}.close()"
				>Cancel</button
			>
			<button class="btn btn-primary" type="submit"> Save </button>
		</div>
	</form>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
