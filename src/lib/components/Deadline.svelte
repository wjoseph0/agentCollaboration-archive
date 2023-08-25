<script>
	import { pb, currentUser } from '$lib/pocketbase';

	export let deadline;

	let today = new Date();
	let dd = String(today.getDate()).padStart(2, '0');
	let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	let yyyy = today.getFullYear();
	today = new Date(`${yyyy + '-' + mm + '-' + dd}`);

	let deadlineDate = new Date(`${deadline.date}`);

	const diffTime = Math.abs(deadlineDate - today);
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
</script>

<!-- Open the modal using ID.showModal() method -->
<dialog id="c{deadline.id}" class="modal">
	<form method="dialog" class="modal-box prose">
		<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

		<span>{deadline.clientFullName}</span>
		<div class="flex flex-row justify-between items-center">
			<p class="font-bold text-lg">{deadline.type}</p>
		</div>

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
					<p>{diffDays} days</p>
				</div>
				<input type="date" value={deadline.date} disabled />
			</div>
		{/if}
	</form>

	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
