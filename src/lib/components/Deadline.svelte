<script>
	import { pb } from '$lib/pocketbase';

	export let deadline;

	let deadlineStatusSelector;
	let scheduled_date;

	if (deadline.scheduled_date) {
		scheduled_date =
			deadline.scheduled_date.substring(0, 10) + 'T' + deadline.scheduled_date.substring(11, 16);
	}

	let today = new Date();
	let dd = String(today.getDate()).padStart(2, '0');
	let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	let yyyy = today.getFullYear();
	today = new Date(`${yyyy + '-' + mm + '-' + dd}`);

	const diffTime = Math.abs(new Date(`${deadline.due_date}`) - today);
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	const updateDeadline = async () => {
		const data = {
			status: deadlineStatusSelector.value,
			scheduled_date:
				scheduled_date?.substring(0, 10) + ' ' + scheduled_date?.substring(11, 16) + ':00.000Z'
		};
		await pb.collection('deadlines').update(deadline.id, data);
	};
</script>

<!-- Open the modal using ID.showModal() method -->
<dialog id="c{deadline.id}" class="modal">
	<form method="dialog" class="modal-box prose">
		<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

		<div class="flex items-center">
			{#if deadline.status === 'created'}
				<span class="badge badge-ghost badge-lg" />
			{:else if deadline.status === 'scheduled'}
				<span class="badge badge-info badge-lg" />
			{:else if deadline.status === 'complete'}
				<span class="badge badge-success badge-lg" />
			{/if}
			<select
				bind:this={deadlineStatusSelector}
				class="select select-sm max-w-xs"
				on:change={() => {
					updateDeadline();
				}}
			>
				{#if deadline.status === 'created'}
					<option value="created" selected>Created</option>
				{:else}
					<option value="created">Created</option>
				{/if}
				{#if deadline.status === 'scheduled'}
					<option value="scheduled" selected>Scheduled</option>
				{:else}
					<option value="scheduled">Scheduled</option>
				{/if}
				{#if deadline.status === 'complete'}
					<option value="complete" selected>Complete</option>
				{:else}
					<option value="complete">Complete</option>
				{/if}
			</select>
			{#if deadline.status === 'scheduled'}
				<div>
					<input
						on:change={() => {
							updateDeadline();
						}}
						bind:value={scheduled_date}
						type="datetime-local"
						class="input prose"
					/>
				</div>
			{/if}
		</div>
		<br /><br />
		<span class="italic"
			>{deadline.expand.journey.expand.client.fname}
			{deadline.expand.journey.expand.client.lname}</span
		>

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
					{deadline.due_date.substring(5, 7)}/{deadline.due_date.substring(
						8,
						10
					)}/{deadline.due_date.substring(0, 4)}
				</span>
			</div>
		{/if}
	</form>

	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
