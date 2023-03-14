<script>
	import { pb } from '$lib/pocketbase';

	const signOut = () => {
		pb.authStore.clear();
	};
</script>

<button class="secondary outline" on:click={signOut}>Sign Out</button>
