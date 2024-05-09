let instructionsData = [];


async function fetchExercises() {
  try {
    const response = await fetch('/exercises.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching exercises:', error);
    return [];
  }
}

async function fetchAndDisplayInstructions() {
  try {
    instructionsData = await fetchExercises();
    console.log('Instructions Data:', instructionsData);
    // displayExercises();
    displayFavorites(); // Call displayFavorites after instructionsData is initialized
  } catch (error) {
    console.error('Error fetching and displaying instructions:', error);
  }
}


function createWorkoutPortrait(workoutData, isFavorite = false) {
  const portraitContainer = workoutData['ex-id'] <= 6 ? document.querySelector('#content1-portrait-container') : document.querySelector('#hidden-exercises');
  const portraitTemplate = document.querySelector('#temp-portrait');
  const portrait = portraitTemplate.content.cloneNode(true).firstElementChild;

  const title = portrait.querySelector('.workout-title');
  title.textContent = workoutData.title;

  const description = portrait.querySelector('.workout-description');
  description.textContent = workoutData.description;

  const category = portrait.querySelector('.workout-category');
  category.textContent = workoutData.category;

  const equipment = portrait.querySelector('.workout-equipment');
  equipment.textContent = workoutData.equipment;

  const durationInput = portrait.querySelector('.workout-duration');

  const descriptionDropdown = portrait.querySelector('.workout-dropdown');
  const dropdownToggle = descriptionDropdown.querySelector('.dropdown-toggle');
  const dropdownContent = descriptionDropdown.querySelector('.dropdown-content');
  dropdownContent.innerHTML = `<p>${workoutData.description}</p><button class="close-dropdown">X</button>`;

  const closeDropdownBtn = dropdownContent.querySelector('.close-dropdown');
  closeDropdownBtn.addEventListener('click', function () {
    dropdownContent.style.display = 'none';
  });

  dropdownToggle.addEventListener('click', function () {
    dropdownContent.style.display = dropdownContent.style.display === 'none' ? 'block' : 'none';
  });

  portrait.dataset.exerciseId = workoutData['ex-id'];

  const addExerciseButton = portrait.querySelector('.workout-add');
  addExerciseButton.addEventListener('click', function () {
    // const exerciseName = workoutData.title;
    const duration = durationInput.value.trim();
    if (duration === '') {
      const message = document.createElement('section');
      message.textContent = `Please enter a duration for ${workoutData.title}`;
      message.classList.add('message');
      addExerciseButton.parentNode.appendChild(message);
      setTimeout(() => {
        message.remove();
      }, 3000);
    } else {
      const clonedPortrait = portrait.cloneNode(true);
      const createHiitSection = document.querySelector('#content2');
      const inputField = clonedPortrait.querySelector('.workout-duration');
      inputField.disabled = true;
      const addBtn = clonedPortrait.querySelector('.workout-add');
      addBtn.parentNode.removeChild(addBtn);
      const title = workoutData.title;
      const message = document.createElement('section');
      message.textContent = `${title} has been added to the Customize Hiit Page.`;
      message.classList.add('message');
      addExerciseButton.parentNode.appendChild(message);
      createHiitSection.appendChild(clonedPortrait);
      setTimeout(() => {
        message.remove();
      }, 3000);
    }
  });

  const favoriteButton = document.createElement('button');
  favoriteButton.classList.add('favorite-btn');
  if (isFavorite) {
    favoriteButton.classList.add('favorite');
    favoriteButton.textContent = '★'; // Star icon for favorite exercises
  } else {
    favoriteButton.textContent = '☆'; // Empty star icon for non-favorite exercises
  }
  favoriteButton.addEventListener('click', function () {
    toggleFavorite(workoutData['ex-id']);
  });

  portrait.appendChild(favoriteButton);

  portraitContainer.appendChild(portrait);

  return portrait;
}

function toggleFavorite(exerciseId) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  const index = favorites.indexOf(exerciseId);
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(exerciseId);
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));
  updateFavoriteButtons();
}


function updateFavoriteButtons() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const favoriteButtons = document.querySelectorAll('.favorite-btn');

  favoriteButtons.forEach(button => {
    const exerciseId = button.parentNode.dataset.exerciseId;
    if (favorites.includes(parseInt(exerciseId))) {
      button.classList.add('favorite');
      button.textContent = '★'; // Star icon for favorite exercises
    } else {
      button.classList.remove('favorite');
      button.textContent = '☆'; // Empty star icon for non-favorite exercises
    }
  });
}


