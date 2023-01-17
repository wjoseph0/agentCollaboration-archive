<script>
	import { currentUser } from '../../lib/pocketbase';
</script>

<nav class="container">
	<ul>
		<li><a href="/app">Home</a></li>
		<li><a href="/app/chat">Chat</a></li>
		<li><a href="/app/files">Files</a></li>
	</ul>
	<ul>
		<li>Hi, {$currentUser?.fname}</li>
		<li><a href="/app/account">Account</a></li>
	</ul>
</nav>

<slot />
