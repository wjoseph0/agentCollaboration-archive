<script>
	import { pb, currentUser } from '$lib/pocketbase';

	export let deadline;

	let deadlineStatusSelector;
	$: deadlineStatus = deadlineStatusSelector?.value;

	let today = new Date();
	let dd = String(today.getDate()).padStart(2, '0');
	let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	let yyyy = today.getFullYear();
	today = new Date(`${yyyy + '-' + mm + '-' + dd}`);

	let deadlineDate = new Date(`${deadline.date}`);

	const diffTime = Math.abs(deadlineDate - today);
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	const updateDeadlineStatus = async (value) => {
		if (value === 'completed') {
			deadline.isComplete = true;
		} else if (value === 'created') {
			deadline.isComplete = false;
		}

		if (deadline.type === 'Earnest Money' && value === 'completed') {
			await pb.collection('accepted_offers').update(deadline.parentID, { em_complete: true });
		} else if (deadline.type === 'Earnest Money' && value === 'created') {
			await pb.collection('accepted_offers').update(deadline.parentID, { em_complete: false });
		}

		if (deadline.type === 'Inspection' && value === 'completed') {
			await pb.collection('accepted_offers').update(deadline.parentID, { i_complete: true });
		} else if (deadline.type === 'Inspection' && value === 'created') {
			await pb.collection('accepted_offers').update(deadline.parentID, { i_complete: false });
		}

		if (deadline.type === 'Appraisal' && value === 'completed') {
			await pb.collection('accepted_offers').update(deadline.parentID, { a_complete: true });
		} else if (deadline.type === 'Appraisal' && value === 'created') {
			await pb.collection('accepted_offers').update(deadline.parentID, { a_complete: false });
		}

		if (deadline.type === 'Loan Commitment' && value === 'completed') {
			await pb.collection('accepted_offers').update(deadline.parentID, { f_complete: true });
		} else if (deadline.type === 'Loan Commitment' && value === 'created') {
			await pb.collection('accepted_offers').update(deadline.parentID, { f_complete: false });
		}
	};
</script>

<!-- Open the modal using ID.showModal() method -->
<dialog id="c{deadline.id}" class="modal">
	<form method="dialog" class="modal-box prose">
		<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

		<div class="flex items-center">
			{#if deadlineStatus === 'created'}
				<span class="badge badge-ghost badge-lg" />
			{:else if deadlineStatus === 'completed'}
				<span class="badge badge-success badge-lg" />
			{/if}
			<select
				bind:this={deadlineStatusSelector}
				class="select select-sm max-w-xs"
				on:change={() => {
					updateDeadlineStatus(deadlineStatusSelector.value);
					deadlineStatus = deadlineStatusSelector.value;
				}}
			>
				{#if !deadline.isComplete}
					<option value="created" selected>Created</option>
				{:else}
					<option value="created">Created</option>
				{/if}
				{#if deadline.isComplete}
					<option value="completed" selected>Completed</option>
				{:else}
					<option value="completed">Completed</option>
				{/if}
			</select>
		</div>
		<br /><br />
		<span class="italic">{deadline.clientFullName}</span>

		<div class="flex justify-between items-center">
			<p class="font-bold text-xl">{deadline.type}</p>
		</div>
		<br /> <br />

		{#if diffDays === 0}
			<div class="flex flex-row justify-start items-center text-error gap-1">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<p>TODAY</p>
			</div>
		{:else if diffDays === 1}
			<div class="flex flex-row justify-start items-center text-warning gap-1">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<p>Tomorrow</p>
			</div>
		{:else}
			<div class="flex flex-row justify-between align-center">
				<div class="flex flex-row justify-start items-center text-primary gap-1">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span>{diffDays} days</span>
				</div>

				<span>
					{deadline.date.substring(5, 7)}/{deadline.date.substring(8, 10)}/{deadline.date.substring(
						0,
						4
					)}
				</span>
			</div>
		{/if}
	</form>

	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
