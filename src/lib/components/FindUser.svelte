<script>
	import { currentUser, pb } from '$lib/pocketbase';

	let userEmail = '';
	let user = {};

	const searchForUser = async () => {
		try {
			user = await pb
				.collection('users')
				.getFirstListItem(`email="${userEmail}"`);
		} catch {
			user = { noneFound: true };
		}
	};
</script>

<section>
	<!-- svelte-ignore a11y-autofocus -->
	<input
		type="email"
		placeholder="Search email"
		bind:value={userEmail}
		on:keyup={searchForUser}
		autofocus
	/>
</section>

{#if user.id}
	<section>
		<p>{user.fname}</p>
		<p>{user.lname}</p>
		<p>{user.email}</p>
		{#if user.email !== $currentUser.email}
			<a href="/app/chat/{user.email}"><button>Message</button></a>
		{/if}
	</section>
{/if}

{#if user.noneFound && userEmail}
	<section>
		<p>No user found.</p>
	</section>
{/if}
