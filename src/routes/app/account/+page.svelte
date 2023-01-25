<script>
	import Signout from '$lib/components/Signout.svelte';
	import { currentUser } from '$lib/pocketbase';
</script>

<main class="container">
	<section>
		<p>{$currentUser?.fname} {$currentUser?.lname}</p>
	</section>

	<section>
		<p>{$currentUser?.email}</p>
	</section>

	<section>
		<a href="/app/account/new"><button>Contacts</button></a>
	</section>

	<section>
		<Signout />
	</section>
</main>
