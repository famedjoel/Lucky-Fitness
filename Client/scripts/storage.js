// Retrieve activities from local storage
export function getActivitiesFromLocalStorage() {
  return JSON.parse(localStorage.getItem('activities')) || [];
}

// Save activity to local storage
export function saveActivityToLocalStorage(activity) {
  const activities = getActivitiesFromLocalStorage();
  activities.push(activity);
  localStorage.setItem('activities', JSON.stringify(activities));
}
