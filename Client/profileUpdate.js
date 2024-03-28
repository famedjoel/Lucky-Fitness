import { updateUI } from './profile.js';

// profileUpdate.js
export function updateProfile(newProfileName) {
  const updateProfileURL = '/update-profile';

  fetch(updateProfileURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ newProfileName }),
  })
    .then(response => {
      if (response.ok) {
        console.log('Profile updated successfully');
        localStorage.setItem('loggedInUser', newProfileName);
        localStorage.setItem('storedUsername', newProfileName);
        updateUI();
      } else {
        console.error('Failed to update profile');
      }
    })
    .catch(error => console.error('Error updating profile:', error));
}
