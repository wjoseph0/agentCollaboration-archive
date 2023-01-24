<script>
	import { pb } from '$lib/pocketbase';

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
	<input
		type="email"
		placeholder="Search email"
		bind:value={userEmail}
		on:keyup={searchForUser}
	/>
</section>

{#if user.id}
	<section>
		<p>{user.fname}</p>
		<p>{user.lname}</p>
		<p>{user.email}</p>
		<button>Message</button>
	</section>
{/if}

{#if user.noneFound && userEmail}
	<section>
		<p>No user found.</p>
	</section>
{/if}