async function displayExercises() {
  try {
    const exercisesData = await fetchExercises();
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    exercisesData.forEach(exerciseData => {
      const isFavorite = favorites.includes(exerciseData['ex-id']);
      createWorkoutPortrait(exerciseData, isFavorite);
    });
  } catch (error) {
    console.error('Error displaying exercises:', error);
  }
}


function toggleHiddenExercises() {
  const hiddenContainer = document.querySelector('#hidden-exercises');
  const showMoreButton = document.querySelector('#show-more-btn');
  if (hiddenContainer.style.display === 'none' || hiddenContainer.style.display === '') {
    hiddenContainer.style.display = 'block';
    showMoreButton.textContent = 'Hide Exercises';
  } else {
    hiddenContainer.style.display = 'none';
    showMoreButton.textContent = 'Show More Exercises';
  }
}


function searchExercises() {
  const searchInput = document.querySelector('#searchInput').value.toLowerCase();
  const portraitContainers = document.querySelectorAll('#content1-portrait-container, #hidden-exercises');
  const hiddenExercisesContainer = document.querySelector('#hidden-exercises');

  portraitContainers.forEach(container => {
    const portraits = container.querySelectorAll('.workout-portrait');
    let hasVisiblePortraits = false;

    portraits.forEach(portrait => {
      const title = portrait.querySelector('.workout-title').textContent.toLowerCase();
      if (title.includes(searchInput)) {
        portrait.style.display = 'inline-block';
        hasVisiblePortraits = true;
      } else {
        portrait.style.display = 'none';
      }
    });

    if (hasVisiblePortraits || (searchInput === '' && container.id !== 'hidden-exercises')) {
      container.style.display = 'block';
    } else {
      container.style.display = 'none';
    }
  });

  if (searchInput === '') {
    hiddenExercisesContainer.style.display = 'none';
  }
}


const buttons = document.querySelectorAll('button[data-target^="content"]');

const contents = document.querySelectorAll('.content');

// Add the 'hidden' class to all content sections except the default one
document.querySelectorAll('.content').forEach((content, index) => {
  if (index !== 0) {
    content.classList.add('hidden');
  }
});

// Function to show content based on the target ID
function showContent(contentId) {
  contents.forEach(content => {
    if (content.id === contentId) {
      content.classList.remove('hidden');
      if (contentId === 'content5') {
        displayFavorites();
      }
      if (contentId === 'content6') {
        displayProgress();
      }
    } else {
      content.classList.add('hidden');
    }
  });
}

// Function to handle clicks on buttons with data-target attributes
function handleContentClick(event) {
  const target = event.target.dataset.target;
  let friendlyName;
  switch (target) {
    case 'content0':
      friendlyName = 'home';
      break;
    case 'content1':
      friendlyName = 'exercise';
      break;
    case 'content2':
      friendlyName = 'customize-hiit';
      break;
    case 'content3':
      friendlyName = 'history';
      break;
    case 'content4':
      friendlyName = 'hiit-station';
      break;
    case 'content5':
      friendlyName = 'favorites';
      break;
    case 'content6':
      friendlyName = 'progress';
      break;
    default:
      friendlyName = 'home'; // Default to 'home' if no match
  }
  showContent(target);
  history.pushState(null, null, `/${friendlyName}`);

  // Remove the 'active' class from all buttons
  const buttons = document.querySelectorAll('.button-container button');
  buttons.forEach(button => {
    button.classList.remove('active');
  });

  // Add the 'active' class to the clicked button
  event.target.classList.add('active');

  // Remove the 'active' class from all navbar buttons
  const navbarButtons = document.querySelectorAll('.navbar button');
  navbarButtons.forEach(button => {
    button.classList.remove('active');
  });

  // Add the 'active' class to the clicked navbar button
  const targetButton = document.querySelector(`.navbar button[data-target="${target}"]`);
  if (targetButton) {
    targetButton.classList.add('active');
  }
}


// Add event listener for buttons with data-target attributes
buttons.forEach(button => {
  button.addEventListener('click', handleContentClick);
});

