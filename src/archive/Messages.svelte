<script>
	export let messages;

	const scrollToBottom = (node) => {
		const scroll = () =>
			node.scroll({
				top: node.scrollHeight,
				behavior: 'smooth'
			});
		scroll();

		return { update: scroll };
	};
</script>

<div id="messageContainer" use:scrollToBottom={messages}>
	{#each messages as message}
		<div id="message">
			{#if message.expand.user.profilePic}
				<img
					src="https://wjoseph0.cloud/api/files/_pb_users_auth_/{message.user}/{message.expand.user
						.profilePic}"
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
</style>
