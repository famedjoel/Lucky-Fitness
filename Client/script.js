/* eslint-disable no-undef */
// Import timer-related functions from timer.js
import { startTimer, updateTimer, updateTimerDisplay } from './timer.js';
import { addToHistory, displayHistory } from './history.js';
import { handleProfileClick } from './profile.js';
import { updateProfile } from './profileUpdate.js';

let instructionsData; // Define instructionsData in the outer scope

// Function to fetch exercise data from JSON file
async function fetchExercises() {
  try {
    const response = await fetch('exercises.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching exercises:', error);
    return [];
  }
}

// Function to fetch instructions from JSON file
async function fetchInstructions() {
  try {
    const response = await fetch('instructions.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching instructions:', error);
    return [];
  }
}


function createWorkoutPortrait(workoutData) {
  const portraitContainer = document.querySelector('#content1'); // Updated selector to match your HTML
  const portraitTemplate = document.querySelector('#temp-portrait'); // Get the portrait template
  const portrait = portraitTemplate.content.cloneNode(true).firstElementChild; // Create a section for portrait
  const img = portrait.querySelector('img');
  img.src = workoutData.image;
  const title = portrait.querySelector('.workout-title');
  title.textContent = workoutData.title;
  const description = portrait.querySelector('.workout-description');
  description.textContent = workoutData.description;
  const category = portrait.querySelector('.workout-category');
  category.textContent = workoutData.category;
  const equipment = portrait.querySelector('.workout-equipment');
  equipment.textContent = workoutData.equipment;
  const durationInput = portrait.querySelector('.workout-duration');
  durationInput.addEventListener('change', function () {
    const minutes = parseInt(durationInput.value); // Get user-entered duration in minutes
    localStorage.setItem('timerDuration', minutes); // Store duration in local storage
    updateTimerDisplay(minutes); // Update the timer display with the added duration
  });


  // Attach exercise ID to the portrait element
  portrait.dataset.exerciseId = workoutData['ex-id'];

  const addExerciseButton = portrait.querySelector('.workout-add');
  addExerciseButton.addEventListener('click', function () {
    const duration = durationInput.value.trim();
    if (duration === '') {
    // If duration is not provided, display a message prompting the user to enter a duration
      const message = document.createElement('section');
      message.textContent = `Please enter a duration for ${workoutData.title}`;
      message.classList.add('message');
      addExerciseButton.parentNode.appendChild(message);
      // Set timeout to remove the message after 3 seconds
      setTimeout(() => {
        message.remove();
      }, 3000);
    } else {
      // If duration is provided, pass the portrait to the "Create Hiit" section and display the message
      const clonedPortrait = portrait.cloneNode(true);
      const createHiitSection = document.querySelector('#content2');
      const inputField = clonedPortrait.querySelector('.workout-duration');
      inputField.disabled = true;
      const addBtn = clonedPortrait.querySelector('.workout-add');
      addBtn.parentNode.removeChild(addBtn);
      const title = workoutData.title;
      const message = document.createElement('section');
      message.textContent = `${title} has been added to the Create Hiit section`;
      message.classList.add('message');
      addExerciseButton.parentNode.appendChild(message);
      createHiitSection.appendChild(clonedPortrait);
      // Set timeout to remove the message after 3 seconds
      setTimeout(() => {
        message.remove();
      }, 3000);

      const exerciseId = portrait.dataset.exerciseId; // Retrieve exercise ID from the portrait
      const selectedExercise = instructionsData.find(exercise => exercise['ex-id'] === parseInt(exerciseId)); // Parse exerciseId to integer

      // Ensure selectedExercise is defined and has necessary properties
      if (selectedExercise && selectedExercise.title) {
        // Call a function to display instructions for the selected exercise
        displayExerciseInstructions(selectedExercise);
      } else {
        console.error('Error: Selected exercise data is invalid.');
      }
    }
    updateTimerDisplay();
    // hideInstructions(); // Hide instructions after adding an exercise
  });


  portraitContainer.appendChild(portrait); // Append portrait to container
}

// function to hide instructions
// function hideInstructions() {
//   const instructionsContainer = document.querySelector('#exercise-instructions');
//   const instructionElements = instructionsContainer.querySelectorAll('ul');
//   instructionElements.forEach(instruction => {
//     instruction.style.display = 'none';
//   },
//   );
//   const instructionTitles = instructionsContainer.querySelectorAll('h3');
//   instructionTitles.forEach(title => {
//     title.style.display = 'none';
//   });
// }

