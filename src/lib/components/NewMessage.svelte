<script>
	import { currentUser, pb } from '$lib/pocketbase';
	import { filter } from '$lib/bad-words';

	let newMessage = '';
	export let recipient;

	async function sendMessage() {
		const data = {
			text: filter.clean(newMessage),
			user: $currentUser?.id,
			recipient: recipient?.id
		};
		await pb.collection('messages').create(data);
		newMessage = '';
	}
</script>

<form on:submit|preventDefault={sendMessage} class="flex flex-row">
	<input
		placeholder="Message"
		type="text"
		class="input input-bordered basis-3/4"
		bind:value={newMessage}
		required
	/>
	<button type="submit" class="btn btn-primary basis-1/4">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-6 h-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
			/>
		</svg>
	</button>
</form>
