<script>
	import { currentUser } from '$lib/pocketbase';

	const shareData = {
		title: 'OpenAgent',
		text: "Hi! Let's use OpenAgent to collaborate!",
		url: `https://open-agent.vercel.app/signup/${$currentUser.id}`
	};

	const share = async () => {
		await navigator.share(shareData);
	};
</script>

<a href="#top" role="button" on:click={share}>Invite</a>
