<script>
	import { pb } from '$lib/pocketbase';

	export let journeys;

	let createDeadlineForm;
	let journey;
	let type;
	let date;

	let loading = false;
	let success = false;
	let failed = false;

	const createDeadline = async () => {
		loading = true;

		const data = {
			journey: journey,
			type: type,
			status: 'created',
			due_date: date
		};

		try {
			await pb.collection('deadlines').create(data);
			success = true;
			setTimeout(() => {
				success = false;
			}, 2000);
		} catch (error) {
			failed = true;
			setTimeout(() => {
				failed = false;
			}, 2000);
		}

		loading = false;
		createDeadlineForm.reset();
		journey = -1;
		type = -1;
	};
</script>

<button
	class="btn btn-primary w-full sm:mx-auto sm:w-3/4 fixed inset-x-0 bottom-16 z-40"
	onclick="createDeadlineModal.showModal()">Create Deadline</button
>
<dialog id="createDeadlineModal" class="modal modal-bottom sm:modal-middle">
	<div class="modal-box">
		<h3 class="font-bold text-lg">New Deadline</h3>
		<br />
		<form bind:this={createDeadlineForm} on:submit|preventDefault={createDeadline}>
			<div class="form-control w-full">
				<label class="label" for="journey">
					<span class="label-text">Client</span>
				</label>
				<select bind:value={journey} name="journey" class="select select-bordered w-full" required>
					<option disabled selected></option>
					{#if journeys}
						{#each journeys as journey}
							{#if journey.step === 3}
							<option value={journey.id}
								>{journey.expand.client.fname} {journey.expand.client.lname}</option
							>
							{/if}
						{/each}
					{/if}
				</select>
			</div>

			<div class="form-control w-full">
				<label class="label" for="type">
					<span class="label-text">Type</span>
				</label>
				<select bind:value={type} name="type" class="select select-bordered w-full" required>
					<option disabled selected></option>
					<option value="Earnest Money">Earnest Money</option>
					<option value="Inspection">Inspection</option>
					<option value="Appraisal">Appraisal</option>
					<option value="Loan Commitment">Loan Commitment</option>
				</select>
			</div>

			<div class="form-control w-full">
				<label class="label" for="date">
					<span class="label-text">Date</span>
				</label>
				<input bind:value={date} name="date" type="date" class="input input-bordered" required />
			</div>
		</form>

		<br />

		{#if success}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6 text-success mx-auto"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
		{:else if failed}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6 text-fail mx-auto"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
		{:else if loading}
			<span class="btn btn-primary w-full">
				<span class="loading loading-spinner loading-xs" />
			</span>
		{:else}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<span
				class="btn btn-primary w-full"
				on:click={() => {
					createDeadlineForm.requestSubmit();
				}}>Create</span
			>
		{/if}
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
