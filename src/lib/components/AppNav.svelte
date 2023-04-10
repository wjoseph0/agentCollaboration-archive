<nav class="container">
	<ul class="nav">
		<li><a href="/calendar"><i class="bi bi-calendar-event" /> </a></li>
		<li><a href="/chat"><i class="bi bi-chat" /> </a></li>
		<li><a href="/"><i class="bi bi-house" /></a></li>
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

	.container {
		border-bottom: 1px solid #ededed;
	}

	i {
		font-size: 2em;
	}

	a,
	li {
		padding: 0;
		margin: 0;
	}

	@media (max-width: 576px) {
		.container {
			position: fixed;
			bottom: 0;
			border-top: 1px solid #ededed;
		}

		.nav {
			padding-bottom: 1.375em;
		}
	}
</style>
