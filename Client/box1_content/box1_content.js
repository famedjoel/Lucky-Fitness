// Define an array to store added exercises
let addedExercises = [];

function createWorkoutBox(workoutData) {
    const workoutContainer = document.querySelector('#workout-container');
    const workoutBox = document.createElement('section');
    workoutBox.className = 'portrait-page';

    // Set the selected exercise in localStorage
    workoutBox.addEventListener('click', function () {
        localStorage.setItem('selectedExercise', JSON.stringify(workoutData));
        // window.location.href = 'timer.html';
    });

    workoutBox.innerHTML = `
        <img src="${workoutData.image}" alt="GIF" style="width: 100%; height: auto; margin-bottom: 20px; border-radius: 10px;">
        <section class="text-content">
            <p style="line-height: 1;">
                <strong style="font-size: 20px;">${workoutData.title}</strong>
            </p>
            <p style="line-height: 1;">${workoutData.description}</p>
            <img src="../Asset/alarm-clock.svg" alt="Clock Icon" width="20" height="20" style="margin-right: 400px;">
            <label for="duration">Select Duration (seconds):</label>
            <input type="number" id="duration-${workoutData.title}" name="duration" min="1" max="59" placeholder="Enter duration" required>
            <img src="../Asset/strength.svg" alt="Strength Icon" width="20" height="20" style="margin-right: 400px;">
            <p style="line-height: 1;">${workoutData.category}</p>
            <img src="../Asset/dumbbell.svg" alt="Instrument Icon" width="20" height="20" style="margin-right: 400px;">
            <p style="line-height: 1;">${workoutData.equipment}</p>
            <button onclick="startWorkout('${workoutData.title}')">Start Workout</button>
            <button onclick="addExercise('${workoutData.title}')">Add</button>
        </section>
    `;

    workoutContainer.appendChild(workoutBox);
}

const squatsData = {
    title: 'SQUAT',
    description: 'Squats are dynamic, explosive movements involving lowering the body into a deep bend at the knees and hips, followed by a rapid return to the standing position, effectively incorporating cardiovascular and strength elements for an intense and efficient exercise.',
    image: '../Asset/giphy.gif',
    category: 'Strength and Mobility',
    equipment: 'None',
};

const jumpingSquatsData = {
    title: 'JUMPING SQUATS',
    description: 'Jumping squats add an explosive element to traditional squats by incorporating a jump at the top of the movement. This engages additional muscles and enhances the cardiovascular benefits of the exercise.',
    image: '../Asset/jumping-squats.gif',
    category: 'Strength and Mobility',
    equipment: 'None',
};

const highKneesData = {
    title: 'HIGH KNEES',
    description: 'High knees are a high-intensity exercise that increases your heart rate and burns calories. It also improves your speed, flexibility, and strengthens your hip flexors, abdominal muscles, and leg muscles.',
    image: '../Asset/high-knees.gif',
    category: 'Cardio',
    equipment: 'None',
};

const gluteBridgeData = {
    title: 'GLUTE BRIDGE',
    description: 'The glute bridge is a simple and effective exercise to strengthen the glutes, hamstrings, and lower back. It also helps to improve hip mobility and core stability.',
    image: '../Asset/glute bridge.gif',
    category: 'Strength and Mobility',
    equipment: 'None',
};

const crossoverLungeData = {
    title: 'CROSSOVER LUNGE',
    description: 'Crossover lunges are a great exercise for targeting the inner and outer thighs, as well as the glutes. They also help to improve balance and stability.',
    image: '../Asset/crossover-lunge.gif',
    category: 'Strength and Mobility',
    equipment: 'None',
};



// Array of exercise data
const exercisesData = [
    squatsData,
    jumpingSquatsData,
    highKneesData,
    gluteBridgeData,
    crossoverLungeData,
];

// Create workout boxes using a loop
exercisesData.forEach(exerciseData => {
    createWorkoutBox(exerciseData);
});

// Function placeholders for button actions
window.startWorkout = function (title) {
    console.log(`Starting workout: ${title}`);

   localStorage.setItem('selectedExercise', title);
    // Add your logic for starting the workout

    
    // Navigate to the timer.html page in the same tab
    window.location.href = '../timer.html';
    /// Retrieve exercise details from localStorage based on the clicked workout title
    const exerciseDetails = JSON.parse(localStorage.getItem(title));

    // Check if exerciseDetails and duration are available
    if (exerciseDetails && exerciseDetails.title && exerciseDetails.duration) {
        console.log(`Exercise Details: ${exerciseDetails.title}, Duration: ${exerciseDetails.duration}`);
    } else {
        console.log("Exercise details not available.");
    }
    startWorkout(title);
};




// Function to add exercise to the list
window.addExercise = function (title) {
    console.log(`Adding exercise to workout: ${title}`);

    // Find the exercise data based on the title
    const exerciseData = exercisesData.find(exercise => exercise.title === title);

    // Get the user-selected duration
    const durationInput = document.getElementById(`duration-${title}`);
    const selectedDuration = durationInput.value;

    // Update exerciseData to include the selected duration
    exerciseData.duration = `${selectedDuration} Seconds`;

    // Store exercise details (title and description) in localStorage
    localStorage.setItem('currentExercise', JSON.stringify({ title, description: exerciseData.description }));

    // Add the exercise to the array
    addedExercises.push({ title, description: exerciseData.description, duration: exerciseData.duration, category: exerciseData.category, equipment: exerciseData.equipment });

    // Store the updated added exercises array in localStorage
    localStorage.setItem('addedExercises', JSON.stringify(addedExercises));

    // Display the added exercises
    displayAddedExercises();

    // You can add further logic here, such as updating UI or triggering other actions
};


// Function to display added exercises
function displayAddedExercises() {
    // Retrieve the added exercises from localStorage
    const addedExercises = JSON.parse(localStorage.getItem('addedExercises')) || [];

    // Check if there are added exercises
    if (addedExercises.length > 0) {
        // Return the added exercises
        return addedExercises;
    } else {
        // If no exercises are added, return an empty array
        return [];
    }
}


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
                window.location.href = '../addedExercises.html';
                break;
        case 'history':
            window.location.href = '../workoutHistory.html';
            break;
        default:
            break;
    }
}


document.querySelector("#Selected-id").addEventListener("click", function() {
    viewAddedExercises();
});

document.addEventListener('DOMContentLoaded', function () {
    // Retrieve exercise details from localStorage
    const currentExerciseTitle = localStorage.getItem('currentExerciseTitle');

    // Display exercise details on the page
    const exerciseDetailsContainer = document.querySelector('#exercise-details');
    exerciseDetailsContainer.textContent = `Current Exercise: ${currentExerciseTitle}`;
});

// Function to navigate to the addedExercises.html page
function viewAddedExercises() {
    // Store the content of portrait-container in localStorage
    const portraitContainerContent = document.querySelector('.portrait-container').innerHTML;
    localStorage.setItem('portraitContainerContent', portraitContainerContent);

}
