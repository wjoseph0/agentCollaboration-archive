<script>
	import { currentUser } from '$lib/pocketbase';

	const shareText = `Hi! Let's use Agentpad to collaborate!

Please download the app from your app store:

Apple App Store: https://apps.apple.com/us/app/agentpad/id6453560305

Google Play Store: https://play.google.com/store/apps/details?id=com.agentpadapp.twa

After downloading, please sign up and enter my license number.

My license number: ${$currentUser.licenseNumber}`;

	const data = {
		title: 'Agentpad',
		text: shareText
	};

	const share = async () => {
		await navigator.share(data);
	};
</script>

<button class="btn btn-primary w-full mx-auto lg:w-3/4 xl:w-2/4" on:click={share}>Invite</button>
