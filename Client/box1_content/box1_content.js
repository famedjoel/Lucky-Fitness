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
const squatsData = {
    title: 'SQUAT',
    description: 'Squats are dynamic, explosive movements involving lowering the body into a deep bend at the knees and hips, followed by a rapid return to the standing position, effectively incorporating cardiovascular and strength elements for an intense and efficient exercise.',
    image: '../Asset/giphy.gif',
    duration: '5 Min',
    category: 'Strength and Mobility',
    equipment: 'None',
};

const jumpingSquatsData = {
    title: 'JUMPING SQUATS',
    description: 'Jumping squats add an explosive element to traditional squats by incorporating a jump at the top of the movement. This engages additional muscles and enhances the cardiovascular benefits of the exercise.',
    image: '../Asset/jumping-squats.gif',
    duration: '5 Min',
    category: 'Strength and Mobility',
    equipment: 'None',
};

const highKneesData = {
    title: 'HIGH KNEES',
    description: 'High knees are a high-intensity exercise that increases your heart rate and burns calories. It also improves your speed, flexibility, and strengthens your hip flexors, abdominal muscles, and leg muscles.',
    image: '../Asset/high-knees.gif',
    duration: '5 Min',
    category: 'Cardio',
    equipment: 'None',
};

const gluteBridgeData = {
    title: 'GLUTE BRIDGE',
    description: 'The glute bridge is a simple and effective exercise to strengthen the glutes, hamstrings, and lower back. It also helps to improve hip mobility and core stability.',
    image: '../Asset/glute bridge.gif',
    duration: '5 Min',
    category: 'Strength and Mobility',
    equipment: 'None',
};

const crossoverLungeData = {
    title: 'CROSSOVER LUNGE',
    description: 'Crossover lunges are a great exercise for targeting the inner and outer thighs, as well as the glutes. They also help to improve balance and stability.',
    image: '../Asset/crossover-lunge.gif',
    duration: '5 Min',
    category: 'Strength and Mobility',
    equipment: 'None',
};

// Create workout boxes
createWorkoutBox(squatsData);
createWorkoutBox(jumpingSquatsData);
createWorkoutBox(highKneesData);
createWorkoutBox(gluteBridgeData);
createWorkoutBox(crossoverLungeData);

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
