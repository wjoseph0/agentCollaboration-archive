<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import { onMount, onDestroy } from 'svelte';
	import Deadline from '$lib/components/Deadline.svelte';
	import { fade } from 'svelte/transition';

	let acceptedOffers = [];
	let acceptedOffersSorted = [];
	let loading = true;

	let today = new Date();
	let dd = String(today.getDate()).padStart(2, '0');
	let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	let yyyy = today.getFullYear();
	today = new Date(`${yyyy + '-' + mm + '-' + dd}`);

	const sortAscending = (a, b) => {
		const date1 = new Date(a.date);
		const date2 = new Date(b.date);
		return date1 - date2;
	};

	const isOnOrAfterToday = (d) => {
		let deadlineDate = new Date(d);

		const diffTime = deadlineDate - today;
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		if (!d) {
			return false;
		}

		if (diffDays < 0) {
			return false;
		}

		return true;
	};

	onMount(async () => {
		acceptedOffers = await pb.collection('accepted_offers').getFullList();

		if (acceptedOffers.length > 0) {
			for (let i = 0; i < acceptedOffers.length; i++) {
				let journey = await pb
					.collection('journeys')
					.getOne(acceptedOffers[i].journey, { expand: 'client' });

				if (journey.step === 3) {
					if (isOnOrAfterToday(acceptedOffers[i].earnest_money.substring(0, 10))) {
						acceptedOffersSorted.push({
							parentID: acceptedOffers[i].id,
							id: `EM_${journey.client}`,
							type: 'Earnest Money',
							isComplete: acceptedOffers[i].em_complete,
							date: acceptedOffers[i].earnest_money.substring(0, 10),
							client:
								journey.expand.client.fname.substring(0, 1) +
								journey.expand.client.lname.substring(0, 1),
							clientFullName: `${journey.expand.client.fname} ${journey.expand.client.lname}`
						});
					}

					if (isOnOrAfterToday(acceptedOffers[i].inspection.substring(0, 10))) {
						acceptedOffersSorted.push({
							parentID: acceptedOffers[i].id,
							id: `I_${journey.client}`,
							type: 'Inspection',
							isComplete: acceptedOffers[i].i_complete,
							date: acceptedOffers[i].inspection.substring(0, 10),
							client:
								journey.expand.client.fname.substring(0, 1) +
								journey.expand.client.lname.substring(0, 1),
							clientFullName: `${journey.expand.client.fname} ${journey.expand.client.lname}`
						});
					}

					if (isOnOrAfterToday(acceptedOffers[i].appraisal.substring(0, 10))) {
						acceptedOffersSorted.push({
							parentID: acceptedOffers[i].id,
							id: `A_${journey.client}`,
							type: 'Appraisal',
							isComplete: acceptedOffers[i].a_complete,
							date: acceptedOffers[i].appraisal.substring(0, 10),
							client:
								journey.expand.client.fname.substring(0, 1) +
								journey.expand.client.lname.substring(0, 1),
							clientFullName: `${journey.expand.client.fname} ${journey.expand.client.lname}`
						});
					}

					if (isOnOrAfterToday(acceptedOffers[i].financing.substring(0, 10))) {
						acceptedOffersSorted.push({
							parentID: acceptedOffers[i].id,
							id: `LC_${journey.client}`,
							type: 'Loan Commitment',
							isComplete: acceptedOffers[i].f_complete,
							date: acceptedOffers[i].financing.substring(0, 10),
							client:
								journey.expand.client.fname.substring(0, 1) +
								journey.expand.client.lname.substring(0, 1),
							clientFullName: `${journey.expand.client.fname} ${journey.expand.client.lname}`
						});
					}
				}

				acceptedOffersSorted = acceptedOffersSorted.sort(sortAscending);
			}
		}
		loading = false;
	});
</script>

<div class="container">
	<br />
	<div class="prose text-center sm:text-left">
		<h1>Deadlines</h1>
	</div>
	<br />
	<table class="table">
		<!-- head -->
		<thead>
			<tr>
				<!-- <th>
					<label>
						<input type="checkbox" class="checkbox" />
					</label>
				</th> -->
				<th>Status</th>
				<th>Type</th>
				<th>Date</th>
			</tr>
		</thead>
		<tbody>
			{#if loading}
				<tr><td><span class="loading loading-spinner loading-sm" /></td></tr>
			{:else if acceptedOffersSorted.length > 0}
				{#each acceptedOffersSorted as deadline (deadline.id)}
					<tr in:fade class="hover cursor-pointer" onclick="c{deadline.id}.showModal()">
						<td
							>{#if deadline.isComplete}
								<span class="badge badge-success badge-lg" />
							{:else}
								<span class="badge badge-ghost badge-lg" />
							{/if}
						</td>
						<td
							><div class="flex items-center gap-2">
								<div class="avatar placeholder">
									<div class="mask mask-squircle bg-neutral-focus text-neutral-content w-8 prose">
										<span class="text-xs">
											{deadline.client}
										</span>
									</div>
								</div>
								<div class="font-bold">
									{deadline.type}
								</div>
							</div>
						</td>
						<td
							><p class="text-xs md:text-base prose">
								{deadline.date.substring(5, 7)}/{deadline.date.substring(
									8,
									10
								)}/{deadline.date.substring(0, 4)}
							</p>
						</td>
					</tr>
					<Deadline bind:deadline />
				{/each}
			{:else}
				<tr>
					<td class="text-xs prose"> No deadlines to show </td>
				</tr>
			{/if}
			<br /><br /><br />
		</tbody>
	</table>
</div>