// Function to handle initial URL when the page loads
function handleInitialURL() {
  const initialPath = window.location.pathname.slice(1); // Remove leading '/'
  let target;
  switch (initialPath) {
    case '':
    case 'home':
      target = 'content0';
      break;
    case 'exercise':
      target = 'content1';
      break;
    case 'customize-hiit':
      target = 'content2';
      break;
    case 'hiit-station':
      target = 'content4';
      break;
    case 'history':
      target = 'content3';
      break;
    case 'favorites':
      target = 'content5';
      break;
    case 'progress':
      target = 'content6';
      break;
    default:
      target = 'content0'; // Default to 'home' if no match
  }
  showContent(target);

  // Set the initial active navbar button
  const targetButton = document.querySelector(`.navbar button[data-target="${target}"]`);
  if (targetButton) {
    targetButton.classList.add('active');
  }

  // Set the initial active button
  const initialButton = document.querySelector(`button[data-target="${target}"]`);
  if (initialButton) {
    initialButton.classList.add('active');
  }
}


// Add event listener for popstate to handle navigation using browser back/forward buttons
window.addEventListener('popstate', function () {
  const path = window.location.pathname;
  let target;
  switch (path) {
    case '/home':
      target = 'content0';
      break;
    case '/exercise':
      target = 'content1';
      break;
    case '/customize-hiit':
      target = 'content2';
      break;
    case '/hiit-station':
      target = 'content4';
      break;
    case '/history':
      target = 'content3';
      break;
    case '/favorites':
      target = 'content5';
      break;
    case '/progress':
      target = 'content6';
      break;
    case '/default-workouts':
      target = 'content7';
      break;
    default:
      target = 'content0'; // Default to 'home' if no match
  }
  showContent(target); // Display the content based on the URL

  // Set the active navbar button
  const targetButton = document.querySelector(`.navbar button[data-target="${target}"]`);
  if (targetButton) {
    const navbarButtons = document.querySelectorAll('.navbar button');
    navbarButtons.forEach(button => {
      button.classList.remove('active');
    });
    targetButton.classList.add('active');
  }

  // Set the active button
  const activeButton = document.querySelector(`button[data-target="${target}"]`);
  if (activeButton) {
    const buttons = document.querySelectorAll('.button-container button');
    buttons.forEach(button => {
      button.classList.remove('active');
    });
    activeButton.classList.add('active');
  }
});


function displayProgress() {
  const progress = JSON.parse(localStorage.getItem('progress')) || {
    workoutsCompleted: 0,
    totalDuration: 0,
    caloriesBurned: 0,
    exercises: {},
  };

  document.getElementById('workouts-completed').textContent = progress.workoutsCompleted;
  document.getElementById('total-duration').textContent = formatDuration(progress.totalDuration);
  document.getElementById('total-calories-burned').textContent = progress.caloriesBurned;
}

