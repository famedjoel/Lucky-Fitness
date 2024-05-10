// activity.js

import { startActivity, stopActivity, continueActivity } from './timer.js';
import { getActivitiesFromLocalStorage, saveActivityToLocalStorage } from './storage.js';

let timerInterval;

// Function to display an activity on the page
export function displayActivity(activity) {
  // Create a container for the activity
  const activityContainer = document.createElement('section');
  activityContainer.setAttribute('id', activity.id);

  // Create and display the activity title
  const activityTitle = document.createElement('h2');
  activityTitle.textContent = activity.name || 'Workout Name';
  activityContainer.appendChild(activityTitle);

  // Create and display the activity name input field
  const activityNameInput = document.createElement('input');
  activityNameInput.type = 'text';
  activityNameInput.value = activity.name || 'Type your Workout Name';
  activityNameInput.placeholder = 'Enter activity name';
  activityNameInput.addEventListener('input', function () {
    activity.name = activityNameInput.value;
  });
  activityContainer.appendChild(activityNameInput);

  // Create and display the edit button
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.classList.add('edit');
  editButton.addEventListener('click', function () {
    editActivity(activity.id);
  });
  activityContainer.appendChild(editButton);

  // Create and display the save changes button
  const saveChangesButton = document.createElement('button');
  saveChangesButton.classList.add('save-changes');
  saveChangesButton.textContent = 'Save Changes';
  saveChangesButton.addEventListener('click', function () {
    activityTitle.textContent = activityNameInput.value || 'Activity';
    saveEditedActivity(activity.id);
  });
  activityContainer.appendChild(saveChangesButton);

  // Create and display the list of exercises
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

  // Create and display the timer container
  const timerContainer = document.createElement('div');
  timerContainer.classList.add('timer');
  activityContainer.appendChild(timerContainer);

  // Create and display the start button
  const startButton = document.createElement('button');
  startButton.textContent = 'Start';
  startButton.classList.add('start');
  startButton.addEventListener('click', function () {
    startActivity(activity.id);

    // Hide unnecessary elements when starting the activity
    activityTitle.style.display = 'none';
    activityNameInput.style.display = 'none';
    editButton.style.display = 'none';
    saveChangesButton.style.display = 'none';
    exercisesList.style.display = 'none';
  });
  activityContainer.appendChild(startButton);

  // Create and display the stop button
  const stopButton = document.createElement('button');
  stopButton.textContent = 'Stop';
  stopButton.classList.add('stop');
  stopButton.addEventListener('click', function () {
    stopActivity();
    timerContainer.textContent = 'Stopped';
  });
  activityContainer.appendChild(stopButton);

  // Create and display the continue button
  const continueButton = document.createElement('button');
  continueButton.textContent = 'Continue';
  continueButton.classList.add('continue');
  continueButton.addEventListener('click', function () {
    continueActivity(activity.id);
  });
  activityContainer.appendChild(continueButton);

  // Append the activity container to the page
  document.querySelector('#activity-container').appendChild(activityContainer);
}

// Function to clear the activity and associated elements from the page
export function clearActivity() {
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
  // timeLeft = 0;
  clearInterval(timerInterval);
}

// Function to save the activity to local storage
export function saveActivity() {
  // Get the activity name and rest time from the input fields
  const activityNameInput = document.querySelector('#activity-name');
  const activityName = activityNameInput.value.trim();
  const restTimeInput = document.querySelector('#rest-time');
  const restTime = restTimeInput.value.trim() || 2;

  // Get the exercise containers and message section
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
    // Display an error message if no exercises are added
    messageSection.textContent = 'Please add at least one exercise from the exercise page before saving the HiiT.';
    return;
  }

  messageSection.textContent = '';

  // Create an activity object with the provided information
  const activity = {
    id: `activity_${Date.now()}`,
    name: activityName,
    restTime: parseInt(restTime),
    exercises: [],
  };

  // Add each exercise to the activity object
  exerciseContainers.forEach(container => {
    const exerciseTitle = container.querySelector('h2').textContent;
    const exerciseDuration = container.querySelector('.workout-duration').value;
    activity.exercises.push({ title: exerciseTitle, duration: exerciseDuration });
  });

  // Save the activity to local storage and display it on the page
  localStorage.setItem(activity.id, JSON.stringify(activity));
  displayActivity(activity);
  saveActivityToLocalStorage(activity);
}

// Function to save the edited activity to local storage
export function saveEditedActivity(activityId) {
  // Get the activity container and duration inputs
  const activityContainer = document.querySelector(`#${activityId}`);
  const durationInputs = activityContainer.querySelectorAll('.workout-duration');
  const activityNameInput = activityContainer.querySelector('input[type="text"]');
  const activity = getActivitiesFromLocalStorage().find(act => act.id === activityId);

  if (activity) {
    // Update the activity name and exercise durations
    activity.name = activityNameInput.value;
    activity.exercises.forEach((exercise, index) => {
      exercise.duration = durationInputs[index].value;
    });

    // Update the activity in local storage
    updateActivityInLocalStorage(activity);

    // Update the activity in the history page
    const activityElement = document.querySelector(`#content3 section[id="${activityId}"]`);
    if (activityElement) {
      const activityHeading = activityElement.querySelector('h3');
      activityHeading.textContent = `Workout Name: ${activity.name}`;

      const exercisesList = activityElement.querySelector('ul');
      exercisesList.innerHTML = '';

      // Recreate the exercises list with updated durations
      activity.exercises.forEach(exercise => {
        const exerciseItem = document.createElement('li');
        exerciseItem.textContent = `Exercise: ${exercise.title} (${exercise.duration} mins)`;
        exercisesList.appendChild(exerciseItem);
      });
    }
  } else {
    console.error('Activity not found in local storage.');
  }
}

// Function to enable editing of an activity
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

// Function to update an activity in local storage
export function updateActivityInLocalStorage(updatedActivity) {
  const activities = getActivitiesFromLocalStorage();
  const activityIndex = activities.findIndex(act => act.id === updatedActivity.id);
  if (activityIndex !== -1) {
    activities[activityIndex] = updatedActivity;
    localStorage.setItem('activities', JSON.stringify(activities));
  } else {
    console.error('Failed to find the activity in local storage.');
  }
}
