<script>
	import '../app.css';
	import { onMount, onDestroy } from 'svelte';
	import { pb, currentUser } from '$lib/pocketbase';
	import * as dayjs from 'dayjs';
	import AppNav from '$lib/components/AppNav.svelte';
	import SupportButton from '$lib/components/SupportButton.svelte';
	import Signout from '$lib/components/Signout.svelte';

	let isSubscriber;

	onMount(async () => {
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
	<!-- TODO: Make call to subscribe a modal that is full length and stays open -->
	<div class="container">
		<div class="flex flex-col gap-10 mt-5 mb-24">
			<div class="card border shadow-2xl lg:w-3/4 xl:w-2/4 mx-auto w-full">
				<div class="card-body prose">
					<h2>Subscribe</h2>
					<stripe-pricing-table
						pricing-table-id="prctbl_1Oa02aIeLs0cYwtvOOGumbJP"
						publishable-key="pk_test_51Mk88hIeLs0cYwtvXKND9ZmGDII7n8OxVPHf4Bhs0vNr9y3S3qxDD9wl1jGp26QRV7mW8OZV9lrOdcLFW9rVsumh00UdhseTg3"
						client-reference-id={$currentUser.id}
						customer-email={$currentUser.email}
					>
					</stripe-pricing-table>
				</div>
			</div>

			<SupportButton />
			<Signout />
		</div>
	</div>
	<slot />
	<AppNav />
{:else if $currentUser}
	<slot />
	<AppNav />
{:else}
	<slot />
{/if}
