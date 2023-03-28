<nav class="container">
	<ul class="nav">
		<li><a href="/chat"><i class="bi bi-calendar-event" /> </a></li>
		<li><a href="/chat"><i class="bi bi-chat" /> </a></li>
		<li><a href="/"><i class="bi bi-geo-alt" /></a></li>
		<li><a href="/files"><i class="bi bi-folder" /></a></li>
		<li><a href="/account"><i class="bi bi-person" /></a></li>
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
