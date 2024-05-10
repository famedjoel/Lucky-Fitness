// history.js
import { getActivitiesFromLocalStorage } from './storage.js';
import { showContent } from './script.mjs';
import { displayActivity } from './activity.js';

// Function to display activities in the history section
export function displayActivitiesInHistory() {
  const activities = getActivitiesFromLocalStorage();
  const historyContent = document.querySelector('#content3');
  historyContent.innerHTML = '';

  activities.forEach(activity => {
    const activityContainer = document.createElement('section');
    activityContainer.classList.add('activity-container');

    // Display the workout name
    const activityHeading = document.createElement('h3');
    activityHeading.textContent = `Workout Name: ${activity.name}`;
    activityContainer.appendChild(activityHeading);

    // Display the workout ID
    const activityIdHeading = document.createElement('p');
    activityIdHeading.textContent = `Workout ID: ${activity.id}`;
    activityContainer.appendChild(activityIdHeading);

    // Display the list of exercises
    const exercisesList = document.createElement('ul');
    activity.exercises.forEach(exercise => {
      const exerciseItem = document.createElement('li');
      exerciseItem.textContent = `Exercise: ${exercise.title} (${exercise.duration} mins)`;
      exercisesList.appendChild(exerciseItem);
    });
    activityContainer.appendChild(exercisesList);

    // Button to redo the workout
    const redoButton = document.createElement('button');
    redoButton.classList.add('redo');
    redoButton.textContent = 'Redo Workout';
    redoButton.addEventListener('click', function () {
      redoWorkout(activity);
    });
    activityContainer.appendChild(redoButton);

    // Button to delete the activity
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

// Function to redo a workout
export function redoWorkout(activity) {
  // Clear the current activity container
  const activityContainer = document.querySelector('#activity-container');
  activityContainer.innerHTML = '';

  // Display the selected activity
  displayActivity(activity);

  // Navigate to the HIIT Station page
  showContent('content4');
  history.pushState(null, null, '/saved-hiit');

  // Remove the 'active' class from all buttons
  const buttons = document.querySelectorAll('.button-container button');
  buttons.forEach(button => {
    button.classList.remove('active');
  });

  // Add the 'active' class to the "Hiit Station" button
  const hiitStationButton = document.querySelector('#button4[data-target="content4"]');
  hiitStationButton.classList.add('active');
}

// Function to delete an activity from local storage
export function deleteActivityFromLocalStorage(activityId) {
  const activities = getActivitiesFromLocalStorage();
  const updatedActivities = activities.filter(activity => activity.id !== activityId);
  localStorage.setItem('activities', JSON.stringify(updatedActivities));
}
