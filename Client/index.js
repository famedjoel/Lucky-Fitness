document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('click', function (e) {
        if (e.target.id === 'start-workout') {
            // Redirect to the empty page in the client folder
            window.location.href = 'your-workout-page.html';
        }
    });
});


