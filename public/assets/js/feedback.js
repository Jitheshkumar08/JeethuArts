document.getElementById('feedbackForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('feedbackData').value;



    try {
        const response = await fetch('/submit-feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, feedbackMessage: message })
        });

        if (response.ok) {
            popupSuccess("Success", "Feedback submitted successfully.");
        } else {
            popupFail("Failed", "Failed to submit feedback");
        }
    } catch (err) {
        console.error('Error:', err);
        popupFail("Error", "Server error while submitting feedback.");
    }
});
