<script>
	import { currentUser } from '$lib/pocketbase';

	const shareData = {
		title: 'Agentpad',
		text: "Hi! Let's use Agentpad to collaborate!",
		url: `https://agentpadapp.com/signup/${$currentUser.id}`
	};

	const share = async () => {
		await navigator.share(shareData);
	};
</script>

<div class="mx-auto xl:w-1/2">
	<button class="btn btn-primary w-full mx-auto" on:click={share}>Invite</button>
</div>
