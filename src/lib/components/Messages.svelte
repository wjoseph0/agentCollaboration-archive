<script>
	import { onMount, onDestroy } from 'svelte';
	import { pb } from '$lib/pocketbase';

	let messages = ['Loading...'];
	export let recipient;
	let filter = `(user = "${recipient.id}") || (recipient = "${recipient.id}") `;

	const scrollToBottom = (node) => {
		const scroll = () =>
			node.scroll({
				top: node.scrollHeight,
				behavior: 'smooth'
			});
		scroll();

		return { update: scroll };
	};

	onMount(async () => {
		// Get initial messages
		const resultList = await pb.collection('messages').getList(1, 50, {
			sort: 'created',
			expand: 'user',
			filter: filter
		});
		messages = resultList.items;

		// Subscribe to realtime messages
		await pb
			.collection('messages')
			.subscribe('*', async ({ action, record }) => {
				if (action === 'create') {
					// Fetch associated user
					const user = await pb.collection('users').getOne(record.user);
					record.expand = { user };
					messages = [...messages, record];
					scrollToBottom();
				}
				if (action === 'delete') {
					messages = messages.filter((m) => m.id !== record.id);
					scrollToBottom();
				}
			});

		scrollToBottom();
	});

	// Unsubscribe from realtime messages
	onDestroy(() => {
		pb.collection('messages').unsubscribe();
	});
</script>

<div id="messageContainer" use:scrollToBottom={messages}>
	{#each messages as message (message.id)}
		{#if message == 'Loading...'}
			<div aria-busy="true" />
		{:else}
			<div id="message">
				{#if message.expand.user.profilePic}
					<img
						src="https://wjoseph0.cloud/api/files/_pb_users_auth_/{message.user}/{message
							.expand.user.profilePic}"
						alt="profile pic"
						width="50px"
					/>
				{:else}
					<img
						class="avatar"
						src={`https://api.dicebear.com/5.x/initials/svg?seed=${message.expand.user.fname}%20${message.expand.user.lname}`}
						alt="avatar"
						width="50px"
					/>
				{/if}
				<div id="text">
					<p>
						<strong>{message.expand.user.fname}</strong>
						<strong>{message.expand.user.lname}</strong>
					</p>
					<p>{message.text}</p>
				</div>
			</div>
		{/if}
	{/each}
</div>

<style>
	#messageContainer {
		height: 70vh;
		overflow-y: scroll;
	}

	#message {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		margin-bottom: 2rem;
	}

	#text {
		padding-top: 5px;
	}

	img {
		border-radius: 0.6rem;
		height: 50px;
	}

	p {
		margin-top: 0;
		margin-bottom: 0;
		margin-left: 0.8em;
		line-height: normal;
	}

	/* width */
	::-webkit-scrollbar {
		width: 1px;
	}

	/* Track */
	::-webkit-scrollbar-track {
		background: #11191f;
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background: hsl(205deg, 16%, 77%);
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: rgb(185, 185, 185);
	}
</style>
