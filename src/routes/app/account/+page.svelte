<script>
	import Signout from '$lib/components/Signout.svelte';
	import { currentUser } from '$lib/pocketbase';
	console.log(currentUser);
</script>

<main class="container">
	<section>
		<p>{$currentUser?.fname} {$currentUser?.lname}</p>
	</section>

	<section>
		<p>{$currentUser?.email}</p>
	</section>

	<section>
		<Signout />
	</section>
</main>
