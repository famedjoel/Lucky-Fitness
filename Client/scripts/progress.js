// progress.js
import { instructionsData } from './hiit.js';

// Function to display the progress on the webpage
export function displayProgress() {
  const progress = JSON.parse(localStorage.getItem('progress')) || {
    workoutsCompleted: 0,
    totalDuration: 0,
    caloriesBurned: 0,
    exercises: {},
  };

  // Update the DOM elements with the progress values
  document.querySelector('#workouts-completed').textContent = progress.workoutsCompleted;
  document.querySelector('#total-duration').textContent = formatDuration(progress.totalDuration);
  document.querySelector('#total-calories-burned').textContent = progress.caloriesBurned;
}

// Function to update the progress based on the duration, exerciseId, and workout completion status
export function updateProgress(duration, exerciseId, isWorkoutComplete = false) {
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

// Function to calculate the calories burned based on duration, MET value, and weight
export function calculateCaloriesBurned(duration, met, weight) {
  const hours = duration / 60; // Convert duration from minutes to hours
  const calories = met * weight * hours;
  return Math.round(calories);
}

// Function to format the duration in HH:MM:SS format
function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${padZero(hours)}:${padZero(minutes)}:${padZero(remainingSeconds)}`;
}

// Function to pad a single digit value with a leading zero
function padZero(value) {
  return value.toString().padStart(2, '0');
}
