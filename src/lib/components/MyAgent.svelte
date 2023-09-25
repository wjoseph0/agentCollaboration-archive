<script>
	import { currentUser } from '$lib/pocketbase';
	import PreferredVendors from '$lib/components/PreferredVendors.svelte';
</script>

<div>
	<div class="card border shadow-2xl xl:w-2/4 mx-auto">
		<div class="card-body">
			<div class="badge badge-secondary badge-outline mx-auto mb-3">My Agent</div>
			<div class="flex flex-col justify-center items-center gap-3">
				{#if $currentUser.expand.agent.profilePic}
					<div class="avatar">
						<div class="w-20 md:w-24 rounded">
							<img
								src="https://wjoseph0.cloud/api/files/_pb_users_auth_/{$currentUser.agent}/{$currentUser
									.expand.agent.profilePic}"
								alt="agent_photo"
							/>
						</div>
					</div>
				{:else}
					<div class="avatar placeholder">
						<div class="rounded bg-neutral-focus text-neutral-content w-20 md:w-24 prose">
							<span class="text-3xl">
								{$currentUser.expand.agent.fname[0]}{$currentUser.expand.agent.lname[0]}
							</span>
						</div>
					</div>
				{/if}

				<div class="flex flex-col justify-center items-center">
					<h2 class="text-lg font-semibold">
						{$currentUser.expand.agent.fname}
						{$currentUser.expand.agent.lname}
					</h2>
					<div class="flex flex-col justify-center items-start gap-4 py-4">
						<div class="flex flex-row justify-center items-center gap-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-5 h-5"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
								/>
							</svg>
							{#if $currentUser.expand.agent.contact_email}
								<span class="text-sm">
									<a
										class="link link-primary link-hover"
										href="mailto:{$currentUser.expand.agent.contact_email}"
									>
										{$currentUser.expand.agent.contact_email}
									</a>
								</span>
							{:else}
								<span class="text-sm">
									<a
										class="link link-primary link-hover"
										href="mailto:{$currentUser.expand.agent.email}"
									>
										{$currentUser.expand.agent.email}
									</a>
								</span>
							{/if}
						</div>
						{#if $currentUser.expand.agent.contact_number}
							<div class="flex flex-row justify-center items-center gap-1">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-5 h-5"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
									/>
								</svg>
								<span class="text-sm"
									><a
										class="link link-primary link-hover"
										href="tel:{$currentUser.expand.agent.contact_number.replace(/\D/g, '')}"
										>{$currentUser.expand.agent.contact_number}</a
									></span
								>
							</div>
						{/if}
					</div>
				</div>
			</div>
			<div class="mx-auto">
				<PreferredVendors />
			</div>
			{#if $currentUser.expand.agent.teamLogo && $currentUser.expand.agent.brokerageLogo}
				<div class="flex justify-center items-center gap-2 mt-5">
					<img
						class="w-20 md:w-32"
						src="https://wjoseph0.cloud/api/files/_pb_users_auth_/{$currentUser.agent}/{$currentUser
							.expand.agent.teamLogo}"
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
						src="https://wjoseph0.cloud/api/files/_pb_users_auth_/{$currentUser.agent}/{$currentUser
							.expand.agent.brokerageLogo}"
						alt="Brokerage Logo"
					/>
				</div>
			{:else if $currentUser.expand.agent.brokerageLogo}
				<div class="flex justify-center items-center gap-2 mt-5">
					<img
						class="w-20 md:w-32"
						src="https://wjoseph0.cloud/api/files/_pb_users_auth_/{$currentUser.agent}/{$currentUser
							.expand.agent.brokerageLogo}"
						alt="Brokerage Logo"
					/>
				</div>
			{/if}
		</div>
	</div>
</div>