function displayExerciseInstructions(exerciseData) {
  // Select the instructions container
  const instructionsContainer = document.querySelector('#exercise-instructions');

  // Create elements to display exercise instructions
  const exerciseTitle = document.createElement('h3');
  exerciseTitle.textContent = exerciseData.title;
  instructionsContainer.appendChild(exerciseTitle);

  // Split the instructions by newline character and create a list
  const instructionsList = document.createElement('ul');
  const instructions = exerciseData.instructions.split('\n');
  instructions.forEach(instruction => {
    const listItem = document.createElement('li');
    listItem.textContent = instruction;
    instructionsList.appendChild(listItem);
  });

  instructionsContainer.appendChild(instructionsList);
}


async function displayExercises() {
  try {
    const exercisesData = await fetchExercises();
    instructionsData = await fetchInstructions(); // Assign instructionsData fetched from JSON
    console.log('Instructions Data:', instructionsData); // Log instructionsData
    exercisesData.forEach(exerciseData => {
      createWorkoutPortrait(exerciseData); // Pass instructionsData to createWorkoutPortrait
    });
  } catch (error) {
    console.error('Error displaying exercises:', error);
  }
}

// Call displayExercises to fetch and display the exercises
displayExercises()
  .catch(error => console.error('Error displaying exercises:', error));


// Function to search exercises by title
function searchExercises() {
  const searchInput = document.querySelector('#searchInput').value.toLowerCase();
  const portraitContainer = document.querySelectorAll('.workout-portrait');

  portraitContainer.forEach(portrait => {
    const title = portrait.querySelector('.workout-title').textContent.toLowerCase();
    if (title.includes(searchInput) || searchInput === '') {
      portrait.style.display = 'block';
    } else {
      portrait.style.display = 'none';
    }
  });
}

// Add event listener to search input
document.querySelector('#searchInput').addEventListener('input', searchExercises);


// Timer JS

// Select elements
// eslint-disable-next-line no-unused-vars
const startButton = document.querySelector('#start-workout-btn');
const stopButton = document.querySelector('#stop-workout-btn');
const resetButton = document.querySelector('#reset-workout-btn');
const difficultySelect = document.querySelector('#difficulty-select');

startButton.addEventListener('click', () => {
  const selectedDifficulty = difficultySelect.value; // Get the selected difficulty level
  startTimer(selectedDifficulty); // Start the timer with the selected difficulty level
  // displayExerciseInstructions(); // Display exercise instructions when the timer starts
});


// Event listener for stop button
stopButton.addEventListener('click', () => {
  clearInterval(countdownInterval);
});

// Event listener for reset button
resetButton.addEventListener('click', () => {
  clearInterval(countdownInterval);
  updateTimer(); // Reset the timer display immediately
});

// /* eslint-disable no-undef */
// // Import timer-related functions from timer.js
// import { startTimer, updateTimer, updateTimerDisplay } from './timer.js';
// import { updateUI } from './login.js';
// import { addToHistory, displayHistory } from './history.js';

// let exercisesData; // Define exercisesData in the outer scope

// // Function to fetch exercise data from JSON file
// async function fetchExercises() {
//   try {
//     const response = await fetch('exercises.json');
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching exercises:', error);
//     return [];
//   }
// }

// function createWorkoutPortrait(workoutData) {
//   const portraitContainer = document.querySelector('#content1'); // Updated selector to match your HTML
//   const portraitTemplate = document.querySelector('#temp-portrait'); // Get the portrait template
//   const portrait = portraitTemplate.content.cloneNode(true).firstElementChild; // Create a section for portrait
//   const img = portrait.querySelector('img');
//   img.src = workoutData.image;
//   const title = portrait.querySelector('.workout-title');
//   title.textContent = workoutData.title;
//   const description = portrait.querySelector('.workout-description');
//   description.textContent = workoutData.description;
//   const category = portrait.querySelector('.workout-category');
//   category.textContent = workoutData.category;
//   const equipment = portrait.querySelector('.workout-equipment');
//   equipment.textContent = workoutData.equipment;


//   // Attach exercise ID to the portrait element
//   portrait.dataset.exerciseId = workoutData['ex-id'];

