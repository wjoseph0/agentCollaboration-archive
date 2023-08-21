<script>
	import { currentUser } from '$lib/pocketbase';
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
						<div class="rounded bg-neutral-focus text-neutral-content w-24 md:w-32 prose">
							<span class="text-3xl md:text-5xl">
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
					<p class="text-sm">{$currentUser.expand.agent.email}</p>
				</div>
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
