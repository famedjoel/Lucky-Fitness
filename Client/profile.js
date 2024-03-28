// profile.js
export function handleProfileClick(profileName) {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (loggedInUser === profileName) {
    localStorage.removeItem('loggedInUser');
  } else {
    localStorage.setItem('loggedInUser', profileName);
    localStorage.setItem('storedUsername', profileName);
  }
  updateUI();
}

export function updateUI() {
  const loggedInUser = localStorage.getItem('loggedInUser');
  const welcomeMessageContainer = document.getElementById('welcome-message-container');
  const welcomeMessage = document.getElementById('welcome-message');

  if (loggedInUser) {
    welcomeMessage.textContent = `Welcome, ${loggedInUser}!`;
    welcomeMessageContainer.style.display = 'block';
  } else {
    welcomeMessageContainer.style.display = 'none';
  }
}
