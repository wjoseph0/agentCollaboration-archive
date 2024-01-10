<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import OfferCheatSheet from '$lib/components/OfferCheatSheet.svelte';

	let journey;

	onMount(async () => {
		journey = await pb
			.collection('journeys')
			.getFirstListItem(`client='${$currentUser.id}' && agent='${$currentUser.agent}'`);
	});
</script>

<div class="container">
	<div class="flex flex-col gap-40 prose text-center mx-auto mt-5 mb-24">
		<h1>Home</h1>
		<div class="flex flex-col gap-10">
			{#if journey}
				<OfferCheatSheet {journey} />
				<button
					class="btn btn-neutral w-full"
					on:click={() => {
						goto('/files');
					}}>Files</button
				>
				<button
					class="btn btn-neutral w-full"
					on:click={() => {
						goto('/account');
					}}>Account</button
				>
			{/if}
		</div>
	</div>
</div>
