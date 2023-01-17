<script>
	import { goto } from '$app/navigation';
	import { currentUser, pb } from '$lib/pocketbase';

	const signOut = () => {
		goto('/login');
		pb.authStore.clear();
	};
</script>

<p>Hi, {$currentUser?.fname}</p>
<button on:click={signOut}>Sign Out</button>
