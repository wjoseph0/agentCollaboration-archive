<script>
	import { pb, currentUser } from '$lib/pocketbase';

	let contact_email_input;
	let contact_number_input;
	let loading = false;
	let success = false;

	const setContactInfo = async () => {
		const data = {
			contact_email: contact_email_input.value.toLowerCase(),
			contact_number: contact_number_input.value
		};

		try {
			loading = true;
			await pb.collection('users').update($currentUser.id, data);
			loading = false;
			contact_email_input.value = $currentUser.contact_email;
			success = true;
			setTimeout(() => {
				success = false;
			}, 1000);
		} catch (error) {
			console.error(error);
		}
	};
</script>

<div>
	<div class="card border shadow-2xl xl:w-2/4 mx-auto">
		<div class="card-body">
			<div class="flex flex-col justify-center items-center gap-4">
				{#if $currentUser.profilePic}
					<div class="avatar">
						<div class="w-24 md:w-32 rounded">
							<img
								src="https://wjoseph0.cloud/api/files/{$currentUser.collectionId}/{$currentUser.id}/{$currentUser.profilePic}"
								alt="profile_photo"
							/>
						</div>
					</div>
				{:else}
					<div class="avatar placeholder">
						<div class="rounded bg-neutral-focus text-neutral-content w-24 md:w-32 prose">
							<span class="text-3xl md:text-5xl">
								{$currentUser.fname[0]}{$currentUser.lname[0]}
							</span>
						</div>
					</div>
				{/if}

				<div class="flex flex-col justify-center items-center">
					<h2 class="card-title">
						{$currentUser.fname}
						{$currentUser.lname}
					</h2>
					<p>{$currentUser.email}</p>
				</div>
			</div>
			{#if $currentUser.isAgent && $currentUser.teamLogo && $currentUser.brokerageLogo}
				<div class="flex justify-center items-center gap-2 mt-5">
					<img
						class="w-20 md:w-32"
						src="https://wjoseph0.cloud/api/files/{$currentUser.collectionId}/{$currentUser.id}/{$currentUser.teamLogo}"
						alt="Team Logo"
					/>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="w-6 h-6"
					>
						<path
							fill-rule="evenodd"
							d="M19.902 4.098a3.75 3.75 0 00-5.304 0l-4.5 4.5a3.75 3.75 0 001.035 6.037.75.75 0 01-.646 1.353 5.25 5.25 0 01-1.449-8.45l4.5-4.5a5.25 5.25 0 117.424 7.424l-1.757 1.757a.75.75 0 11-1.06-1.06l1.757-1.757a3.75 3.75 0 000-5.304zm-7.389 4.267a.75.75 0 011-.353 5.25 5.25 0 011.449 8.45l-4.5 4.5a5.25 5.25 0 11-7.424-7.424l1.757-1.757a.75.75 0 111.06 1.06l-1.757 1.757a3.75 3.75 0 105.304 5.304l4.5-4.5a3.75 3.75 0 00-1.035-6.037.75.75 0 01-.354-1z"
							clip-rule="evenodd"
						/>
					</svg>
					<img
						class="w-20 md:w-32"
						src="https://wjoseph0.cloud/api/files/{$currentUser.collectionId}/{$currentUser.id}/{$currentUser.brokerageLogo}"
						alt="Brokerage Logo"
					/>
				</div>
			{:else if $currentUser.isAgent && $currentUser.brokerageLogo}
				<div class="flex justify-center items-center gap-2 mt-5">
					<img
						class="w-20 md:w-32"
						src="https://wjoseph0.cloud/api/files/{$currentUser.collectionId}/{$currentUser.id}/{$currentUser.brokerageLogo}"
						alt="Brokerage Logo"
					/>
				</div>
			{/if}
		</div>
	</div>

	<br /><br />
	{#if $currentUser.isAgent}
		<div class="card border shadow-2xl xl:w-2/4 mx-auto">
			<div class="card-body">
				{#if $currentUser.contact_email || $currentUser.contact_number}
					<div class="mx-auto">
						<h2 class="prose font-bold mx-auto">Contact Information</h2>
						<div class="flex flex-col justify-center items-start gap-4 py-4">
							<div class="flex flex-row justify-center items-center gap-1">
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
										d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
									/>
								</svg>
								<span>{$currentUser.contact_email}</span>
							</div>
							<div class="flex flex-row justify-center items-center gap-1">
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
										d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
									/>
								</svg>
								<span>{$currentUser.contact_number}</span>
							</div>
						</div>
						<div class="flex justify-center items-center">
							<button onclick="contactInfo.showModal()" class="btn btn-primary btn-xs">Edit</button>
						</div>
					</div>
				{:else}
					<button class="btn btn-primary btn-sm mx-auto" onclick="contactInfo.showModal()"
						>Add Contact Information</button
					>
				{/if}

				<dialog id="contactInfo" class="modal">
					<form method="dialog" class="modal-box">
						<h3 class="font-bold text-lg">Contact Information</h3>

						<div class="flex flex-row justify-start items-center gap-2 py-6">
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
									d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
								/>
							</svg>
							<input
								bind:this={contact_email_input}
								value={$currentUser.contact_email}
								type="text"
								placeholder="Email"
								class="input input-bordered w-full max-w-xs"
							/>
						</div>

						<div class="flex flex-row justify-start items-center gap-2">
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
									d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
								/>
							</svg>
							<input
								bind:this={contact_number_input}
								value={$currentUser.contact_number}
								type="text"
								placeholder="Phone Number"
								class="input input-bordered w-full max-w-xs"
							/>
						</div>

						<div class="modal-action">
							<!-- if there is a button, it will close the modal -->
							<!-- svelte-ignore a11y-click-events-have-key-events -->

							{#if success}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6 text-success"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							{:else if loading}
								<span class="loading loading-spinner loading-xs" />
							{:else}
								<span class="btn" on:click={setContactInfo}>Save </span>
							{/if}
						</div>
					</form>
					<form method="dialog" class="modal-backdrop">
						<button
							on:click={() => {
								contact_email_input.value = $currentUser.contact_email;
							}}>close</button
						>
					</form>
				</dialog>
			</div>
		</div>
	{/if}
</div>
