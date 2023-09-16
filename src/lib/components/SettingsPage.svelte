<script>
	import Signout from '$lib/components/Signout.svelte';
	import { pb, currentUser } from '$lib/pocketbase';
	import Invite from '$lib/components/Invite.svelte';
	import MyAgent from '$lib/components/MyAgent.svelte';
	import MyProfile from '$lib/components/MyProfile.svelte';
	import DeletionWizard from '$lib/components/DeletionWizard.svelte';
	import SupportButton from '$lib/components/SupportButton.svelte';
</script>

<div class="container">
	<br />

	<div class="prose text-center mx-auto">
		<h1>My Account</h1>
	</div>

	<br />
	<br />

	<MyProfile />

	{#if !$currentUser.isAgent}
		<br />
		<MyAgent />
	{/if}
	<br /><br /><br />
	<SupportButton />
	<br /><br /><br /><br />
	<Signout />
	<br /><br /><br />
	<DeletionWizard />
	<br /><br /><br />
</div>
