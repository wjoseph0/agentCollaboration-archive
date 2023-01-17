<script>
	import { goto } from '$app/navigation';
	import { pb } from '$lib/pocketbase';

	const signOut = () => {
		goto('/login');
		pb.authStore.clear();
	};
</script>

<button on:click={signOut}>Sign Out</button>
