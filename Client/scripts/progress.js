// progress.js
import { instructionsData } from './HiiT.js';

export function displayProgress() {
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

export function calculateCaloriesBurned(duration, met, weight) {
  const hours = duration / 60; // Convert duration from minutes to hours
  const calories = met * weight * hours;
  return Math.round(calories);
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
