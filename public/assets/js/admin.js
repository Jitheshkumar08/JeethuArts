// FILE: /assets/js/admin.js

document.addEventListener('DOMContentLoaded', () => {
    loadArtworks();
});

async function loadArtworks() {
    try {
        const res = await fetch('/admin/artworks');
        const artworks = await res.json();

        const container = document.getElementById('admin-artwork-container');
        if (!container) {
            console.error("Element with ID 'admin-artwork-container' not found.");
            return;
        }

        if (!Array.isArray(artworks) || artworks.length === 0) {
            container.innerHTML = "<p>No artworks uploaded yet.</p>";
            return;
        }

        container.innerHTML = artworks.map(art => `
            <div class="art-card">
                <img src="${art.ImagePath}" alt="${art.Title}">
                <h3>${art.Title}</h3>
                <p>${art.Description}</p>
                <p><strong>Type:</strong> ${art.ArtType || 'N/A'}</p>
                <p><strong>Price:</strong> ₹${art.Price}</p>
                <p><strong>Dimension:</strong> ${art.Dimensions || 'N/A'}</p>
                <button onclick="deleteArtwork(${art.ArtworkID})">Delete</button>
            </div>
        `).join('');
    } catch (error) {
        console.error("Error loading artworks:", error);
    }
}

async function deleteArtwork(artworkId) {
    try {
        const confirmed = confirm("Are you sure you want to delete this artwork?");
        if (!confirmed) return;

        const res = await fetch(`/admin/delete-artwork/${artworkId}`, {
            method: 'DELETE',
        });

        if (res.ok) {
            alert('Artwork deleted successfully');
            loadArtworks(); // Refresh the artwork grid
        } else {
            const errorText = await res.text();
            console.error("Delete failed:", errorText);
            alert('Failed to delete artwork');
        }
    } catch (err) {
        console.error("Delete error:", err);
    }
}
