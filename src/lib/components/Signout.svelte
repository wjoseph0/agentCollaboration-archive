<script lang="ts">
	import { goto } from '$app/navigation';
	import { currentUser, pb } from '$lib/pocketbase';

	const signOut = () => {
		goto('/login');
		pb.authStore.clear();
	};
</script>

<p>Hello, {$currentUser?.fname}</p>
<button on:click={signOut}>Sign Out</button>

<style>
	p {
		padding-right: 10px;
	}

	button {
		padding: 10px;
		background-color: lightcyan;
		border: none;
		border-radius: 10px;
	}

	button:hover {
		background-color: rgba(224, 255, 255, 0.9);
	}
</style>
