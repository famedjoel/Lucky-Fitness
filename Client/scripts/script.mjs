import { clearActivity, saveEditedActivity, saveActivity } from './activity.js';
import { displayActivitiesInHistory } from './history.js';
import { displayProgress } from './progress.js';
import { displayFavorites } from './favorite.js';
import { displayExercises, searchExercises, toggleHiddenExercises } from './hiit.js';

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

const buttons = document.querySelectorAll('button[data-target^="content"]');

const contents = document.querySelectorAll('.content');

// Add the 'hidden' class to all content sections except the default one
document.querySelectorAll('.content').forEach((content, index) => {
  if (index !== 0) {
    content.classList.add('hidden');
  }
});

// Function to show content based on the target ID
export function showContent(contentId) {
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
      friendlyName = 'Saved-Hiit';
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

  // Add the 'active' class to the corresponding button in the .button-container
  const buttonContainerButton = document.querySelector(`.button-container button[data-target="${target}"]`);
  if (buttonContainerButton) {
    buttonContainerButton.classList.add('active');
  }

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

  // Check if the clicked button is inside the home container
  const isHomeContainerButton = event.target.closest('.home-container button');
  if (isHomeContainerButton) {
    // Remove the 'active' class from all buttons in the home container
    const homeButtons = document.querySelectorAll('.home-container button');
    homeButtons.forEach(button => {
      button.classList.remove('active');
    });

    // Add the 'active' class to the clicked button in the home container
    isHomeContainerButton.classList.add('active');
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
    case 'saved-hiit':
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
    case '/saved-hitt':
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

document.addEventListener('click', function (event) {
  if (event.target.classList.contains('save-changes-btn')) {
    const activityId = event.target.closest('[id]').id; // Get the ID of the nearest ancestor with an ID
    saveEditedActivity(activityId);
  }
});

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
    history.pushState(null, null, '/saved-hiit');

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
  displayActivitiesInHistory();
}

function pageLoad() {
  addEventListener();
  prepareHandles();
}

pageLoad();
