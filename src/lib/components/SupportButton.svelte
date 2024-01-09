<div class="w-full mx-auto lg:w-3/4 xl:w-1/2">
	<button
		class="btn btn-primary btn-outline w-full mx-auto"
		onclick="supportButtonModal.showModal()">Need help?</button
	>
</div>

<dialog id="supportButtonModal" class="modal modal-bottom sm:modal-middle">
	<div class="modal-box">
		<h3 class="font-bold text-lg">Need help?</h3>
		<p class="py-4">
			Email <a class="link link-primary link-hover" href="mailto:support@agentpadapp.com">
				support@agentpadapp.com
			</a>
		</p>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
