import { getActivitiesFromLocalStorage } from './storage.js';
import { instructionsData } from './hiit.js';
import { updateProgress } from './progress.js';

let timerInterval;
let timeLeft = 0;
let currentExerciseIndex = 0;

// Function to display the timer
export function displayTimer(duration, element, callback, startSeconds = 0, isCurrent = true) {
  let minutes = duration;
  let seconds = startSeconds;

  element.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

  // Add the appropriate class to the timer element based on the current state
  if (isCurrent) {
    element.classList.add('current');
    element.classList.remove('rest');
  } else {
    element.classList.add('rest');
    element.classList.remove('current');
  }

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

// Function to start an activity
export function startActivity(activityId) {
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

  // Function to move to the next exercise
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

      // Display the timer for the exercise
      displayTimer(exerciseDuration, timerContainer, () => {
        currentExerciseIndex++;
        updateProgress(exerciseDuration * 60);
        if (currentExerciseIndex < activity.exercises.length) {
          workoutTitleContainer.textContent = 'Rest Time';
          workoutInstructionsContainer.innerHTML = `<p>Take a ${restDuration} minute rest before the next exercise.</p>`;
          displayTimer(restDuration, timerContainer, nextExercise, 0, false); // Pass false for isCurrent during rest time
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

// Function to stop the activity
export function stopActivity() {
  clearInterval(timerInterval);
  const timerText = document.querySelector('.timer').textContent;
  const [minutes, seconds] = timerText.split(':').map(val => parseInt(val));
  timeLeft = minutes * 60 + seconds;
}

// Function to continue the activity
export function continueActivity(activityId) {
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

  // Function to resume the exercise
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

      const remainingMinutes = Math.floor(timeLeft / 60);
      const remainingSeconds = timeLeft % 60;

      // Display the timer for the remaining exercise time
      displayTimer(remainingMinutes, timerContainer, () => {
        currentExerciseIndex++;
        if (currentExerciseIndex < activity.exercises.length) {
          workoutTitleContainer.textContent = 'Rest Time';
          workoutInstructionsContainer.innerHTML = `<p>Take a ${restDuration} minute rest before the next exercise.</p>`;
          displayTimer(restDuration, timerContainer, resumeExercise, 0, false); // Pass false for isCurrent during rest time
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
      displayTimer(restDuration, timerContainer, resumeExercise, 0, false); // Pass false for isCurrent during rest time
    } else {
      timerContainer.textContent = 'Workout Complete!';
      currentActivityContainer.textContent = '';
      nextActivityContainer.textContent = '';
      workoutTitleContainer.textContent = '';
      workoutInstructionsContainer.innerHTML = '';
    }
  }
}
