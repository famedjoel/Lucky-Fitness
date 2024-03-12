document.addEventListener('DOMContentLoaded', function () {
    // Retrieve added exercises from localStorage and display them
    viewAddedExercises();
});

function viewAddedExercises() {
    // Retrieve the added exercises from localStorage
    const addedExercises = JSON.parse(localStorage.getItem('addedExercises')) || [];

    // Check if there are added exercises
    if (addedExercises.length > 0) {
        // Clear the workout container before displaying added exercises
        const workoutContainer = document.querySelector('#workout-container');
        workoutContainer.innerHTML = '';

        // Display each added exercise in a workout box
        addedExercises.forEach(exercise => {
            createWorkoutBox(exercise);
        });
    } else {
        // If no exercises are added, show a message or perform other actions
        console.log('No exercises added yet.');
    }
}

// Function to create a workout box
function createWorkoutBox(workoutData) {
    const workoutContainer = document.querySelector('#workout-container');
    const workoutBox = document.createElement('section');
    workoutBox.className = 'added-portrait-page';

    workoutBox.innerHTML = `
        <section class="added-text-content">
            <p style="line-height: 1;">
                <strong style="font-size: 20px;">${workoutData.title}</strong>
            </p>
            <p style="line-height: 1;">${workoutData.description}</p>
            <img src="../Asset/alarm-clock.svg" alt="Clock Icon" width="20" height="20" style="margin-right: 10px;">
            <p style="line-height: 1;">${workoutData.duration}</p>
            <img src="../Asset/strength.svg" alt="Strength Icon" width="20" height="20" style="margin-right: 10px;">
            <p style="line-height: 1;">${workoutData.category}</p>
            <img src="../Asset/dumbbell.svg" alt="Instrument Icon" width="20" height="20" style="margin-right: 10px;">
            <p style="line-height: 1;">${workoutData.equipment}</p>
 
        </section>
    `;

    workoutBox.addEventListener('click', function () {
        // Store the selected exercise in localStorage
        localStorage.setItem('selectedExercise', JSON.stringify(workoutData));

        // Redirect to the main-timer.html page
        window.location.href = 'main-timer.html';
    });

    workoutContainer.appendChild(workoutBox);
}



// Get references to the buttons
const homeButton = document.querySelector('#homeButton');
const historyButton = document.querySelector('#historyButton');


// Add event listeners to the buttons
homeButton.addEventListener('click', function() {
    navigate('home');
});

historyButton.addEventListener('click', function() {
    navigate('history');
});



// Function for button actions
function navigate(action) {
    switch (action) {
        case 'home':
            // Add logic for navigating to the home page
            console.log('Navigating to Home');
            window.location.href = 'index.html'; // Change this to the actual home page
            break;
            case 'history':
                window.location.href = 'workoutHistory.html';
                break;
        default:
            break;
    }
}




// Function to start the workout
function startWorkout() {
    // Add your logic for starting the workout
    console.log('Starting workout...');
    // Redirect or perform other actions as needed
    // For example, you can redirect to a timer page
    window.location.href = 'main-timer.html';
}



// Function to handle creating input for exercise name
function handleCreateWorkout() {
    // Create input field
    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.placeholder = 'Enter workout name';
    
    // Create a button to confirm and store the workout name
    const confirmButton = document.createElement('button');
    confirmButton.textContent = 'Confirm';
    confirmButton.addEventListener('click', function() {
        const workoutName = inputElement.value;
        
        // Retrieve existing workout history from localStorage
        const workoutHistory = JSON.parse(localStorage.getItem('workoutHistory')) || [];
        
        // Add the new workout name to the history
        workoutHistory.push(workoutName);

        // Store the updated workout history in localStorage
        localStorage.setItem('workoutHistory', JSON.stringify(workoutHistory));

        // Clear input and remove elements
        inputElement.value = '';
        inputElement.remove();
        confirmButton.remove();
    });

    // Append input and button to the container
    const inputContainer = document.querySelector('#exerciseNameInputContainer');
    inputContainer.innerHTML = ''; // Clear previous content
    inputContainer.appendChild(inputElement);
    inputContainer.appendChild(confirmButton);
}

    // Use const to declare the spanElement variable
    const spanElement = document.querySelector('#createWorkout');

    // Add a click event listener to the span
    spanElement.addEventListener('click', handleCreateWorkout);


    document.querySelector("#startWorkoutButton").addEventListener("click", function() {
        startWorkout();
});