//   const addExerciseButton = portrait.querySelector('.workout-add');
//   addExerciseButton.addEventListener('click', function () {
//     const durationInput = portrait.querySelector('.workout-duration');
//     const duration = durationInput.value.trim();
//     if (duration === '') {
//       // If duration is not provided, display a message prompting the user to enter a duration
//       const message = document.createElement('section');
//       message.textContent = `Please enter a duration for ${workoutData.title}`;
//       message.classList.add('message');
//       addExerciseButton.parentNode.appendChild(message);
//       // Set timeout to remove the message after 3 seconds
//       setTimeout(() => {
//         message.remove();
//       }, 3000);
//     } else {
//       // If duration is provided, pass the portrait to the "Create Hiit" section and display the message
//       const clonedPortrait = portrait.cloneNode(true);
//       const createHiitSection = document.querySelector('#content2');
//       const inputField = clonedPortrait.querySelector('.workout-duration');
//       inputField.disabled = true;
//       const addBtn = clonedPortrait.querySelector('.workout-add');
//       addBtn.parentNode.removeChild(addBtn);
//       const title = workoutData.title;
//       const message = document.createElement('section');
//       message.textContent = `${title} has been added to the Create Hiit section`;
//       message.classList.add('message');
//       addExerciseButton.parentNode.appendChild(message);
//       createHiitSection.appendChild(clonedPortrait);
//       // Set timeout to remove the message after 3 seconds
//       setTimeout(() => {
//         message.remove();
//       }, 3000);

//       const exerciseId = portrait.dataset.exerciseId; // Retrieve exercise ID from the portrait
//       const selectedExercise = exercisesData.find(exercise => exercise['ex-id'] === parseInt(exerciseId)); // Parse exerciseId to integer

//       // Ensure selectedExercise is defined and has necessary properties
//       if (selectedExercise && selectedExercise.title) {
//         // Call a function to display instructions for the selected exercise
//         displayExerciseInstructions(selectedExercise);
//       } else {
//         console.error('Error: Selected exercise data is invalid.');
//       }
//     }
//     updateTimerDisplay();
//     hideInstructions(); // Hide instructions after adding an exercise
//   });

//   portraitContainer.appendChild(portrait); // Append portrait to container
// }

// // function to hide instructions
// // function hideInstructions() {
// //   const instructionsContainer = document.querySelector('#exercise-instructions');
// //   const instructionElements = instructionsContainer.querySelectorAll('ul');
// //   instructionElements.forEach(instruction => {
// //     instruction.style.display = 'none';
// //   },
// //   );
// //   const instructionTitles = instructionsContainer.querySelectorAll('h3');
// //   instructionTitles.forEach(title => {
// //     title.style.display = 'none';
// //   });
// // }

// function displayExerciseInstructions(exerciseData) {
//   // Select the instructions container
//   const instructionsContainer = document.querySelector('#exercise-instructions');

//   // Create elements to display exercise instructions
//   const exerciseTitle = document.createElement('h3');
//   exerciseTitle.textContent = exerciseData.title;
//   instructionsContainer.appendChild(exerciseTitle);

//   // Split the instructions by newline character and create a list
//   const instructionsList = document.createElement('ul');
//   const instructions = exerciseData.instructions.split('\n');
//   instructions.forEach(instruction => {
//     const listItem = document.createElement('li');
//     listItem.textContent = instruction;
//     instructionsList.appendChild(listItem);
//   });

//   instructionsContainer.appendChild(instructionsList);
// }

// async function displayExercises() {
//   try {
//     exercisesData = await fetchExercises();
//     console.log('Exercises Data:', exercisesData); // Log exercisesData
//     exercisesData.forEach(exerciseData => {
//       createWorkoutPortrait(exerciseData); // Pass exercisesData to createWorkoutPortrait
//     });
//   } catch (error) {
//     console.error('Error displaying exercises:', error);
//   }
// }

// // Call displayExercises to fetch and display the exercises
// displayExercises()
//   .catch(error => console.error('Error displaying exercises:', error));


// // Function to search exercises by title
// function searchExercises() {
//   const searchInput = document.querySelector('#searchInput').value.toLowerCase();
//   const portraitContainer = document.querySelectorAll('.workout-portrait');

//   portraitContainer.forEach(portrait => {
//     const title = portrait.querySelector('.workout-title').textContent.toLowerCase();
//     if (title.includes(searchInput) || searchInput === '') {
//       portrait.style.display = 'block';
//     } else {
//       portrait.style.display = 'none';
//     }
//   });
// }

// // Add event listener to search input
// document.querySelector('#searchInput').addEventListener('input', searchExercises);


// // Timer JS

// // Select elements
// // eslint-disable-next-line no-unused-vars
// const startButton = document.querySelector('#start-workout-btn');
// const stopButton = document.querySelector('#stop-workout-btn');
// const resetButton = document.querySelector('#reset-workout-btn');
// const difficultySelect = document.querySelector('#difficulty-select');

