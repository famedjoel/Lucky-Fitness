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

export function displayHistory() {
  const historyList = document.querySelector('#history-list');
  historyList.innerHTML = ''; // Clear existing content

  const username = localStorage.getItem('loggedInUser');
  const historyData = JSON.parse(localStorage.getItem('historyData')) || [];
  const historyItemTemplate = document.querySelector('#historyItemTemplate');

  if (username && historyData.length > 0) {
    // User is logged in and there is history data
    historyData.forEach((item, index) => {
      const listItemInstance = historyItemTemplate.content.cloneNode(true);

      // Populate account name if it exists
      if (item.username) {
        const accountNameElement = listItemInstance.querySelector('.account-name');
        accountNameElement.textContent = `Account name: ${item.username}`;
      }

      // Populate HIIT name
      const hiitNameElement = listItemInstance.querySelector('.hiit-name');
      hiitNameElement.textContent = `HIIT name: ${item.hiitName}`;

      // Format and populate exercises
      const exercisesListElement = listItemInstance.querySelector('.exercises-list');
      item.exercises.forEach(exercise => {
        const exerciseItem = document.createElement('li');
        exerciseItem.textContent = `${exercise.title} (${exercise.duration} mins)`;
        exercisesListElement.appendChild(exerciseItem);
      });

      // Add event listener to delete button
      const deleteButton = listItemInstance.querySelector('.delete-button');
      deleteButton.addEventListener('click', function () {
        deleteHistoryItem(index);
        displayHistory(); // Refresh the history list after deletion
      });

      // Append the populated item to the history list
      historyList.appendChild(listItemInstance);
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
