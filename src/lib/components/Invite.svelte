<script>
	import Clipboard from 'clipboard';
	import { currentUser } from '$lib/pocketbase';

	const delay = (ms) => new Promise((res) => setTimeout(res, ms));

	const cb = new Clipboard('.copy');

	let copySuccess;

	cb.on('success', async () => {
		copySuccess = true;
		await delay(2000);
		copySuccess = undefined;
	});

	cb.on('error', async () => {
		copySuccess = false;
		await delay(2000);
		copySuccess = undefined;
	});

	let modalVisible = false;

	function toggleModal() {
		if (modalVisible === true) {
			modalVisible = false;
			return;
		}
		modalVisible = true;
	}
</script>

{#if modalVisible}
	<dialog open>
		<article>
			<!-- svelte-ignore a11y-missing-content -->
			<a href="#top" aria-label="Close" class="close" on:click={toggleModal} />
			<h1>Invite Client</h1>

			<label
				>Here is your sharable link!
				<input
					type="text"
					placeholder="https://open-agent.vercel.app/signup/{$currentUser.id}"
					disabled
				/>
			</label>

			{#if copySuccess == true}
				<button
					data-tooltip="Copied!"
					data-placement="top"
					class="copy"
					data-clipboard-text="https://open-agent.vercel.app/signup/{$currentUser.id}"
					>Copy link</button
				>
			{:else if copySuccess == false}
				<button
					data-tooltip="Failed!"
					data-placement="top"
					class="copy"
					data-clipboard-text="https://open-agent.vercel.app/signup/{$currentUser.id}"
					>Copy link</button
				>
			{:else}
				<button
					class="copy"
					data-clipboard-text="https://open-agent.vercel.app/signup/{$currentUser.id}"
					>Copy link</button
				>
			{/if}
		</article>
	</dialog>
{:else}
	<a href="#top" role="button" on:click={toggleModal}>Invite Client</a>
{/if}
