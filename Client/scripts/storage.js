export function getActivitiesFromLocalStorage() {
  return JSON.parse(localStorage.getItem('activities')) || [];
}

export function saveActivityToLocalStorage(activity) {
  const activities = getActivitiesFromLocalStorage();
  activities.push(activity);
  localStorage.setItem('activities', JSON.stringify(activities));
}