// startButton.addEventListener('click', () => {
//   const selectedDifficulty = difficultySelect.value; // Get the selected difficulty level
//   startTimer(selectedDifficulty); // Start the timer with the selected difficulty level
//   displayExerciseInstructions(); // Display exercise instructions when the timer starts
// });


// // Event listener for stop button
// stopButton.addEventListener('click', () => {
//   clearInterval(countdownInterval);
// });

// // Event listener for reset button
// resetButton.addEventListener('click', () => {
//   clearInterval(countdownInterval);
//   updateTimer(); // Reset the timer display immediately
// });


// ProfileJS

// Add event listeners for profile buttons
document.querySelector('#profile-joel').addEventListener('click', function () {
  handleProfileClick('Joel');
});

document.querySelector('#profile-paschal').addEventListener('click', function () {
  handleProfileClick('Paschal');
});

document.querySelector('#profile-tanna').addEventListener('click', function () {
  handleProfileClick('Tanna');
});

// Add event listener for profile form submission
document.querySelector('#profile-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent default form submission

  const newProfileName = document.querySelector('#new-profile-name').value;
  updateProfile(newProfileName);
});

// History JS

// Function to handle clicking the "Create Hiit Workout" button
document.querySelector('#create-hiit-workout').addEventListener('click', function () {
  const hiitInput = document.querySelector('#hiit-input').value.trim();
  const workoutText = document.querySelector('#workout-text');
  if (hiitInput !== '') {
    localStorage.setItem('hiitWord', hiitInput);
    workoutText.textContent = hiitInput + ' Workout World';
    console.log('Word stored in local storage:', hiitInput);

    // Get the selected exercises (you need to implement this logic)
    // eslint-disable-next-line no-undef
    const selectedExercises = getSelectedExercises(); // Implement this function to get selected exercises

    // Add the created HIIT workout along with selected exercises to the history
    addToHistory(hiitInput, selectedExercises);
  } else {
    console.log('Please enter a word');
  }
});

function getSelectedExercises() {
  const selectedExercises = [];
  const exerciseContainers = document.querySelectorAll('#content2 .exercise-info');

  exerciseContainers.forEach(container => {
    const exerciseTitle = container.querySelector('h2').textContent;
    const durationInput = container.querySelector('input[type="number"]');
    const duration = durationInput ? durationInput.value : ''; // If duration input exists, get its value

    if (exerciseTitle && duration) {
      selectedExercises.push({ title: exerciseTitle, duration });
    }
  });

  return selectedExercises;
}

// Call the function to display history when the page loads
displayHistory();


// Select buttons and content elements
const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');
const button4 = document.querySelector('#button4');
const button5 = document.querySelector('#button5');


const content1 = document.querySelector('#content1');
const content2 = document.querySelector('#content2');
const content3 = document.querySelector('#content3');
const content4 = document.querySelector('#content4');
const content5 = document.querySelector('#content5');

// Function to show content
function showContent(content) {
  content.classList.remove('hidden');
}

// Function to hide content
function hideContent(content) {
  content.classList.add('hidden');
}

// Function to handle clicking button1
button1.addEventListener('click', function () {
  showContent(content1);
  hideContent(content2);
  hideContent(content3);
  hideContent(content4);
  hideContent(content5);
});

// Function to handle clicking button2
button2.addEventListener('click', function () {
  showContent(content2);
  hideContent(content1);
  hideContent(content3);
  hideContent(content4);
  hideContent(content5);
});

// Function to handle clicking button3 (History)
button3.addEventListener('click', function () {
  showContent(content3);
  hideContent(content1);
  hideContent(content2);
  displayHistory(); // Call the displayHistory function to show the history immediately
  hideContent(content4);
  hideContent(content5);
});

// Function to handle clicking button4
button4.addEventListener('click', function () {
  showContent(content4);
  hideContent(content1);
  hideContent(content2);
  hideContent(content3);
  hideContent(content5);
});

button5.addEventListener('click', function () {
  showContent(content5);
  hideContent(content1);
  hideContent(content2);
  hideContent(content3);
  hideContent(content4);
});

// Initially hide content2 and content3
hideContent(content2);
hideContent(content3);
hideContent(content4);
hideContent(content5);


// Function to handle clicking the "Start Hiit Workout" button
document.querySelector('#start-Hiit-Workout').addEventListener('click', function () {
  // Hide content2 (Create Hiit Workout) and show content4 (Timer)
  hideContent(content2);
  showContent(content4);
});
