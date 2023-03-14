<script>
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

		await pb.collection('users').update($currentUser.id, data, {
			expand: 'agent,clients,focusedClient'
		});

		await pb
			.collection('users')
			.authRefresh({}, { expand: 'agent,clients,focusedClient' });

		toggleModal();
	}
</script>

{#if modalVisible}
	<dialog open>
		<article>
			<!-- svelte-ignore a11y-missing-content -->
			<a
				href="/account"
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
					href="/account"
					role="button"
					class="secondary"
					on:click={toggleModal}
				>
					Cancel
				</a>
				<a href="/account" role="button" on:click={switchAccountType}>
					Confirm
				</a>
			</footer>
		</article>
	</dialog>
{:else}
	<button class="outline" on:click={toggleModal}>Change Account Type</button>
{/if}
