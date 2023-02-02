<script>
	import Signout from '$lib/components/Signout.svelte';
	import { pb, currentUser } from '$lib/pocketbase';

	let modalVisible = false;

	function toggleModal() {
		if (modalVisible === true) {
			modalVisible = false;
			return;
		}
		modalVisible = true;
	}

	async function switchAccountType() {
		let data;
		if ($currentUser.isAgent) {
			data = {
				isAgent: false
			};
		} else {
			data = {
				isAgent: true
			};
		}

		const updatedRecord = await pb
			.collection('users')
			.update($currentUser.id, data);

		await currentUser.set(updatedRecord);

		toggleModal();
	}
</script>

<main class="container">
	<section>
		<p>{$currentUser?.fname} {$currentUser?.lname}</p>
	</section>

	<section>
		<p>{$currentUser?.email}</p>
	</section>

	<section>
		<p>{$currentUser?.isAgent}</p>
	</section>

	<section>
		{#if $currentUser.isAgent}
			<button on:click={toggleModal}>Switch to Client</button>
		{:else}
			<button on:click={toggleModal}>Switch to Agent</button>
		{/if}
	</section>

	<section>
		<Signout />
	</section>
</main>

{#if modalVisible}
	<dialog open>
		<article>
			<!-- svelte-ignore a11y-missing-content -->
			<a
				href="/app/account"
				aria-label="Close"
				class="close"
				data-target="modal-example"
				on:click={toggleModal}
			/>
			<h3>Confirm change!</h3>
			{#if $currentUser.isAgent}
				<p>Your account type will revert back to a <strong>client</strong>.</p>
			{:else}
				<p>Your account type will change to an <strong>agent</strong>.</p>
			{/if}
			<footer>
				<a
					href="/app/account"
					role="button"
					class="secondary"
					on:click={toggleModal}
				>
					Cancel
				</a>
				<a href="/app/account" role="button" on:click={switchAccountType}>
					Confirm
				</a>
			</footer>
		</article>
	</dialog>
{/if}
