<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import FindUser from '$lib/components/FindUser.svelte';

	export let modalVisible = false;

	onMount(async () => {
		await pb
			.collection('users')
			.authRefresh({}, { expand: 'agent,clients,focusedClient' });
	});

	async function focusClient(clientID) {
		const data = {
			focusedClient: clientID
		};

		await pb.collection('users').update($currentUser.id, data);
		await pb
			.collection('users')
			.authRefresh({}, { expand: 'agent,clients,focusedClient' });
		location.reload();
	}

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
			<a
				href="#top"
				aria-label="Close"
				class="close"
				data-target="modal-example"
				on:click={toggleModal}
			/>
			<div id="header">
				<h1>My Clients</h1>
				<FindUser />
			</div>
			{#if $currentUser.expand.clients}
				{#each $currentUser.expand.clients as client}
					<section>
						<a id="clients" href="#top" on:click={focusClient(client.id)}>
							{#if client.profilePic}
								<img
									src="https://wjoseph0.cloud/api/files/_pb_users_auth_/{client.id}/{client.profilePic}"
									alt="profile pic"
									width="50px"
								/>
							{:else}
								<img
									class="avatar"
									src={`https://api.dicebear.com/5.x/initials/svg?seed=${client.fname}%20${client.lname}`}
									alt="avatar"
									width="50px"
								/>
							{/if}
							<div>
								<p>
									{client.fname}
									{client.lname}
								</p>
								<small>
									{client.email}
								</small>
							</div>
						</a>
					</section>
				{/each}
			{/if}
		</article>
	</dialog>
{:else}
	<a href="#top" on:click={toggleModal}><i class="bi bi-pencil-square" /></a>
{/if}

<style>
	img {
		border-radius: 0.6rem;
		height: 50px;
	}

	i {
		font-size: 2.2em;
	}

	section,
	h1 {
		text-align: left;
	}

	a#clients {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
	}

	div {
		padding-left: 0.5em;
		padding-top: 0.3em;
	}

	p,
	small {
		margin-top: 0;
		margin-bottom: 0;
		line-height: normal;
	}

	div#header {
		display: flex;
		flex-direction: row;
	}

	h1 {
		padding-right: 0.5em;
		margin-bottom: 1em;
	}
</style>
