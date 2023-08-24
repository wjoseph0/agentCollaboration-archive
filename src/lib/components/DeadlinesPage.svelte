<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import { onMount, onDestroy } from 'svelte';

	let acceptedOffers = [];
	let acceptedOffersSorted = [];

	const sortAscending = (a, b) => {
		const date1 = new Date(a.date);
		const date2 = new Date(b.date);
		return date1 - date2;
	};

	const onAfterToday = (d) => {
		let date1 = new Date(d);
		date1.setDate(date1.getDate() + 1);
		let today = new Date();

		if (!d) {
			return false;
		}

		if (date1 < today) {
			return false;
		}

		return true;
	};

	onMount(async () => {
		acceptedOffers = await pb.collection('accepted_offers').getFullList();

		for (let i = 0; i < acceptedOffers.length; i++) {
			let journey = await pb
				.collection('journeys')
				.getOne(acceptedOffers[i].journey, { expand: 'client' });

			if (onAfterToday(acceptedOffers[i].earnest_money.substring(0, 10))) {
				acceptedOffersSorted.push({
					type: 'Earnest Money',
					date: acceptedOffers[i].earnest_money.substring(0, 10),
					client:
						journey.expand.client.fname.substring(0, 1) +
						journey.expand.client.lname.substring(0, 1)
				});
			}

			if (onAfterToday(acceptedOffers[i].inspection.substring(0, 10))) {
				acceptedOffersSorted.push({
					type: 'Inspection',
					date: acceptedOffers[i].inspection.substring(0, 10),
					client:
						journey.expand.client.fname.substring(0, 1) +
						journey.expand.client.lname.substring(0, 1)
				});
			}

			if (onAfterToday(acceptedOffers[i].appraisal.substring(0, 10))) {
				acceptedOffersSorted.push({
					type: 'Appraisal',
					date: acceptedOffers[i].appraisal.substring(0, 10),
					client:
						journey.expand.client.fname.substring(0, 1) +
						journey.expand.client.lname.substring(0, 1)
				});
			}

			if (onAfterToday(acceptedOffers[i].financing.substring(0, 10))) {
				acceptedOffersSorted.push({
					type: 'Loan Commitment',
					date: acceptedOffers[i].financing.substring(0, 10),
					client:
						journey.expand.client.fname.substring(0, 1) +
						journey.expand.client.lname.substring(0, 1)
				});
			}
		}

		acceptedOffersSorted = acceptedOffersSorted.sort(sortAscending);
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

				<th>Type</th>
				<th>Date</th>
			</tr>
		</thead>
		<tbody>
			{#each acceptedOffersSorted as acceptedOffer}
				<tr class="hover cursor-pointer">
					<td
						><div class="flex items-center gap-2">
							<div class="avatar placeholder">
								<div
									class="mask mask-squircle bg-neutral-focus text-neutral-content w-12 h-12 prose"
								>
									<span>
										{acceptedOffer.client}
									</span>
								</div>
							</div>
							<div class="font-bold">
								{acceptedOffer.type}
							</div>
						</div>
					</td>
					<td><input type="date" value={acceptedOffer.date} disabled /></td>
				</tr>
			{/each}
			<br /><br /><br />
		</tbody>
	</table>
</div>
