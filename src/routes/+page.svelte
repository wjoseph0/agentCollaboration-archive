<script>
	import { currentUser } from '$lib/pocketbase';
</script>

<main class="container">
	<h2>Hello, {$currentUser?.fname}</h2>
</main>
