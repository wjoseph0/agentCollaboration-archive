<script>
	import { pb } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import Client from '$lib/components/Client.svelte';

	let journeys = [];
	let files = [];

	onMount(async () => {
		journeys = await pb.collection('journeys').getFullList(200, {
			sort: '+step',
			expand: 'client'
		});

		files = await pb.collection('files').getFullList(200, {
			sort: '-created'
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
					<!-- <th>
						<label>
							<input type="checkbox" class="checkbox" />
						</label>
					</th> -->
					<th>Name</th>
					<th>Stage</th>
				</tr>
			</thead>
			<tbody>
				{#each journeys as journey}
					<tr onclick="{journey.expand.client.fname}Modal.showModal()">
						<!-- <th>
							<label>
								<input type="checkbox" class="checkbox" />
							</label>
						</th> -->
						<td onclick="">
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
							{#if journey.step === 1}
								<div class="badge badge-neutral">Preparation</div>
							{:else if journey.step === 2}
								<div class="badge badge-secondary">Searching</div>
							{:else if journey.step === 3}
								<div class="badge badge-primary">Closing</div>
							{:else if journey.step === 4}
								<div class="badge badge-accent">Closed</div>
							{/if}
						</td>
					</tr>
					<Client {journey} {files} />
				{/each}
			</tbody>
			<!-- foot -->
			<tfoot>
				<tr>
					<th>Name</th>
					<th>Stage</th>
				</tr>
			</tfoot>
		</table>
	</div>
</div>
