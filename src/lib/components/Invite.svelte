<script>
	import { currentUser } from '$lib/pocketbase';

	const shareData = {
		title: 'Agentpad',
		text: "Hi! Let's use Agentpad to collaborate!",
		url: `https://app.agentpadapp.com/signup/${$currentUser.id}`
	};

	const share = async () => {
		await navigator.share(shareData);
	};
</script>

<button class="btn" on:click={share}>Invite</button>
