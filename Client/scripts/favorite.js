// favorite.js
import { createWorkoutPortrait, instructionsData } from './HiiT.js';

export function toggleFavorite(exerciseId) {
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

export function updateFavoriteButtons() {
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


export function displayFavorites() {
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
