<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import { onMount } from 'svelte';

	export let journey;

	let buyerConsultation;
	let appointment;
	let buyerConsultationForm;

	$: data = {
		journey: journey.id,
		appointment: `${appointment?.substring(0, 10)} ${appointment?.substring(11, 16)}:00.000Z`
	};

	onMount(async () => {
		buyerConsultation = await pb
			.collection('buyer_consultations')
			.getFirstListItem(`journey='${journey.id}'`);

		if (buyerConsultation.appointment) {
			appointment = `${buyerConsultation.appointment.substring(
				0,
				10
			)}T${buyerConsultation.appointment.substring(11, 16)}`;
		}
	});

	async function setBuyerConsultation() {
		if (buyerConsultation) {
			buyerConsultation = await pb
				.collection('buyer_consultations')
				.update(buyerConsultation.id, data);
			buyerConsultationForm.close();
			return;
		}
		buyerConsultation = await pb.collection('buyer_consultations').create(data);
		buyerConsultationForm.close();
	}
</script>

<span class="btn btn-block" onclick="buyerConsultation{journey.id}.showModal()">
	Buyer Consultation
</span>

<dialog
	bind:this={buyerConsultationForm}
	id="buyerConsultation{journey.id}"
	class="modal modal-bottom sm:modal-middle"
>
	<form method="dialog" class="modal-box space-y-3 overflow-y-auto prose">
		<span
			class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
			onclick="buyerConsultation{journey.id}.close()">✕</span
		>
		<h3>Buyer Consultation Appointment</h3>

		<div class="form-control w-full max-w-xs">
			<label class="label" for="buyer_consultation">
				<span class="label-text">Please choose a date and time.</span>
			</label>

			<input
				bind:value={appointment}
				type="datetime-local"
				name="buyer_consultation"
				class="input input-bordered"
			/>
		</div>

		<div class="modal-action">
			<!-- if there is a button in form, it will close the modal -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->

			<span
				class="btn btn-primary"
				on:click={() => {
					setBuyerConsultation();
				}}
			>
				Save
			</span>
		</div>
	</form>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
