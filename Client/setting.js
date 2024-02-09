// function init() {
//     document.querySelector('#settings').addEventListener('click', toggleSettings);
// }
// function toggleSettings() {
//     const settingsContent = document.querySelector('#settings-content');
//     settingsContent.style.display = (settingsContent.style.display === "block") ? "none" : "block";
// }

// init()


const settingsIcon = document.querySelector('#settings-icon');

// Add a click event listener to the settings icon
settingsIcon.addEventListener('click', function () {
  // Navigate to the settings page
  window.location.href = 'settings.html';
});