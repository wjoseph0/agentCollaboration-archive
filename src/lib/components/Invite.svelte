<script>
	import { currentUser } from '$lib/pocketbase';

	const shareData = {
		title: 'Agentpad',
		text: "Hi! Let's use Agentpad to collaborate!",
		url: 'https://agentpadapp.com/signup'
	};

	// "Hi! Let's use Agentpad to collaborate!Please download the app from your app store:Apple App Store: https://apps.apple.com/us/app/agentpad/id6453560305Google Play Store: https://play.google.com/store/apps/details?id=com.agentpadapp.twaAfter downloading, please sign up and enter my ID. My ID is ${$currentUser.id}"
	const share = async () => {
		try {
			await navigator.share(shareData);
		} catch (error) {
			console.log(error);
		}
	};
</script>

<div class="mx-auto xl:w-1/2">
	<button class="btn btn-primary w-full mx-auto" on:click={share}>Invite</button>
</div>
