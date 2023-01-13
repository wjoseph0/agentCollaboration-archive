<script>
	import { onMount, onDestroy } from 'svelte';
	import { currentUser, pb } from '$lib/pocketbase';
	import { filter } from '$lib/bad-words';
	import sendIcon from '$lib/assets/direct.png';

	let newMessage = '';
	let messages = [];

	onMount(async () => {
		// Get initial messages
		const resultList = await pb.collection('messages').getList(1, 50, {
			sort: 'created',
			expand: 'user'
		});
		messages = resultList.items;

		// Subscribe to realtime messages
		await pb.collection('messages').subscribe('*', async ({ action, record }) => {
			if (action === 'create') {
				// Fetch associated user
				const user = await pb.collection('users').getOne(record.user);
				record.expand = { user };
				messages = [...messages, record];
			}
			if (action === 'delete') {
				messages = messages.filter((m) => m.id !== record.id);
			}
		});
	});

	// Unsubscribe from realtime messages
	onDestroy(() => {
		pb.collection('messages').unsubscribe();
	});

	async function sendMessage() {
		const data = {
			text: filter.clean(newMessage),
			user: $currentUser?.id
		};
		await pb.collection('messages').create(data);
		newMessage = '';
	}

	const checkMsgOwner = (message, currentUser) => {
		if (message.user === currentUser?.id) {
			return 'myMsg';
		}
		return 'msg';
	};
</script>

<div class="messages">
	{#each messages as message (message.id)}
		<div class={checkMsgOwner(message, $currentUser)}>
			<div>
				<img
					class="avatar"
					src={`https://avatars.dicebear.com/api/identicon/${message.expand.user.username}.svg`}
					alt="avatar"
					width="40px"
				/>
				<small>
					@{message.expand.user.username}
				</small>
			</div>

			<p class="msg-text">{message.text}</p>
		</div>
	{/each}
	<div id="anchor"><p /></div>
</div>

<form on:submit|preventDefault={sendMessage}>
	<input placeholder="Message" type="text" bind:value={newMessage} required />
	<button type="submit"><img src={sendIcon} alt="Send" /></button>
</form>

<style>
	.messages {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		height: 100%;
		width: 580px;
		max-width: 100vw;
		overflow-y: auto;
		background-color: rgb(60, 100, 100);
		border-radius: 1rem;
	}

	.messages * {
		overflow-anchor: none;
	}

	#anchor {
		overflow-anchor: auto;
		height: 1px;
		width: 1px;
	}

	.msg,
	.myMsg {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row;
		gap: 10px;
		background-color: lightcyan;
		color: darkslategray;
		border-radius: 40px;
		padding: 10px;
		margin: 10px;
		width: fit-content;
		max-width: 100vw;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}

	.myMsg {
		align-self: flex-end;
		background-color: rgba(224, 255, 255, 0.95);
		border-bottom-right-radius: 0px;
		padding-left: 20px;
	}

	.msg {
		border-bottom-left-radius: 0px;
	}

	.msg div,
	.myMsg div {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.msg-text {
		padding-left: 30px;
		padding-right: 25px;
	}

	form {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 5rem;
		width: 580px;
		max-width: 100vw;
	}

	input {
		height: 100%;
		border-radius: 10px;
		border: 0;
		padding: 0 1.5em;
		width: 500px;
		font-size: 0.9rem;
	}

	button {
		height: 100%;
		width: 80px;
		padding: 1.5em;
		background-color: lightcyan;
		color: darkslategray;
		font-weight: 600;
		font-size: 0.9rem;
		border: 0;
		border-radius: 10px;
	}

	button img {
		height: 100%;
		width: auto;
	}

	button:is(:hover, :focus) {
		background-color: rgba(224, 255, 255, 0.9);
		cursor: pointer;
	}

	input:focus {
		outline: none;
	}
</style>