function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${padZero(hours)}:${padZero(minutes)}:${padZero(remainingSeconds)}`;
}

function padZero(value) {
  return value.toString().padStart(2, '0');
}

function displayFavorites() {
  const favoritesContainer = document.querySelector('#favorites-container');
  favoritesContainer.innerHTML = '';

  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites.forEach(exerciseId => {
    if (instructionsData) { // Check if instructionsData is available
      const exerciseData = instructionsData.find(exercise => exercise['ex-id'] === exerciseId);
      if (exerciseData) {
        const favoritePortrait = createWorkoutPortrait(exerciseData);
        favoritesContainer.appendChild(favoritePortrait);
      }
    }
  });
}


function saveActivity() {
  const activityNameInput = document.querySelector('#activity-name');
  const activityName = activityNameInput.value.trim();
  const restTimeInput = document.querySelector('#rest-time');
  const restTime = restTimeInput.value.trim() || 2;

  const exerciseContainers = document.querySelectorAll('#content2 .exercise-info');
  const messageSection = document.querySelector('#activity-message');

  // Get the user's weight from the input field
  const userWeightInput = document.querySelector('#user-weight');
  const userWeight = userWeightInput.value.trim();

  if (userWeight !== '') {
    // Store the user's weight in local storage
    localStorage.setItem('weight', userWeight);
  }

  if (exerciseContainers.length === 0) {
    messageSection.textContent = 'Please add at least one exercise from the exercise page before saving the HiiT.';
    return;
  }

  messageSection.textContent = '';

  const activity = {
    id: `activity_${Date.now()}`,
    name: activityName,
    restTime: parseInt(restTime),
    exercises: [],
  };

  exerciseContainers.forEach(container => {
    const exerciseTitle = container.querySelector('h2').textContent;
    const exerciseDuration = container.querySelector('.workout-duration').value;
    activity.exercises.push({ title: exerciseTitle, duration: exerciseDuration });
  });

  localStorage.setItem(activity.id, JSON.stringify(activity));
  displayActivity(activity);
  saveActivityToLocalStorage(activity);
}

// function displayActivitiesInHistory() {
//   const activities = getActivitiesFromLocalStorage();
//   const historyContent = document.querySelector('#content3');
//   historyContent.innerHTML = '';

//   activities.forEach(activity => {
//     const activityContainer = createElement('section');
//     activityContainer.classList.add('activity-container');

//     const activityHeading = document.createElement('h3');
//     activityHeading.textContent = `Workout Name: ${activity.name}`;
//     activityContainer.appendChild(activityHeading);

//     const activityIdHeading = document.createElement('p');
//     activityIdHeading.textContent = `Workout ID: ${activity.id}`;
//     activityContainer.appendChild(activityIdHeading);

//     const exercisesList = document.createElement('ul');
//     activity.exercises.forEach(exercise => {
//       const exerciseItem = document.createElement('li');
//       exerciseItem.textContent = `Exercise: ${exercise.title} (${exercise.duration} mins)`;
//       exercisesList.appendChild(exerciseItem);
//     });
//     activityContainer.appendChild(exercisesList);

//     const redoButton = document.createElement('button');
//     redoButton.classList.add('redo');
//     redoButton.textContent = 'Redo Workout';
//     redoButton.addEventListener('click', function () {
//       redoWorkout(activity);
//     });
//     activityContainer.appendChild(redoButton);

//     const deleteButton = document.createElement('button');
//     deleteButton.textContent = 'Delete Activity';
//     deleteButton.addEventListener('click', function () {
//       deleteActivityFromLocalStorage(activity.id);
//       displayActivitiesInHistory();
//     });
//     activityContainer.appendChild(deleteButton);

//     historyContent.appendChild(activityContainer);
//   });
// }

function displayActivitiesInHistory() {
  const activities = getActivitiesFromLocalStorage();
  const historyContent = document.querySelector('#content3');
  historyContent.innerHTML = '';

  activities.forEach(activity => {
    const activityContainer = document.createElement('section');
    activityContainer.classList.add('activity-container');

    const activityHeading = document.createElement('h3');
    activityHeading.textContent = `Workout Name: ${activity.name}`;
    activityContainer.appendChild(activityHeading);

    const activityIdHeading = document.createElement('p');
    activityIdHeading.textContent = `Workout ID: ${activity.id}`;
    activityContainer.appendChild(activityIdHeading);

    const exercisesList = document.createElement('ul');
    activity.exercises.forEach(exercise => {
      const exerciseItem = document.createElement('li');
      exerciseItem.textContent = `Exercise: ${exercise.title} (${exercise.duration} mins)`;
      exercisesList.appendChild(exerciseItem);
    });
    activityContainer.appendChild(exercisesList);

    const redoButton = document.createElement('button');
    redoButton.classList.add('redo');
    redoButton.textContent = 'Redo Workout';
    redoButton.addEventListener('click', function () {
      redoWorkout(activity);
    });
    activityContainer.appendChild(redoButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Activity';
    deleteButton.addEventListener('click', function () {
      deleteActivityFromLocalStorage(activity.id);
      displayActivitiesInHistory();
    });
    activityContainer.appendChild(deleteButton);

    historyContent.appendChild(activityContainer);
  });
}

displayActivitiesInHistory();

function redoWorkout(activity) {
  // Clear the current activity container
  const activityContainer = document.querySelector('#activity-container');
  activityContainer.innerHTML = '';

  // Display the selected activity
  displayActivity(activity);

  // Navigate to the HIIT Station page
  showContent('content4');
  history.pushState(null, null, '/hiit-station');

  // Remove the 'active' class from all buttons
  const buttons = document.querySelectorAll('.button-container button');
  buttons.forEach(button => {
    button.classList.remove('active');
  });

  // Add the 'active' class to the "Hiit Station" button
  const hiitStationButton = document.querySelector('#button4[data-target="content4"]');
  hiitStationButton.classList.add('active');
}

function deleteActivityFromLocalStorage(activityId) {
  const activities = getActivitiesFromLocalStorage();
  const updatedActivities = activities.filter(activity => activity.id !== activityId);
  localStorage.setItem('activities', JSON.stringify(updatedActivities));
}

displayActivitiesInHistory();

function editActivity(activityId) {
  const activityContainer = document.querySelector(`#${activityId}`);
  if (!activityContainer) {
    console.error(`No activity container found for ID: ${activityId}`);
    return;
  }

  const exercisesList = activityContainer.querySelector('#exercises-list');
  const durationInputs = exercisesList.querySelectorAll('.workout-duration');
  durationInputs.forEach(input => {
    input.disabled = false;
  });

  let saveButton = activityContainer.querySelector('.save-changes-btn');
  if (!saveButton) {
    // Create the save button if it doesn't exist
    saveButton = document.createElement('button');
    saveButton.className = 'save-changes-btn';
    saveButton.textContent = 'Save Changes';
  }
}

