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
            // alert(result.message);
            popupSuccess("Success", result.message);
            setTimeout(() => {
                location.reload();
            }, 3000);
        } else {
            // Error: Show the error message in the #message div
            // document.getElementById('message').innerHTML = `<div style="color: red;">${result.error}</div>`;
            // alert(result.message);
            popupFail("Error", result.message);
        }
    } catch (error) {
        // Network or other error
        // document.getElementById('message').innerHTML = `<div style="color: red;">Failed to upload artwork. Please try again.</div>`;
        //alert(result.message);
        popupFail("Error", result.message);
    }


    async function uploadArtwork(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        try {
            const response = await fetch('/admin/upload-art', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {

                //alert('Artwork uploaded successfully!');
                popupSuccess("Success", "Artwork uploaded successfully!");

                setTimeout(() => {
                    event.target.reset();
                }, 2500);

            } else {

                //alert('Error: ' + data.error);
                popupFail("Error", "Error: " + data.error);

            }
        } catch (error) {
            console.error('Error uploading artwork:', error);
            // alert('An error occurred while uploading the artwork.');
            popupFail("Upload Failed", "An error occurred while uploading the artwork.");

        }
    }
});


document.addEventListener("DOMContentLoaded", () => {
    fetch("/api/artworks")
        .then(res => res.json())
        .then(artworks => {
            const container = document.getElementById("adminArtworks");

            artworks.forEach(art => {
                const card = document.createElement("div");
                card.className = "art-card";

                card.innerHTML = `
                    <img src="/uploads/${art.ImagePath.split('/').pop()}" alt="${art.Title}">
                    <div class="art-details">
                        <h3 class="title">${art.Title}</h3>
                        <p class="description">${art.Description}</p>
                        <div class="price-availablity">
                            <p class="availability">${art.IsAvailable ? 'Available' : 'Sold'}</p>
                            <p class="price">₹ ${art.Price}</p>
                        </div>
                    </div>
                    <button onclick="deleteArtwork(${art.ArtworkID})">Delete</button>
                `;

                container.appendChild(card);
            });
        });

    window.deleteArtwork = function (id) {
        fetch(`/api/artworks/${id}`, {
            method: "DELETE"
        })
            .then(res => {
                if (res.ok) {
                    //alert("Artwork deleted successfully.");
                    popupSuccess("Deleted", "Artwork deleted successfully!");
                    setTimeout(() => {
                        window.location.reload();
                    }, 2500);
                } else {
                    //alert("Failed to delete artwork.");
                    popupFail("Delete Failed", "Failed to delete artwork. Please try again.");

                }
            });
    };
});




