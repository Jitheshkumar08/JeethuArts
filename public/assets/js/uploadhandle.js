document.getElementById('uploadArt').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent default form submission

    // Create FormData object to hold form data (including file)
    const formData = new FormData(this);

    try {
        // Send the data to the server using Fetch API
        const response = await fetch('/admin/upload-art', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();

        if (response.ok) {
            // Success: Show the success message in the #message div
            // document.getElementById('message').innerHTML = `<div style="color: green;">${result.message}</div>`;
            alert(result.message);
            location.reload();
        } else {
            // Error: Show the error message in the #message div
            // document.getElementById('message').innerHTML = `<div style="color: red;">${result.error}</div>`;
            alert(result.message);
        }
    } catch (error) {
        // Network or other error
        // document.getElementById('message').innerHTML = `<div style="color: red;">Failed to upload artwork. Please try again.</div>`;
        alert(result.message);
    }
});