document.addEventListener('click', function (event) {
  if (event.target.classList.contains('save-changes-btn')) {
    const activityId = event.target.closest('[id]').id; // Get the ID of the nearest ancestor with an ID
    saveEditedActivity(activityId);
  }
});

function saveEditedActivity(activityId) {
  const activityContainer = document.querySelector(`#${activityId}`);
  const durationInputs = activityContainer.querySelectorAll('.workout-duration');
  const activity = getActivitiesFromLocalStorage().find(act => act.id === activityId);

  if (activity) {
    activity.exercises.forEach((exercise, index) => {
      // Update the duration based on the edited input fields
      exercise.duration = durationInputs[index].value;
    });

    // Update the activity in local storage
    updateActivityInLocalStorage(activity);
    displayActivitiesInHistory(); // Optionally, refresh any UI that displays these activities
  } else {
    console.error('Activity not found in local storage.');
  }
}

function updateActivityInLocalStorage(updatedActivity) {
  const activities = getActivitiesFromLocalStorage();
  const activityIndex = activities.findIndex(act => act.id === updatedActivity.id);
  if (activityIndex !== -1) {
    activities[activityIndex] = updatedActivity;
    localStorage.setItem('activities', JSON.stringify(activities));
  } else {
    console.error('Failed to find the activity in local storage.');
  }
}

function saveActivityToLocalStorage(activity) {
  const activities = getActivitiesFromLocalStorage();
  activities.push(activity);
  localStorage.setItem('activities', JSON.stringify(activities));
}


function getActivitiesFromLocalStorage() {
  return JSON.parse(localStorage.getItem('activities')) || [];
}

