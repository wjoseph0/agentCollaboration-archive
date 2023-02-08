<script>
	import { goto } from '$app/navigation';
	import { pb } from '$lib/pocketbase';

	let fname = '';
	let lname = '';
	let email = '';
	let password = '';

	const signUp = async () => {
		try {
			const data = {
				fname: fname,
				lname: lname,
				email: email,
				emailVisibility: true,
				password: password,
				passwordConfirm: password
			};
			await pb.collection('users').create(data);
			await pb.collection('users').authWithPassword(
				email,
				password,
				{},
				{
					expand: 'agent,clients,focusedClient'
				}
			);
			goto('/');
		} catch (err) {
			console.error(err);
		}
	};
</script>

<main class="container">
	<h1>Create an account</h1>

	<form on:submit|preventDefault={signUp}>
		<input placeholder="First Name" type="text" bind:value={fname} required />
		<input placeholder="Last Name" type="text" bind:value={lname} required />
		<input placeholder="Email" type="email" bind:value={email} required />
		<input
			placeholder="Password"
			type="password"
			bind:value={password}
			minlength="8"
			required
		/>
		<button>Signup</button>
	</form>

	<a href="/login">I have an account!</a>
</main>
