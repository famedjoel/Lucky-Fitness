'use strict';

// Function to initialize the script
// eslint-disable-next-line require-await
async function init() {
  console.log('js ready');
}

// Event listener to call the init function when the window loads
window.addEventListener('load', init);

// Function to register the service worker
async function registerServiceWorker() {
  // Check if the browser supports service workers
  if (navigator.serviceWorker) {
    // Register the service worker file located at './sw.js'
    await navigator.serviceWorker.register('./sw.js');
  }
}

// Event listener to call the registerServiceWorker function when the window loads
window.addEventListener('load', registerServiceWorker);
