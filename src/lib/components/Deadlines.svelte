<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import CreateDeadline from '$lib/components/CreateDeadline.svelte';
	import dayjs from 'dayjs';
	import RelativeTime from 'dayjs/plugin/relativeTime';
	import utc from 'dayjs/plugin/UTC';
	export let loading = false;
	export let journey;
	export let deadlines = [];
	dayjs.extend(RelativeTime);
	dayjs.extend(utc);

	async function deleteDeadline(deadline) {
		await pb.collection('deadlines').delete(deadline.id);
	}
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
								<div class="flex flex-col gap-2">
									<div class="text-md font-bold">
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
								</div>

								{#if $currentUser.isAgent}
									<div
										class="hover:brightness-75 hover:cursor-pointer"
										on:click={deleteDeadline(deadline)}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											class="w-5 h-5 text-error"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
											/>
										</svg>
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
