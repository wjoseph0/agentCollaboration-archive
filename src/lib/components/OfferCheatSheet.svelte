<script>
	import { pb } from '$lib/pocketbase';

	let modalVisible = false;

	function toggleModal() {
		if (modalVisible === true) {
			modalVisible = false;
			return;
		}
		modalVisible = true;
	}
</script>

{#if modalVisible}
	<dialog open>
		<article>
			<!-- svelte-ignore a11y-missing-content -->
			<a
				href="#top"
				aria-label="Close"
				class="close"
				data-target="modal-example"
				on:click={toggleModal}
			/>
			<h1>Offer to Purchase</h1>
			<form>
				<label>
					Buyer's name, including middle initial (when applicable)
					<input type="text" />
				</label>

				<label>
					Purchase price
					<input type="text" />
				</label>

				<label>
					Earnest money
					<input type="text" />
				</label>

				<label>
					Inclusions
					<input type="text" />
				</label>

				<label>
					Exclusions
					<input type="text" />
				</label>

				<label>
					Binding Acceptance
					<input type="date" />
				</label>

				<label>
					Closing date
					<input type="date" />
				</label>

				<label>
					Financing Contingency
					<input type="checkbox" />
				</label>

				<label>
					Appraisal Contingency
					<input type="checkbox" />
				</label>

				<label>
					Inspection Contingency
					<input type="checkbox" />
					<label>Right to Cure <input type="checkbox" /></label>
					<label>Radon Test <input type="checkbox" /></label>
				</label>

				<label>
					Seller Closing Cost Credit
					<input type="text" />
				</label>

				<label>
					Home Warranty?
					<input type="checkbox" />
				</label>

				<details>
					<summary>Condo?</summary>
					<label>
						Fee per month
						<input type="text" />
					</label>

					<label>
						Parking
						<input type="text" />
					</label>

					<label>
						Storage unit
						<input type="text" />
					</label>
				</details>
			</form>
			<footer>
				<a href="#top" role="button" class="secondary" on:click={toggleModal}>
					Cancel
				</a>
				<a href="#top" role="button" type="submit">Submit</a>
			</footer>
		</article>
	</dialog>
{:else}
	<a href="#top" on:click={toggleModal}>Fill out cheat sheet</a>
{/if}
