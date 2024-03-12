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

const prevButton = document.querySelector('#prevButton');
const nextButton = document.querySelector('#nextButton');

prevButton.addEventListener('click', function() {
    handlePaginationClick(-1);
});

nextButton.addEventListener('click', function() {
    handlePaginationClick(1);
});




// Define currentPage as a global variable
let currentPage = 1;

let selectedExercisesByPage = {};

document.addEventListener('DOMContentLoaded', function () {
    // Load default exercises when the page loads
    const defaultExercises = getDefaultExercises();
    displayExerciseOptions(defaultExercises);
});

async function showSelectedExercises() {
    // Get selected exercises from all pages
    const selectedExercises = Object.values(selectedExercisesByPage)
        .reduce((acc, pageExercises) => acc.concat(pageExercises), []);

    // Display instructions for selected exercises
    await displaySelectedExerciseInstructions(selectedExercises);
}

async function displayExerciseOptions(exercises) {
    // Fetch available exercises from JSON file
    const availableExercises = await fetchExerciseInstructions();

    // Clear previous exercise options
    const form = document.querySelector('#exerciseForm');
    form.innerHTML = '';

    // Pagination settings
    const exercisesPerPage = 5; // Adjust as needed

    // Generate checkboxes for the current page
    const startIndex = (currentPage - 1) * exercisesPerPage;
    const endIndex = startIndex + exercisesPerPage;
    const currentExercises = availableExercises.slice(startIndex, endIndex);

    // Create an array to store selected exercises for the current page
    selectedExercisesByPage[currentPage] = [];

    currentExercises.forEach(exercise => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.name = 'exercises';
        input.value = exercise.title;
        input.addEventListener('change', () => handleCheckboxChange(exercise.title));
        label.appendChild(input);
        label.appendChild(document.createTextNode(exercise.title));
        form.appendChild(label);
    });


    // Add a button to show instructions
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Show Instructions';
    button.addEventListener('click', showSelectedExercises);
    form.appendChild(button);

    // Enable or disable pagination buttons based on current page
    updatePaginationButtons(availableExercises.length, exercisesPerPage);

    // Check the checkboxes for selected exercises
    exercises.forEach(selectedExercise => {
        const checkbox = form.querySelector(`input[value="${selectedExercise}"]`);
        if (checkbox) {
            checkbox.checked = true;
            handleCheckboxChange(selectedExercise);
        }
    });
}

function handleCheckboxChange(exerciseTitle) {
    // Update the selected exercises for the current page
    const checkbox = document.querySelector(`input[value="${exerciseTitle}"]:checked`);
    if (checkbox) {
        selectedExercisesByPage[currentPage].push(exerciseTitle);
    } else {
        const index = selectedExercisesByPage[currentPage].indexOf(exerciseTitle);
        if (index !== -1) {
            selectedExercisesByPage[currentPage].splice(index, 1);
        }
    }
}


function updatePaginationButtons(totalExercises, exercisesPerPage) {
    const paginationContainer = document.querySelector('#paginationContainer');
    const totalPages = Math.ceil(totalExercises / exercisesPerPage);

    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = i;
        button.addEventListener('click', () => handlePaginationClick(i, totalExercises, exercisesPerPage));        paginationContainer.appendChild(button);

        // Add a separator if it's not the last button
        if (i < totalPages) {
            const separator = document.createTextNode(' | ');
            paginationContainer.appendChild(separator);
        }
    }

    const prevButton = document.createElement('button');
    prevButton.type = 'button';
    prevButton.textContent = 'Previous';
    prevButton.addEventListener('click', () => handlePaginationClick(currentPage - 1, totalExercises, exercisesPerPage));
    paginationContainer.insertBefore(prevButton, paginationContainer.firstChild);

    const nextButton = document.createElement('button');
    nextButton.type = 'button';
    nextButton.textContent = 'Next';
    nextButton.addEventListener('click', () => handlePaginationClick(currentPage + 1, totalExercises, exercisesPerPage));
    paginationContainer.appendChild(nextButton);

    // Enable or disable pagination buttons based on current page
    const allButtons = paginationContainer.querySelectorAll('button');
    allButtons.forEach(button => {
        button.disabled = (button.textContent == currentPage) || (button.textContent == 'Previous' && currentPage === 1) || (button.textContent == 'Next' && currentPage === totalPages);
    });
}

function handlePaginationClick(pageNumber, totalExercises, exercisesPerPage) {
    // Update the current page to the clicked page number
    if (pageNumber >= 1 && pageNumber <= Math.ceil(totalExercises / exercisesPerPage)) {
        currentPage = pageNumber;

        // Re-display exercise options
        displayExerciseOptions(getSelectedExercises());
    }
}



function getSelectedExercises() {
    const selectedExercises = [];
    const checkboxes = document.querySelectorAll('input[name="exercises"]:checked');
    checkboxes.forEach(checkbox => {
        selectedExercises.push(checkbox.value);
    });
    return selectedExercises;
}

async function displaySelectedExerciseInstructions(selectedExercises) {
    // Clear previous instructions
    const instructionsContainer = document.querySelector('.exercise-instructions');
    instructionsContainer.innerHTML = '';

    // Fetch exercise instructions from JSON file
    const exerciseInstructions = await fetchExerciseInstructions();

    // Display instructions for selected exercises
    selectedExercises.forEach(selectedExercise => {
        const exercise = exerciseInstructions.find(ex => ex.title === selectedExercise);
        if (exercise) {
            displayExerciseInstructions(exercise);
        }
    });
}

async function fetchExerciseInstructions() {
    try {
        const response = await fetch('exercise_instructions.json');
        const data = await response.json();
        return Object.values(data); // Return an array of exercise objects
    } catch (error) {
        console.error('Error fetching exercise instructions:', error);
        return [];
    }
}

function displayExerciseInstructions(exercise) {
    // Get the instructions container
    const instructionsContainer = document.querySelector('.exercise-instructions');

    // Create HTML elements for instructions using a for loop
    let instructionsHTML = `<p><strong>${exercise.title}</strong></p><ul>`;
    for (let i = 0; i < exercise.instructions.length; i++) {
        instructionsHTML += `<li>${exercise.instructions[i]}</li>`;
    }
    instructionsHTML += `</ul><hr>`; // Add a horizontal line to separate instructions for different exercises

    // Append the instructions HTML to the container
    instructionsContainer.innerHTML += instructionsHTML; // Use += to append instructions for each exercise
}

// Remove the hardcoded default exercises function
function getDefaultExercises() {
    return [];
}


