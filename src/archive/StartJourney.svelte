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

<div class="flex flex-col justify-center items-center gap-3">
	<h2>Press the button below to start your journey.</h2>

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
			d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
		/>
	</svg>

	<button on:click={createJourney} class="btn btn-primary w-full max-w-md">Start Journey</button>
</div>
