// Function to add the created HIIT workout along with selected exercises and username to the history
export function addToHistory(hiitName, exercises) {
  const username = localStorage.getItem('loggedInUser'); // Get the logged-in username

  // Check if the username exists
  if (username) {
    const historyData = JSON.parse(localStorage.getItem('historyData')) || []; // Get existing history data or initialize as empty array
    historyData.push({ username, hiitName, exercises }); // Push new HIIT workout data to history data array
    localStorage.setItem('historyData', JSON.stringify(historyData)); // Store updated history data in local storage
  } else {
    console.log('User is not logged in.');
  }
}

// Function to display history or a message indicating that the history is empty
export function displayHistory() {
  const historyList = document.querySelector('#history-list');
  historyList.innerHTML = ''; // Clear existing content

  const username = localStorage.getItem('loggedInUser');
  const historyData = JSON.parse(localStorage.getItem('historyData')) || [];

  if (username && historyData.length > 0) {
    // User is logged in and there is history data
    historyData.forEach((item, index) => {
      const listItem = document.createElement('li');
      // Check if username exists
      if (item.username) {
        listItem.innerHTML = `<strong>Account name:</strong> ${item.username} <br>`;
      }
      listItem.innerHTML += `<strong>HIIT name:</strong> ${item.hiitName} `;
      // Format and append each exercise
      const exercisesList = document.createElement('ul');
      item.exercises.forEach(exercise => {
        const exerciseItem = document.createElement('li');
        exerciseItem.textContent = `${exercise.title} (${exercise.duration} mins)`;
        exercisesList.appendChild(exerciseItem);
      });
      listItem.appendChild(exercisesList);
      // Create delete button
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('delete-button'); // Add delete button class
      deleteButton.addEventListener('click', function () {
        deleteHistoryItem(index);
        displayHistory(); // Refresh the history list after deletion
      });
      listItem.appendChild(deleteButton); // Append delete button to the list item
      historyList.appendChild(listItem); // Append list item to the history list
    });
  } else {
    // User is not logged in or there is no history data
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'Your history is empty.';

    const instructionMessage = document.createElement('p');
    instructionMessage.textContent = 'To view your history, click on a created profile button.';

    historyList.appendChild(emptyMessage);
    historyList.appendChild(instructionMessage);
  }
}

// Function to delete a history item
function deleteHistoryItem(index) {
  const historyData = JSON.parse(localStorage.getItem('historyData')) || [];
  historyData.splice(index, 1); // Remove the item at the specified index
  localStorage.setItem('historyData', JSON.stringify(historyData)); // Update local storage
}
