
    function submitFeedback() {
        const feedback = document.querySelector('#feedback').value;
        const responseMessage = document.querySelector('#responseMessage');

        // Simple validation
        if (feedback === '') {
            responseMessage.innerHTML = 'Please provide your feedback.';
            return;
        }

        // You can add additional validation or send the feedback data to a server here

        // Display success message
        responseMessage.innerHTML = 'Thank you for your feedback!';
    }
