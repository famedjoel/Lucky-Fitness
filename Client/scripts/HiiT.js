// hiit.js
import { displayFavorites, toggleFavorite } from './favorite.js';

export let instructionsData = [];

// Fetch exercises data from exercises.json
export async function fetchExercises() {
  try {
    const response = await fetch('/exercises.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching exercises:', error);
    return [];
  }
}

// Fetch exercises data and display instructions
export async function fetchAndDisplayInstructions() {
  try {
    instructionsData = await fetchExercises();
    console.log('Instructions Data:', instructionsData);
    // displayExercises();
    displayFavorites(); // Call displayFavorites after instructionsData is initialized
  } catch (error) {
    console.error('Error fetching and displaying instructions:', error);
  }
}

// Create a workout portrait based on workout data
export function createWorkoutPortrait(workoutData, isFavorite = false) {
  const portraitContainer = workoutData['ex-id'] <= 6 ? document.querySelector('#content1-portrait-container') : document.querySelector('#hidden-exercises');
  const portraitTemplate = document.querySelector('#temp-portrait');
  const portrait = portraitTemplate.content.cloneNode(true).firstElementChild;

  // Set title, description, category, and equipment
  const title = portrait.querySelector('.workout-title');
  title.textContent = workoutData.title;

  const description = portrait.querySelector('.workout-description');
  description.textContent = workoutData.description;

  const category = portrait.querySelector('.workout-category');
  category.textContent = workoutData.category;

  const equipment = portrait.querySelector('.workout-equipment');
  equipment.textContent = workoutData.equipment;

  // Set up description dropdown
  const descriptionDropdown = portrait.querySelector('.workout-dropdown');
  const dropdownToggle = descriptionDropdown.querySelector('.dropdown-toggle');
  const dropdownContent = descriptionDropdown.querySelector('.dropdown-content');
  dropdownContent.innerHTML = `<p>${workoutData.description}</p><button class="close-dropdown">X</button>`;

  // Close dropdown button event listener
  const closeDropdownBtn = dropdownContent.querySelector('.close-dropdown');
  closeDropdownBtn.addEventListener('click', function () {
    dropdownContent.style.display = 'none';
  });

  // Toggle dropdown visibility
  dropdownToggle.addEventListener('click', function () {
    dropdownContent.style.display = dropdownContent.style.display === 'none' ? 'block' : 'none';
  });

  portrait.dataset.exerciseId = workoutData['ex-id'];

  // Add exercise button event listener
  const addExerciseButton = portrait.querySelector('.workout-add');
  addExerciseButton.addEventListener('click', function () {
    const durationInput = portrait.querySelector('.workout-duration');
    const duration = durationInput.value.trim();
    if (duration === '') {
      // Display error message if duration is not entered
      const message = document.createElement('section');
      message.textContent = `Please enter a duration for ${workoutData.title}`;
      message.classList.add('message');
      addExerciseButton.parentNode.appendChild(message);
      setTimeout(() => {
        message.remove();
      }, 3000);
    } else {
      // Add exercise to Customize Hiit Page
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

  // Add favorite button
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

// Display all exercises
export async function displayExercises() {
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

// Toggle visibility of hidden exercises
export function toggleHiddenExercises() {
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

// Search exercises based on input
export function searchExercises() {
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

// Fetch and display instructions on page load
fetchAndDisplayInstructions();
