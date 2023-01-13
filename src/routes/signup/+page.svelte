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

<style>
	form {
		display: flex;
		flex-direction: column;
	}

	input {
		margin-top: 5px;
		margin-bottom: 5px;
		border-radius: 10px;
		border: none;
		padding: 10px;
	}

	button {
		margin-top: 5px;
		height: 50px;
		background-color: lightcyan;
		border: none;
		border-radius: 10px;
	}

	button:is(:hover, :focus) {
		background-color: rgba(224, 255, 255, 0.9);
		cursor: pointer;
	}

	input:focus {
		outline: none;
	}

	a {
		margin-top: 10px;
		color: lightcyan;
	}
</style>
