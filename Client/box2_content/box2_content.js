// script.js

// Function to create a workout box
function createWorkoutBox(workoutData) {
    const workoutContainer = document.querySelector('#workout-container');
    const workoutBox = document.createElement('section');
    workoutBox.className = 'portrait-page';

    workoutBox.innerHTML = `
        <img src="${workoutData.image}" alt="GIF" style="width: 100%; height: auto; margin-bottom: 20px; border-radius: 10px;">
        <div class="text-content">
            <p style="line-height: 1;">
                <strong style="font-size: 20px;">${workoutData.title}</strong>
            </p>
            <p style="line-height: 1;">${workoutData.description}</p>
            <img src="../Asset/alarm-clock.svg" alt="Clock Icon" width="20" height="20" style="margin-right: 400px;">
            <p style="line-height: 1;">${workoutData.duration}</p>
            <img src="../Asset/strength.svg" alt="Strength Icon" width="20" height="20" style="margin-right: 400px;">
            <p style="line-height: 1;">${workoutData.category}</p>
            <img src="../Asset/dumbbell.svg" alt="Instrument Icon" width="20" height="20" style="margin-right: 400px;">
            <p style="line-height: 1;">${workoutData.equipment}</p>
            <button onclick="startWorkout('${workoutData.title}')">Start Workout</button>
            <button onclick="addExercise('${workoutData.title}')">Add</button>
        </div>
    `;

    workoutContainer.appendChild(workoutBox);
}

// Example workout data (you can replace this with your actual data)
const plankingData = {
    title: 'PLANKING',
    description: 'Planking is an isometric exercise that strengthens the core, shoulders, and back. It also improves posture and reduces the risk of lower back pain.',
    image: '../Asset/plank.gif',
    duration: '5 Min',
    category: 'Strength and Mobility',
    equipment: 'None',
};

const MountainClimberData = {
    title: 'MOUNTAIN CLIMBER',
    description: 'Mountain climbers are a great way to get your heart rate up and work your core. They are a great addition to any workout routine.',
    image: '../Asset/mountain-climbers.gif',
    duration: '5 Min',
    category: 'Strength and Mobility',
    equipment: 'None',
};

const BurpeesData = {
    title: 'BURPEES',
    description: 'Burpees are a full-body exercise that can be done anywhere. They are great for building strength and endurance.',
    image: '../Asset/burpees.gif',
    duration: '5 Min',
    category: 'Strength and Mobility',
    equipment: 'None',
};

const RussianTwistData = {
    title: 'RUSSIAN TWIST',
    description: 'Russian twists are a great exercise for building core strength and stability. They also help improve rotational power and mobility.',
    image: '../Asset/russian-twists.gif',
    duration: '5 Min',
    category: 'Strength and Mobility',
    equipment: 'None',
};


// Create workout boxes
createWorkoutBox(plankingData);
createWorkoutBox(MountainClimberData);
createWorkoutBox(BurpeesData);
createWorkoutBox(RussianTwistData);


// Function placeholders for button actions
window.startWorkout = function(title) {
    console.log(`Starting workout: ${title}`);
    // Add your logic for starting the workout
};

window.addExercise = function(title) {
    console.log(`Adding exercise to workout: ${title}`);
    // Add your logic for adding exercise
};






// Get references to the buttons
const homeButton = document.getElementById('homeButton');
const backButton = document.getElementById('backButton');
const forwardButton = document.getElementById('forwardButton');

// Add event listeners to the buttons
homeButton.addEventListener('click', function() {
    navigate('home');
});

backButton.addEventListener('click', function() {
    navigate('back');
});

forwardButton.addEventListener('click', function() {
    navigate('forward');
});

// Function for button actions
function navigate(action) {
    switch (action) {
        case 'home':
            // Add logic for navigating to the "index.html" page
            window.location.href = '../index.html';
            break;
        case 'back':
            // Add logic for navigating back to the previous page
            window.history.back();
            break;
        case 'forward':
            // Add logic for navigating forward (if needed)
            window.history.forward();
            break;
        default:
            break;
    }
}
