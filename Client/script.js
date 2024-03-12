
document.addEventListener('DOMContentLoaded', function () {
    const expandableBox = document.querySelector('#box1');

    expandableBox.addEventListener('click', function () {
        // Navigate to the content page
        window.location.href = 'box1_content/box1_content.html';
    });
});



document.addEventListener('DOMContentLoaded', function () {
    const expandableBox = document.querySelector('#box2');

    expandableBox.addEventListener('click', function () {

        window.location.href = 'box2_content/box2_content.html';
    });
});



document.addEventListener('DOMContentLoaded', function () {
    const expandableBox = document.querySelector('#box3');

    expandableBox.addEventListener('click', function () {

        window.location.href = 'box3_content/box3_content.html';
    });
});



document.addEventListener('DOMContentLoaded', function () {
    const expandableBox = document.querySelector('#box4');

    expandableBox.addEventListener('click', function () {

        window.location.href = 'box4_content/box4_content.html';
    });
});




// Get references to the buttons
const homeButton = document.querySelector('#homeButton');
const vaultButton = document.querySelector('#Selected-id');
const historyButton = document.querySelector('#historyButton');

// Add event listeners to the buttons
homeButton.addEventListener('click', function () {
    navigate('home');
});

vaultButton.addEventListener('click', function () {
    navigate('MyVault');
});

historyButton.addEventListener('click', function () {
    navigate('history');
});

// Function for button actions
function navigate(action) {
    switch (action) {
        case 'home':
            window.location.href = '../index.html'; // Change this to the actual home page
            break;
        case 'MyVault':
                window.location.href = 'addedExercises.html';
                break;
        case 'history':
            window.location.href = 'workoutHistory.html';
            break;
        default:
            break;
    }
}