function displayActivity(activity) {
  const activityContainer = document.createElement('section');
  activityContainer.setAttribute('id', activity.id);

  const activityTitle = document.createElement('h2');
  activityTitle.textContent = activity.name || 'Workout Name';
  activityContainer.appendChild(activityTitle);

  const activityNameInput = document.createElement('input');
  activityNameInput.type = 'text';
  activityNameInput.value = activity.name || 'Type your Workout Name';
  activityNameInput.placeholder = 'Enter activity name';
  activityNameInput.addEventListener('input', function () {
    activity.name = activityNameInput.value;
  });
  activityContainer.appendChild(activityNameInput);

  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.classList.add('edit');
  editButton.addEventListener('click', function () {
    editActivity(activity.id);
  });
  activityContainer.appendChild(editButton);

  const saveChangesButton = document.createElement('button');
  saveChangesButton.classList.add('save-changes');
  saveChangesButton.textContent = 'Save Changes';
  saveChangesButton.addEventListener('click', function () {
    activityTitle.textContent = activityNameInput.value || 'Activity';
    saveEditedActivity(activity.id);
  });
  activityContainer.appendChild(saveChangesButton);

  const exercisesList = document.createElement('ul');
  exercisesList.setAttribute('id', 'exercises-list');
  activity.exercises.forEach(exercise => {
    const exerciseItem = document.createElement('li');

    const exerciseTitle = document.createElement('strong');
    exerciseTitle.textContent = exercise.title;
    exerciseItem.appendChild(exerciseTitle);

    const durationSpan = document.createElement('span');
    durationSpan.textContent = ` (${exercise.duration} mins)`;
    exerciseItem.appendChild(durationSpan);

    const durationInput = document.createElement('input');
    durationInput.classList.add('workout-duration');
    durationInput.type = 'number';
    durationInput.value = exercise.duration;
    durationInput.disabled = true;
    exerciseItem.appendChild(durationInput);

    exercisesList.appendChild(exerciseItem);
  });

  activityContainer.appendChild(exercisesList);

  const timerContainer = document.createElement('div');
  timerContainer.classList.add('timer');
  activityContainer.appendChild(timerContainer);

  const startButton = document.createElement('button');
  startButton.textContent = 'Start';
  startButton.classList.add('start');
  startButton.addEventListener('click', function () {
    startActivity(activity.id);

    // Hide the elements when start button is clicked
    activityTitle.style.display = 'none';
    activityNameInput.style.display = 'none';
    editButton.style.display = 'none';
    saveChangesButton.style.display = 'none';
    exercisesList.style.display = 'none';
  });
  activityContainer.appendChild(startButton);

  const stopButton = document.createElement('button');
  stopButton.textContent = 'Stop';
  stopButton.classList.add('stop');
  stopButton.addEventListener('click', function () {
    stopActivity();
    timerContainer.textContent = 'Stopped';
  });
  activityContainer.appendChild(stopButton);

  const continueButton = document.createElement('button');
  continueButton.textContent = 'Continue';
  continueButton.classList.add('continue');
  continueButton.addEventListener('click', function () {
    continueActivity(activity.id);
  });
  activityContainer.appendChild(continueButton);


  document.querySelector('#activity-container').appendChild(activityContainer);
}

let timerInterval;
let timeLeft = 0;
let currentExerciseIndex = 0;


function startActivity(activityId) {
  const activity = getActivitiesFromLocalStorage().find(act => act.id === activityId);
  if (!activity) {
    console.error(`Activity with ID ${activityId} not found.`);
    return;
  }

  const timerContainer = document.querySelector(`#${activityId} .timer`);
  const workoutTitleContainer = document.querySelector('#workout-title');
  const workoutInstructionsContainer = document.querySelector('#workout-instructions');
  const currentActivityContainer = document.querySelector('#current-activity');
  const nextActivityContainer = document.querySelector('#next-activity');
  let currentExerciseIndex = 0;
  const restDuration = activity.restTime;

  function nextExercise() {
    if (currentExerciseIndex < activity.exercises.length) {
      const currentExercise = activity.exercises[currentExerciseIndex];
      currentActivityContainer.textContent = currentExercise.title;

      const nextExerciseIndex = currentExerciseIndex + 1;
      if (nextExerciseIndex < activity.exercises.length) {
        nextActivityContainer.textContent = 'Rest';
      } else {
        nextActivityContainer.textContent = 'No more activities';
      }

      // Update workout title and instructions with current exercise info
      workoutTitleContainer.textContent = currentExercise.title;

      // Clear previous instructions
      workoutInstructionsContainer.innerHTML = '';

      // Find the corresponding exercise data from instructionsData
      const exerciseData = instructionsData.find(e => e.title === currentExercise.title);
      if (exerciseData && exerciseData.instruction) {
        // Create an ordered list for the instructions
        const instructionList = document.createElement('ol');
        const instructions = exerciseData.instruction.split(/\d+\./).filter(Boolean);
        instructions.forEach(instruction => {
          const step = document.createElement('li');
          step.textContent = instruction.trim();
          instructionList.appendChild(step);
        });
        workoutInstructionsContainer.appendChild(instructionList);
      } else {
        workoutInstructionsContainer.textContent = 'No instructions available';
      }

      const exerciseDuration = parseInt(currentExercise.duration);

      displayTimer(exerciseDuration, timerContainer, () => {
        currentExerciseIndex++;
        updateProgress(exerciseDuration * 60);
        if (currentExerciseIndex < activity.exercises.length) {
          workoutTitleContainer.textContent = 'Rest Time';
          workoutInstructionsContainer.innerHTML = `<p>Take a ${restDuration} minute rest before the next exercise.</p>`;
          displayTimer(restDuration, timerContainer, nextExercise);
        } else {
          updateProgress(0, null, true); // Update progress when workout is complete
          timerContainer.textContent = 'Workout Complete!';
          // Clear exercise info displays
          currentActivityContainer.textContent = '';
          nextActivityContainer.textContent = '';
          workoutTitleContainer.textContent = '';
          workoutInstructionsContainer.innerHTML = '';
        }
      });
    }
  }


  nextExercise();
}


