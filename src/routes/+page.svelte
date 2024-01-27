<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import AgentDashboard from '$lib/components/AgentDashboard.svelte';
	import ClientDashboard from '$lib/components/ClientDashboard.svelte';
	import dayjs from 'dayjs';
	import { env } from '$env/dynamic/public';

	$: if (browser && !$currentUser) {
		goto('/login');
	}

	let isSubscriber;

	onMount(async () => {
		await pb.collection('users').authRefresh({ expand: 'agent' });
		if ($currentUser.isAgent) {
			try {
				let subscription = await pb
					.collection('subscribers')
					.getFirstListItem(`agent="${$currentUser.id}"`);
				isSubscriber = dayjs().isBefore(dayjs(subscription.expiration));
			} catch (error) {
				isSubscriber = false;
			}
		}
	});
</script>

{#if $currentUser && $currentUser.isAgent && isSubscriber === false}
	<dialog id="my_modal_1" class="modal modal-open">
		<div class="modal-box">
			<stripe-pricing-table
				pricing-table-id={env.PUBLIC_PRICING_TABLE_ID}
				publishable-key={env.PUBLIC_STRIPE_PUBLIC_KEY}
				customer-email={$currentUser.email}
			>
			</stripe-pricing-table>
		</div>
	</dialog>
	<AgentDashboard />
{:else if $currentUser && $currentUser.isAgent}
	<AgentDashboard />
{:else if $currentUser && !$currentUser.isAgent}
	<ClientDashboard />
{/if}
