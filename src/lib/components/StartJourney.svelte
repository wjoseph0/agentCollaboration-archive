<script>
	import { currentUser, pb } from '../pocketbase';

	let agent;
	let client;

	$: if ($currentUser.isAgent) {
		agent = $currentUser.id;
		client = $currentUser.focusedClient;
	} else {
		agent = $currentUser.agent;
		client = $currentUser.id;
	}

	const createJourney = async () => {
		const journeyData = {
			agent: agent,
			client: client,
			step: 1
		};

		await pb.collection('journeys').create(journeyData);
		location.reload();
	};
</script>

<button on:click={createJourney} class="btn btn-primary w-full max-w-md">Start Journey</button>
