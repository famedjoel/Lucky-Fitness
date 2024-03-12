const display = document.querySelector('#display');
const inputTime = document.querySelector('#inputTime');
let timer = null
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;


// Your existing JavaScript code

function parseInput(input) {
    // Use regular expression to match different time formats
    const regex = /^(\d{1,2}):?(\d{1,2})?:?(\d{1,2})?$/;
    const match = input.match(regex);

    if (match) {
        const [, hours = '0', minutes = '0', seconds = '0'] = match;
        return {
            hours: parseInt(hours, 10),
            minutes: parseInt(minutes, 10),
            seconds: parseInt(seconds, 10),
        };
    }

    return null;
}

function start() {
    if (!isRunning) {
        const userInput = parseInput(inputTime.value);

        if (userInput) {
            startTime = Date.now() + userInput.hours * 3600000 + userInput.minutes * 60000 + userInput.seconds * 1000;
            update();
            timer = setInterval(update, 10);
            isRunning = true;
        } else {
            // Handle invalid input
            alert('Invalid time format. Please use HH:MM:SS');
        }
    }
}

// Your existing JavaScript code

function stop() {
    if(isRunning) {
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
    }
}

function reset() {
    clearInterval(timer);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    display.textContent = '00:00:00.00';
}

function update() {
    const remainingTime = Math.max(0, startTime - Date.now()); // Ensure remaining time is not negative

    let hours = Math.floor(remainingTime / (1000 * 60 * 60));
    let minutes = Math.floor(remainingTime / (1000 * 60) % 60);
    let seconds = Math.floor(remainingTime / 1000 % 60);
    let milliseconds = Math.floor(remainingTime % 1000 / 10);

    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');
    milliseconds = String(milliseconds).padStart(2, '0');

    display.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;

    if (remainingTime === 0) {
        clearInterval(timer);
        isRunning = false;
        // Optionally, you can perform any actions when the timer reaches zero here
    }
}


const startBtn = document.querySelector('#startBtn');
const stopBtn = document.querySelector('#stopBtn');
const resetBtn = document.querySelector('#resetBtn');

startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);
resetBtn.addEventListener('click', reset);


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
            window.location.href = 'index.html'; // Change this to the actual home page
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

document.addEventListener('DOMContentLoaded', function () {
    // Retrieve the selected exercise from localStorage
    const selectedExercise = JSON.parse(localStorage.getItem('selectedExercise'));

    // Log the selected exercise
    console.log('Selected Exercise:', selectedExercise);

    // Check if selectedExercise is available
    if (selectedExercise && selectedExercise.title) {
        // Display exercise details in the console (you can remove this line)
        console.log(`Exercise Details: ${selectedExercise.title}`);

        // Load exercise instructions from JSON file
        loadExerciseInstructions(selectedExercise.title);
    } else {
        console.log("Exercise details not available.");
    }
});



// ... (rest of the code remains the same)


// Function to load exercise instructions from JSON file
function loadExerciseInstructions(title) {
    // Fetch the exercise instructions JSON file
    fetch('exercise_instructions.json')
        .then(response => response.json())
        .then(instructions => {
            // Check if instructions are available for the selected exercise
            if (instructions && instructions[title]) {
                // Display exercise instructions in the instructions container
                displayExerciseInstructions(instructions[title]);
            } else {
                console.log(`Instructions not available for ${title}.`);
            }
        })
        .catch(error => {
            console.error('Error loading exercise instructions:', error);
        });
}


// Function to display exercise instructions
function displayExerciseInstructions(exercise) {
    console.log('DOM content loaded');
    // Get the instructions container
    const instructionsContainer = document.querySelector('#exercise-instructions');

    // Create HTML elements for instructions
    const instructionsHTML = `
        <p><strong>${exercise.title}</strong></p>
        <ul>
            ${exercise.instructions.map(instruction => `<li>${instruction}</li>`).join('')}
        </ul>
    `;

    // Set the instructions HTML in the container
    instructionsContainer.innerHTML = instructionsHTML;
}


