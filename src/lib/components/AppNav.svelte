<script>
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';

	onMount(() => {
		themeChange(false);
	});
</script>

<nav class="container">
	<ul class="nav">
		<li><a href="/"><i class="bi bi-compass-fill" /></a></li>
		<li><a href="/chat"><i class="bi bi-chat-right-text-fill" /></a></li>
		<li><a href="/files"><i class="bi bi-folder-fill" /></a></li>
		<li><a href="/account"><i class="bi bi-person-fill" /></a></li>

		<input
			type="checkbox"
			class="toggle"
			data-toggle-theme="corporate,business"
			data-act-class="ACTIVECLASS"
		/>
	</ul>
</nav>

<style>
	.nav {
		display: flex;
		width: 100%;
		justify-content: space-between;
		margin: 0;
	}

	i {
		font-size: 2em;
	}

	@media (max-width: 576px) {
		.container {
			position: fixed;
			bottom: 0;
		}
	}
</style>