function updateProgress(duration, exerciseId, isWorkoutComplete = false) {
  const progress = JSON.parse(localStorage.getItem('progress')) || {
    workoutsCompleted: 0,
    totalDuration: 0,
    caloriesBurned: 0,
    exercises: {},
  };

  if (isWorkoutComplete) {
    progress.workoutsCompleted++;
  } else {
    const weight = localStorage.getItem('weight') || 70; // Default weight if not set
    const exerciseData = instructionsData.find(exercise => exercise['ex-id'] === exerciseId);
    const met = exerciseData ? exerciseData.met : 5; // Default MET value if not found

    progress.totalDuration += duration;
    const calories = calculateCaloriesBurned(duration, met, weight);
    progress.caloriesBurned += calories;

    if (!progress.exercises[exerciseId]) {
      progress.exercises[exerciseId] = {
        title: exerciseData ? exerciseData.title : 'Unknown Exercise',
        calories: 0,
      };
    }
    progress.exercises[exerciseId].calories += calories;
  }

  localStorage.setItem('progress', JSON.stringify(progress));
  displayProgress(); // Call displayProgress after updating the progress object
}

function calculateCaloriesBurned(duration, met, weight) {
  const hours = duration / 60; // Convert duration from minutes to hours
  const calories = met * weight * hours;
  return Math.round(calories);
}


function displayTimer(duration, element, callback, startSeconds = 0) {
  let minutes = duration;
  let seconds = startSeconds;

  element.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

  let totalSeconds = minutes * 60 + seconds;

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    minutes = Math.floor(totalSeconds / 60);
    seconds = totalSeconds % 60;

    element.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

    if (--totalSeconds < 0) {
      clearInterval(timerInterval);
      callback();
    }
  }, 1000);
}


function stopActivity() {
  clearInterval(timerInterval);
  const timerText = document.querySelector('.timer').textContent;
  const [minutes, seconds] = timerText.split(':').map(val => parseInt(val));
  timeLeft = minutes * 60 + seconds;
}


function continueActivity(activityId) {
  const activity = getActivitiesFromLocalStorage().find(act => act.id === activityId);
  if (!activity) {
    console.error(`Activity with ID ${activityId} not found.`);
    return;
  }

  const timerContainer = document.querySelector(`#${activityId} .timer`);
  const workoutTitleContainer = document.querySelector('#workout-title');
  const workoutInstructionsContainer = document.querySelector('#workout-instructions');
  const currentActivityContainer = document.querySelector('#current-activity');
  const nextActivityContainer = document.querySelector('#next-activity');
  const restDuration = activity.restTime;

  function resumeExercise() {
    if (currentExerciseIndex < activity.exercises.length) {
      const currentExercise = activity.exercises[currentExerciseIndex];
      currentActivityContainer.textContent = currentExercise.title;

      const nextExerciseIndex = currentExerciseIndex + 1;
      if (nextExerciseIndex < activity.exercises.length) {
        nextActivityContainer.textContent = 'Rest';
      } else {
        nextActivityContainer.textContent = 'No more activities';
      }

      workoutTitleContainer.textContent = currentExercise.title;
      workoutInstructionsContainer.innerHTML = '';

      const exerciseData = instructionsData.find(e => e.title === currentExercise.title);
      if (exerciseData && exerciseData.instruction) {
        const instructionList = document.createElement('ol');
        const instructions = exerciseData.instruction.split(/\d+\./).filter(Boolean);
        instructions.forEach(instruction => {
          const step = document.createElement('li');
          step.textContent = instruction.trim();
          instructionList.appendChild(step);
        });
        workoutInstructionsContainer.appendChild(instructionList);
      } else {
        workoutInstructionsContainer.textContent = 'No instructions available';
      }

      // const exerciseDuration = parseInt(currentExercise.duration);
      const remainingMinutes = Math.floor(timeLeft / 60);
      const remainingSeconds = timeLeft % 60;

      displayTimer(remainingMinutes, timerContainer, () => {
        currentExerciseIndex++;
        if (currentExerciseIndex < activity.exercises.length) {
          workoutTitleContainer.textContent = 'Rest Time';
          workoutInstructionsContainer.innerHTML = `<p>Take a ${restDuration} minute rest before the next exercise.</p>`;
          timeLeft = restDuration * 60; // Reset timeLeft to the full rest duration
          displayTimer(restDuration, timerContainer, resumeExercise);
        } else {
          updateProgress(0, null, true); // Update progress when workout is complete
          timerContainer.textContent = 'Workout Complete!';
          currentActivityContainer.textContent = '';
          nextActivityContainer.textContent = '';
          workoutTitleContainer.textContent = '';
          workoutInstructionsContainer.innerHTML = '';
        }
      }, remainingSeconds);
    }
  }

  if (timeLeft > 0) {
    resumeExercise();
  } else {
    currentExerciseIndex++;
    if (currentExerciseIndex < activity.exercises.length) {
      workoutTitleContainer.textContent = 'Rest Time';
      workoutInstructionsContainer.innerHTML = `<p>Take a ${restDuration} minute rest before the next exercise.</p>`;
      timeLeft = restDuration * 60; // Reset timeLeft to the full rest duration
      displayTimer(restDuration, timerContainer, resumeExercise);
    } else {
      timerContainer.textContent = 'Workout Complete!';
      currentActivityContainer.textContent = '';
      nextActivityContainer.textContent = '';
      workoutTitleContainer.textContent = '';
      workoutInstructionsContainer.innerHTML = '';
    }
  }
}

