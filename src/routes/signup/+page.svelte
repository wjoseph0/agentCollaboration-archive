<script>
	import { goto } from '$app/navigation';
	import { pb } from '$lib/pocketbase';

	let username;
	let password;
	let fname;
	let lname;
	let email;

	const signUp = async () => {
		try {
			const data = {
				username,
				password,
				passwordConfirm: password,
				fname: fname,
				lname: lname,
				email: email
			};
			await pb.collection('users').create(data);
			await pb.collection('users').authWithPassword(username, password);
			goto('/app');
		} catch (err) {
			console.error(err);
		}
	};
</script>

<main class="container">
	<h2>Create an account</h2>

	<form on:submit|preventDefault={signUp}>
		<input placeholder="First Name" type="text" bind:value={fname} required />
		<input placeholder="Last Name" type="text" bind:value={lname} required />
		<input placeholder="Username" type="text" bind:value={username} required />
		<input placeholder="Password" type="password" bind:value={password} required />
		<input placeholder="Email" type="email" bind:value={email} required />
		<button type="submit">Signup</button>
	</form>

	<a href="/login">I have an account!</a>
</main>
