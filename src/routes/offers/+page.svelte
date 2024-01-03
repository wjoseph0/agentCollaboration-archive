<script>
    import { PDFDocument } from 'pdf-lib'
  
    let date;
    let viewer;
    let loading = false;


    async function fillForm() {
        loading = true;

        const formUrl = 'http://localhost:5173/WB-11-1.pdf'
        const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())

        const pdfDoc = await PDFDocument.load(formPdfBytes)

        const form = pdfDoc.getForm()

        const nameField = form.getTextField('draftedDate')

        nameField.setText(date)

        const pdfBytes = await pdfDoc.save()

        const blob = new Blob([pdfBytes], {type: "application/pdf"})

        // const link = document.createElement("a");
        // link.href = window.URL.createObjectURL(blob);

        
        
        // link.download = "test.pdf";
        
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
        const blobUrl = URL.createObjectURL(blob);

        window.open(blobUrl)
        URL.revokeObjectURL(blobUrl);

        loading = false;
}
</script>

<div class="container mt-5">
    <h1 class="text-xl font-bold text-center">Generate Offer to Purchase</h1>
    <br><br>
    <h1 class="text-center">Drafted Date: 
        <input class="input input-bordered" type="text" bind:value={date}>
        <button class="btn btn-primary" on:click={fillForm}>Create</button>
    </h1>
    <br>
    {#if loading}
    <span class="loading loading-spinner loading-lg"></span>
    {/if}
    <br>
    <iframe bind:this={viewer}></iframe>
</div>