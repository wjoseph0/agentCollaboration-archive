<script>
	import { pb } from '$lib/pocketbase';

	let forgotPasswordModal;
	let passwordResetForm;
	let email;
	let success = false;
	let failed = false;

	const sendPasswordReset = async () => {
		try {
			await pb.collection('users').requestPasswordReset(email);
			success = true;
			setTimeout(() => {
				success = false;
			}, 5000);
		} catch (error) {
			console.error(error);
			failed = true;
			setTimeout(() => {
				failed = false;
			}, 5000);
		}

		forgotPasswordModal.close();
		email = '';
	};
</script>

<!-- Open the modal using ID.showModal() method -->

<p
	class="cursor-pointer text-xs w-full text-right text-primary"
	onclick="forgotPasswordModal.showModal()"
>
	Forgot Password?
</p>

<dialog bind:this={forgotPasswordModal} id="forgotPasswordModal" class="modal">
	<div class="modal-box">
		<h3 class="font-bold text-lg">Forgot Password</h3>
		<br />
		<form bind:this={passwordResetForm} on:submit|preventDefault={sendPasswordReset}>
			<input
				bind:value={email}
				type="email"
				class="input input-bordered w-full"
				placeholder="Email"
				required
			/>
			<br />
			<br />
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<button class="btn btn-primary w-full" type="submit">Send Password Reset Email</button>
		</form>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>

{#if success}
	<div class="toast toast-center">
		<div class="alert alert-success">
			<span>Password reset email sent!</span>
		</div>
	</div>
{/if}

{#if failed}
	<div class="toast toast-center">
		<div class="alert alert-error">
			<span>Password reset email failed to send.</span>
		</div>
	</div>
{/if}
