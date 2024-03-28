// timer.js

let countdownInterval;
// eslint-disable-next-line no-unused-vars
const durationInSeconds = 0; // Default duration is 0 seconds
const durations = [];
let timeLeft = 0; // Current duration being counted down
let isRestTime = false; // Flag to indicate if it's rest time

// Function to start the timer with adjusted rest times
export function startTimer(difficulty) {
  clearInterval(countdownInterval);
  if (timeLeft === 0) {
    timeLeft = durations.shift(); // Get the first duration from the array
  }
  countdownInterval = setInterval(() => {
    updateTimer();
    timeLeft--;
    if (timeLeft < 0) {
      clearInterval(countdownInterval);
      isRestTime = !isRestTime; // Toggle rest time flag
      if (isRestTime) {
        timeLeft = 120; // Default rest time
        // Adjust rest time based on difficulty
        if (difficulty === 'easy') {
          timeLeft -= 30; // Reduce rest time by 30 seconds for easy difficulty
        } else if (difficulty === 'hard') {
          timeLeft += 30; // Increase rest time by 30 seconds for hard difficulty
        }
      } else {
        // change the HTML as one workout is finished
        timeLeft = durations.shift(); // Get the next exercise duration from the array
      }
      startTimer(); // Start the timer for the next duration
    }
  }, 1000);
}

// Function to update the timer display
export function updateTimer() {
  const timerDisplay = document.querySelector('#timer-display');
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  if (isRestTime) {
    timerDisplay.textContent = `REST TIME: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  } else {
    if (timeLeft > 0) {
      timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    } else {
      timerDisplay.textContent = '0:00';
    }
  }
  // timerDisplay.textContent = currentDuration;
}

// Function to update the timer display with adjusted rest times based on difficulty
export function updateTimerDisplay(difficulty) {
  const exerciseContainers = document.querySelectorAll('#content2 .exercise-info');
  let totalDurationSeconds = 0;

  // Calculate rest time adjustment based on difficulty
  let restTimeAdjustment = 0;
  if (difficulty === 'easy') {
    restTimeAdjustment = -30; // Reduce rest time by 30 seconds for easy difficulty
  } else if (difficulty === 'hard') {
    restTimeAdjustment = 30; // Increase rest time by 30 seconds for hard difficulty
  }

  // Iterate through each exercise container
  exerciseContainers.forEach(container => {
    const durationInput = container.querySelector('input[type="number"]');
    if (durationInput) {
      let duration = parseInt(durationInput.value) * 60; // Convert minutes to seconds
      if (container !== exerciseContainers[exerciseContainers.length - 1]) {
        duration += restTimeAdjustment; // Adjust rest time
      }
      durations.push(duration); // Add exercise duration to the array
      totalDurationSeconds += duration;
    }
  });

  // Display the total duration in minutes and seconds
  const minutes = Math.floor(totalDurationSeconds / 60);
  const seconds = totalDurationSeconds % 60;
  const timerDisplay = document.querySelector('#timer-display');
  timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
