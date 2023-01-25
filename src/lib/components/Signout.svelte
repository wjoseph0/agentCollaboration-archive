<script>
	import { goto } from '$app/navigation';
	import { pb } from '$lib/pocketbase';

	const signOut = () => {
		goto('/login');
		pb.authStore.clear();
	};
</script>

<button class="secondary" on:click={signOut}>Sign Out</button>
