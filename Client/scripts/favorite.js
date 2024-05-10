// favorite.js
import { createWorkoutPortrait, instructionsData } from './hiit.js';

// Function to toggle favorite status of an exercise
export function toggleFavorite(exerciseId) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  const index = favorites.indexOf(exerciseId);
  if (index > -1) {
    favorites.splice(index, 1); // Remove exercise from favorites if already favorited
  } else {
    favorites.push(exerciseId); // Add exercise to favorites if not favorited
  }

  localStorage.setItem('favorites', JSON.stringify(favorites)); // Update favorites in local storage
  updateFavoriteButtons(); // Update favorite buttons on the page
}

// Function to update the appearance of favorite buttons based on the current favorites
export function updateFavoriteButtons() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const favoriteButtons = document.querySelectorAll('.favorite-btn');

  favoriteButtons.forEach(button => {
    const exerciseId = button.parentNode.dataset.exerciseId;
    if (favorites.includes(parseInt(exerciseId))) {
      button.classList.add('favorite'); // Add 'favorite' class to indicate exercise is favorited
      button.textContent = '★'; // Star icon for favorite exercises
    } else {
      button.classList.remove('favorite'); // Remove 'favorite' class to indicate exercise is not favorited
      button.textContent = '☆'; // Empty star icon for non-favorite exercises
    }
  });
}

// Function to display favorite exercises on the page
export function displayFavorites() {
  const favoritesContainer = document.querySelector('#favorites-container');
  favoritesContainer.innerHTML = '';

  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites.forEach(exerciseId => {
    if (instructionsData) { // Check if instructionsData is available
      const exerciseData = instructionsData.find(exercise => exercise['ex-id'] === exerciseId);
      if (exerciseData) {
        const favoritePortrait = createWorkoutPortrait(exerciseData); // Create workout portrait for the favorite exercise
        favoritesContainer.appendChild(favoritePortrait); // Append the workout portrait to the favorites container
      }
    }
  });
}
