<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import BuyerRoadmap from '$lib/components/BuyerRoadmap.svelte';
	import SellerRoadmap from '$lib/components/SellerRoadmap.svelte';
</script>

{#if $currentUser.clientType === 'buyer'}
	<BuyerRoadmap />
{:else if $currentUser.clientType === 'seller'}
	<SellerRoadmap />
{/if}
