<script>
	import { currentUser } from '$lib/pocketbase';
	import CreateDeadline from '$lib/components/CreateDeadline.svelte';
	import dayjs from 'dayjs';
	import RelativeTime from 'dayjs/plugin/relativeTime';
	import utc from 'dayjs/plugin/UTC';
	export let loading = false;
	export let journey;
	export let deadlines = [];
	dayjs.extend(RelativeTime);
	dayjs.extend(utc);
</script>

<span class="btn btn-primary w-full" onclick="{journey.id}_deadlinesModal.showModal()"
	>Deadlines</span
>

<dialog id="{journey.id}_deadlinesModal" class="modal">
	<div class="modal-box">
		<div class="flex justify-between items-center">
			<h3 class="text-center font-bold text-2xl m-0">Deadlines</h3>
			{#if $currentUser.isAgent}
				<CreateDeadline {journey} />
			{/if}
		</div>
		<table class="table my-6">
			<thead>
				<tr />
			</thead>
			<tbody>
				{#if loading}
					<tr><td><span class="loading loading-spinner loading-sm" /></td></tr>
				{:else if deadlines.length > 0}
					{#each deadlines as deadline (deadline.id)}
						<tr>
							<td class="py-6 flex flex-row justify-between items-center prose">
								<div class="text-md">
									{deadline.type}
								</div>
								{#if dayjs.utc().isBefore(dayjs.utc(deadline.due_date), 'day')}
									<div class="badge badge-primary gap-1 prose py-4">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="2"
											stroke="currentColor"
											class="w-4 h-4"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
											/>
										</svg>
										{dayjs.utc().to(dayjs.utc(deadline.due_date))}
									</div>
								{:else if dayjs.utc().isSame(dayjs.utc(deadline.due_date), 'day')}
									<div class="badge badge-error gap-1 prose py-4">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="2"
											stroke="currentColor"
											class="w-4 h-4"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
											/>
										</svg>
										Today
									</div>
								{:else if dayjs.utc().isAfter(dayjs.utc(deadline.due_date), 'day')}
									<div class="badge badge-outline badge-secondary gap-1 prose py-4">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="2"
											stroke="currentColor"
											class="w-4 h-4"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
											/>
										</svg>
										{dayjs.utc(deadline.due_date).fromNow()}
									</div>
								{/if}
							</td>
						</tr>
					{/each}
				{:else}
					<tr>
						<td class="text-xs prose"> No deadlines to show </td>
					</tr>
				{/if}
			</tbody>
		</table>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
