<script>
	import { pb } from '$lib/pocketbase';
	import { onMount } from 'svelte';

	let journeys = [];

	onMount(async () => {
		journeys = await pb.collection('journeys').getFullList(200, {
			sort: '+step',
			expand: 'client'
		});
	});
</script>

<div class="container">
	<div class="prose">
		<h1>Active Clients</h1>
	</div>
	<br />
	<div class="overflow-x-auto">
		<table class="table sm:table-xs">
			<!-- head -->
			<thead>
				<tr>
					<th>
						<label>
							<input type="checkbox" class="checkbox" />
						</label>
					</th>
					<th>Name</th>
					<th>Stage</th>

					<th />
				</tr>
			</thead>
			<tbody>
				{#each journeys as journey}
					<tr>
						<th>
							<label>
								<input type="checkbox" class="checkbox" />
							</label>
						</th>
						<td>
							<div class="flex items-center space-x-3">
								<div class="avatar placeholder">
									<div
										class="mask mask-squircle bg-neutral-focus text-neutral-content w-12 h-12 prose"
									>
										<span>
											{journey.expand.client.fname[0]}{journey.expand.client.lname[0]}
										</span>
									</div>
								</div>
								<div>
									<div class="font-bold">
										{journey.expand.client.fname}
										{journey.expand.client.lname}
									</div>
								</div>
							</div>
						</td>
						<td>
							{#if journey.step < 3}
								<div class="badge badge-neutral">Preparation</div>
							{:else if journey.step < 5}
								<div class="badge badge-secondary">Searching</div>
							{:else if journey.step < 6}
								<div class="badge badge-primary">Accepted Offer</div>
							{:else if journey.step > 5}
								<div class="badge badge-accent">Closing</div>
							{/if}
						</td>
						<th>
							<button class="btn btn-ghost btn-xs">details</button>
						</th>
					</tr>
				{/each}
			</tbody>
			<!-- foot -->
			<tfoot>
				<tr>
					<th />
					<th>Name</th>
					<th>Stage</th>
					<th />
				</tr>
			</tfoot>
		</table>
	</div>
</div>