function clearActivity() {
  // Clear the activity name input field
  document.querySelector('#activity-name').value = '';

  // Clear exercise containers
  const exerciseContainers = document.querySelectorAll('#content2 .exercise-info');
  exerciseContainers.forEach(container => {
    container.remove();
  });

  // Clear instructions, start/stop buttons, and associated elements
  const activityContainer = document.querySelector('#activity-container');
  activityContainer.innerHTML = ''; // This removes all child elements
  // Clear activity info and workout info sections
  document.querySelector('#current-activity').textContent = '';
  document.querySelector('#next-activity').textContent = '';
  document.querySelector('#workout-title').textContent = '';
  document.querySelector('#workout-instructions').innerHTML = '';

  // Reset timeLeft and stop the timer if it's running
  timeLeft = 0;
  clearInterval(timerInterval);
}


// Function to toggle between light and dark mode
function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle('dark-mode');

  // Save user preference to local storage
  const isDarkMode = body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDarkMode);
}

// Check if dark mode preference is saved in local storage
const savedDarkMode = localStorage.getItem('darkMode');
if (savedDarkMode === 'true') {
  document.body.classList.add('dark-mode');
}

function addEventListener() {
  document.querySelector('#save-activity-btn').addEventListener('click', saveActivity);
  document.querySelector('#clear-activity-btn').addEventListener('click', clearActivity);
  document.querySelector('#show-more-btn').addEventListener('click', toggleHiddenExercises);
  document.querySelector('#searchInput').addEventListener('input', searchExercises);
  document.querySelector('#mode-toggle').addEventListener('click', toggleDarkMode);
  document.querySelector('#save-activity-btn').addEventListener('click', function () {
    const exerciseContainers = document.querySelectorAll('#content2 .exercise-info');
    const messageSection = document.querySelector('#activity-message');

    if (exerciseContainers.length === 0) {
      messageSection.textContent = 'Please add at least one exercise from the exercise page before saving the HiiT.';
      return;
    }

    messageSection.textContent = ''; // Clear the message if exercises are added

    // saveActivity();
    showContent('content4');
    history.pushState(null, null, '/hiit-station');

    // Remove the 'active' class from all buttons
    const buttons = document.querySelectorAll('.button-container button');
    buttons.forEach(button => {
      button.classList.remove('active');
    });

    // Add the 'active' class to the "Hiit Station" button
    const hiitStationButton = document.querySelector('#button4[data-target="content4"]');
    hiitStationButton.classList.add('active');
  });


  document.addEventListener('DOMContentLoaded', handleInitialURL);
}

function prepareHandles() {
  displayExercises();
  fetchAndDisplayInstructions();
}

function pageLoad() {
  addEventListener();
  prepareHandles();
}

pageLoad();
