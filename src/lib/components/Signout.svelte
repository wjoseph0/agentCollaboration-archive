<script>
	import { pb } from '$lib/pocketbase';

	const signOut = () => {
		pb.authStore.clear();
	};
</script>

<button class="secondary" on:click={signOut}>Sign Out</button>
