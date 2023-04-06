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

<a href="#top" role="button" on:click={share}>Invite</a>
