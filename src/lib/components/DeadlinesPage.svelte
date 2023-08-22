<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import { onMount, onDestroy } from 'svelte';

	let acceptedOffers = [];

	onMount(async () => {
		acceptedOffers = await pb.collection('accepted_offers').getFullList();
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
				<th>Name</th>
			</tr>
		</thead>
		<tbody>
			{#each acceptedOffers as acceptedOffer}
				{#if acceptedOffer.earnest_money}
					<tr>
						<td>
							Earnest Money {acceptedOffer.earnest_money.substring(0, 10)}
						</td>
					</tr>
				{/if}
				{#if acceptedOffer.inspection}
					<tr>
						<td>Inspection {acceptedOffer.inspection.substring(0, 10)}</td>
					</tr>
				{/if}
			{/each}
		</tbody>
	</table>
</div>
