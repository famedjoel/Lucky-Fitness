# Lucky-Fitness

## Description
Lucky Fitness App is your ultimate companion on the journey to a healthier and luckier you. Achieve your fitness goals with personalized workouts, nutrition plans, and a touch of luck for motivation.


## Installation

Before you start, ensure you have a good code editor like Visual Studio Code.

1. Clone the repository:
    ```bash
    git clone https://github.com/famedjoel/Lucky-Fitness.git
    ```

2. Install dependencies:
    ```bash
    npm i 
    ```

3. Start the application:
    ```bash
    npm start

 Open any Selected web browser of your choice and visit [http://localhost:8080/](http://localhost:8080/) to view the app.
    ```
Alternatively, use Visual Studio Code's Live Server extension by clicking **Go Live** in the bottom right corner of the status bar.

# Features

1. Customize HiiT Workout
2. Favourite an exercise of choice
3. search for an exercise
4. Start a HiiT workout
5. Record Keeping
6. Visual cues
7. Progress Tracking
8. Clear Workout
9. Editing WorkOut Name & Duration

# Description of the Features

## Customize HiiT Workout Feature

The "Customize HiiT Workout" in Lucky Fitness allows users to be able to create a workout consisting of exercises. 

### Key Components

- **Add Exercise**: the users can add any exercise through that button and it will display a message where it went the added exercise went to.
- **Type duration**: the user has to enter any duration of their choice and it will be in minutes
- **Enter HiiT Name:**: the users can be able to name their workout they added.
- **Rest Time (minutes)**: the users can decide to add any rest time they want to for their workouts for in between periods.
- **Your weight**: the users can insert their weight so they can know the estimated calories burnt during their HiiT workout.

### How it Works

As you enter the web application you can go to the exercise page and select any exercise of your choice and you can be able to scroll down and see a button that says "show more exercises" You can click it if you are not satisfied. after adding any exercise of your choice go to the customize HiiT page and input the title of the workout you are creating, the rest time of your choice for your exercise and also you can type in your weight.  after that, you can click the save HiiT button. and you have created a HIIT workout

### Design 

I had a clear vision from the beginning, which made the process manageable. I sketched out the initial design on Figma before starting the implementation. I decided to use portrait size for the exercise interface, differing from the common small box format used in most apps, to give it a unique aspect.
Additionally, I incorporated a rest time feature. Recognizing that every user appreciates breaks during workouts, this seemed like a natural fit to enhance user experience by allowing intervals of rest.
For the weight input feature, I thought it essential for a fitness app to track weight changes, considering that consistent exercise can lead to weight loss. This feature not only aids in tracking health metrics but also motivates users by showing the tangible results of their fitness journey.

## Favourite an exercise of choice Feature

The "Favourite an exercise of choice" feature in Lucky Fitness allows users to bookmark the exercise they like the more and they can see them in the favorites page.

### Key Components

- the user can see a favorite button in a star format

### How it Works

so basically while they are creating their personalized HiiT they can decide to favorite exercise. so it is in any exercise portrait clicking it will do the job and you can view it from your favorite page.

### Design

I believe that integrating these features will enhance the app's appeal and interactivity for users.

## search for an exercise Feature

The "search for an exercise" feature in Lucky Fitness allows users to search for any exercise while creating their HiiT.

### How it Works

Simply enter any exercise into the search bar to find available sessions at any time.

### design 

I decided to integrate this feature because some users may have difficulty scrolling, so typing to create your own HIIT session offers a more accessible alternative.

##  Start a HiiT workout Feature

The " Start a HiiT workout" feature in Lucky Fitness allows users to start the workout they created.

### Key Components

- **Start Button**: The user can start their workout from the get-go.

- **Stop Button**: The user can stop/pause the workout they started.
- **Continue Button**: The user can continue/play the workout the stopped

### How it Works

It's quite straightforward: after creating your HIIT session, simply click 'Save HIIT.' This action will redirect you to the 'Saved-HIIT' page. From there, click 'Start' and you're ready to begin your workout.

### Design
For every workout created, users can easily start their session with the click of a button. I've also implemented detailed instructions for each exercise to guide them effectively. Additionally, to help users stay focused and informed, the app displays real-time updates on current activities and what’s coming up next.

## Record Keeping Feature

The "record-keeping" basically a history page where users  keep track of their exercise workouts over time. This page displays a list of recorded workout sessions, showing the names of the workouts and providing users with the ability to delete entries and also redo that specific workout.

### Key Components

- **Delete Functionality**: Each entry in the workout history includes a "Delete" button, enabling users to remove specific workouts they no longer wish to keep in their history.

- **Redo Functionality**: Each past entry the user entered created the user can be able to redo it if they want fancy doing it.

### How it Works

Once you create your workout, refreshing the page will display your most recent entry in the history, complete with options to redo or delete it.

### Design 

I implemented this feature because users may sometimes forget their past activities, so having a visible record of previous workouts helps them track their progress and maintain consistency.


## Visual cues Feature

The "Visual cues" feature in Lucky Fitness allows users to access/see the app in a different way of their choice.

### Key Components

- **Light and dark Mode**: Users can put their screen in a light and dark mode.

- **Rests with a different colour**: Users can see the rest in different colour compared to the current activity.

### How it Works

For light and dark mode, users can simply click on the sun or star icon to toggle between them. Additionally, various color options are available, allowing users to customize their display while working out.

### Design


While designing the app, I realized that light and dark modes are standard features on mobile phones, so I decided to incorporate them, recognizing their potential benefits for users. Additionally, the idea of offering different color themes stemmed from a discussion with friends. Realizing its appeal, I decided to seriously pursue and implement this feature to enhance the user experience.

## Progress Tracking Feature

The "Progress Tracking" feature in Lucky Fitness allows users to view their progress during the entire workouts they did while using the app.

### Key Components

- **Workouts Completed**: Users can see the total workouts while being in the app.
- **Total Duration**: Users can see the total duration while being in the app.
- **Estimated Total calories burnt**: Users can see the estimated calories burnt while being on the app.

### How it Works


The process is streamlined for ease of use: simply create your HIIT session, start it, complete it, and enter your accurate weight. Your progress will automatically be displayed, allowing you to track your results effortlessly.

### Design

While designing the app, I recognized the importance of users being able to easily track their progress without confusion. This led me to conduct research and explore innovative features. Consequently, I decided to incorporate a weight-tracking functionality, considering the primary goal of this HIIT app is to help users burn fat and lose weight effectively.

## Clear Workout Feature

The "Clear Workout" feature in Lucky Fitness allows users to clear their current workout if they don't fancy it and create a new one.
### Key Components

- **Clear Workout Button**: Users can clear the workout they created
  
### How it Works

It's easy to use: simply return to the "Customize HIIT" page and click "Clear Workout" to reset everything.

### Design


While designing the app, I acknowledged the varied preferences and moods of users, which can change frequently. To accommodate this, I added a feature allowing users to easily switch out exercises they find mundane for more engaging and challenging options. This flexibility enhances the user experience by catering to individual needs and keeping the workouts interesting.


## Editing WorkOut Name & Duration Feature

The "Editing WorkOut Name & Duration" feature in lucky fitness allows user to edit the created workout name they inputed at first and acan also edit the duration to their tatse again.

### Key Components

- **Edit button**: users can edit the duration by clciking this button

- **Save Changes button**: users can confirm the changes they made by clciking this button

### How it Works

After you create your HIIT session and click 'Save HIIT,' you'll be directed to the 'Saved HIIT' page. Here, you'll see an input bar displaying the initial name you assigned, along with the exercise and its duration. To edit the duration, simply click 'Edit.' If you wish to modify the exercise details, erase the current input and type the new information. Once you're done with the changes, click the 'Save Changes' button. Your updates will be reflected both in the timer and in your workout history. Now, you can relax and start your updated HIIT session with confidence.

### Design


Initially, I recognized that user preferences can change frequently; for example, someone might decide to shorten a workout from 5 minutes to 2 minutes if they're in a hurry. This insight led me to implement a feature that allows users to easily adjust the duration and details of their workouts. This flexibility is crucial because it acknowledges that one person's needs can vary over time, making it a key feature of the app.


---


### Here's an enhanced summary of the key differences between the last prototype and the final submission of the app:

I significantly enhanced my work by optimizing the structure of my app. Initially, my prototype included several HTML pages, which I realized was inefficient for server rendering and slowed down the load times. Taking inspiration from Matt's idea, I shifted to a single-page application approach, which has since made the app more streamlined and responsive.

In terms of design, while I preserved some intriguing CSS from the original version for its aesthetic appeal, I revamped most of the design elements and interface to improve usability. I also retained several effective ideas from the initial prototype but refined them to enhance functionality and user experience.

One of the features I'm particularly proud of integrating is progress tracking and visual cues. This addition not only enriches the user experience but also provides clear, motivational feedback on their progress. Furthermore, I improved how workouts are initiated and managed within the app. Unlike the original prototype that presented challenges, the new design now smoothly transitions between current, upcoming activities and detailed instructions, all tailored to the user’s workout duration.

Another significant enhancement is the introduction of a 'favorite' function, akin to a bookmarking feature, allowing users to easily mark and return to their preferred exercises. This feature aims to make the app more user-centric, providing a personalized and satisfying experience.

Overall, these improvements have transformed the app into a more efficient, engaging, and user-friendly platform, ensuring that it not only meets but exceeds user expectations.

---

## AI

### Prompts to develop my Visual Cue on my timer

> I want to implement a visual cue for my timer in the sense that when on a current timer it is green and when on rest it is blue
        To implement a visual cue for your timer, indicating green when on the current timer and blue when on rest, you can modify the CSS and JavaScript code. Here's how you can achieve this:

Update the CSS:
Add the following CSS classes to your existing CSS code:

cssCopy code.timer.current {
  background-color: green;
}

.timer.rest {
  background-color: blue;
}
These classes will be dynamically added to the timer element to change its background color based on the current state.

Update the JavaScript:
In the timer.js file, modify the displayTimer function to add the appropriate class to the timer element based on the current state. Here's an updated version of the displayTimer function:

javascriptCopy codeexport function displayTimer(duration, element, callback, startSeconds = 0, isCurrent = true) {
  let minutes = duration;
  let seconds = startSeconds;

  element.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

  // Add the appropriate class to the timer element based on the current state
  if (isCurrent) {
    element.classList.add('current');
    element.classList.remove('rest');
  } else {
    element.classList.add('rest');
    element.classList.remove('current');
  }

  let totalSeconds = minutes * 60 + seconds;

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    minutes = Math.floor(totalSeconds / 60);
    seconds = totalSeconds % 60;

    element.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

    if (--totalSeconds < 0) {
      clearInterval(timerInterval);
      callback();
    }
  }, 1000);
}
In the updated displayTimer function, we added an additional parameter isCurrent to indicate whether the timer is currently active or on rest. Based on this parameter, we add the appropriate class to the timer element using element.classList.add() and element.classList.remove().

Update the nextExercise and resumeExercise functions:
In the nextExercise and resumeExercise functions, pass the appropriate value for the isCurrent parameter when calling the displayTimer function. For example:

javascriptCopy codedisplayTimer(exerciseDuration, timerContainer, () => {
  currentExerciseIndex++;
  updateProgress(exerciseDuration * 60);
  if (currentExerciseIndex < activity.exercises.length) {
    workoutTitleContainer.textContent = 'Rest Time';
    workoutInstructionsContainer.innerHTML = `<p>Take a ${restDuration} minute rest before the next exercise.</p>`;
    displayTimer(restDuration, timerContainer, nextExercise, 0, false); // Pass false for isCurrent during rest time
  } else {
    // ...
  }
}, 0, true); // Pass true for isCurrent during exercise time
Similarly, update the resumeExercise function to pass the appropriate value for isCurrent when calling displayTimer.
With these changes, the timer element will have a green background color when displaying the current exercise timer and a blue background color when displaying the rest timer.
Remember to adjust the colors and styles in the CSS classes according to your preference.

    
### Prompt on when saved changes is clicked it doesn't seem to get updated in the history page

> so basically when saved changes is clicked it deosnt seems to get updated in the history page
It seems like the issue is that the saveEditedActivity function is updating the activity in local storage, but the changes are not being reflected in the history page.
To fix this, you need to make sure that after updating the activity in local storage, you also update the corresponding activity element in the history page.
Here's the updated saveEditedActivity function in the activity.js file:
javascriptCopy codeexport function saveEditedActivity(activityId) {
  const activityContainer = document.querySelector(`#${activityId}`);
  const durationInputs = activityContainer.querySelectorAll('.workout-duration');
  const activity = getActivitiesFromLocalStorage().find(act => act.id === activityId);

  if (activity) {
    activity.exercises.forEach((exercise, index) => {
      // Update the duration based on the edited input fields
      exercise.duration = durationInputs[index].value;
    });

    // Update the activity in local storage
    updateActivityInLocalStorage(activity);

    // Update the activity in the history page
    const activityElement = document.querySelector(`#content3 section[id="${activityId}"]`);
    if (activityElement) {
      const exercisesList = activityElement.querySelector('ul');
      exercisesList.innerHTML = ''; // Clear existing exercises

      // Recreate the exercises list with updated durations
      activity.exercises.forEach(exercise => {
        const exerciseItem = document.createElement('li');
        exerciseItem.textContent = `Exercise: ${exercise.title} (${exercise.duration} mins)`;
        exercisesList.appendChild(exerciseItem);
      });
    }
  } else {
    console.error('Activity not found in local storage.');
  }
}
In this updated version, after updating the activity in local storage, we find the corresponding activity element in the history page using the activityId. If the element is found, we clear the existing exercises list and recreate it with the updated exercise durations.
This way, when the "Save Changes" button is clicked, the changes will be reflected in both the local storage and the history page.
Make sure to update the activity.js file with this modified saveEditedActivity

> first of all the issue is the updated one is not passed to the local storage
Apologies for the confusion. Let's take a closer look at the issue and resolve it step by step.
The problem seems to be that the updated activity is not being saved to the local storage correctly. To fix this, we need to ensure that the updateActivityInLocalStorage function is updating the activity in the local storage properly.
Here's the updated updateActivityInLocalStorage function in the activity.js file:
javascriptCopy codeexport function updateActivityInLocalStorage(updatedActivity) {
  const activities = getActivitiesFromLocalStorage();
  const activityIndex = activities.findIndex(act => act.id === updatedActivity.id);
  if (activityIndex !== -1) {
    activities[activityIndex] = updatedActivity;
    localStorage.setItem('activities', JSON.stringify(activities));
    displayActivitiesInHistory(); // Update the history page after updating the activity in local storage
  } else {
    console.error('Failed to find the activity in local storage.');
  }
}
In this updated version, we find the index of the activity in the activities array using the findIndex method. If the activity is found (i.e., activityIndex is not -1), we update the activity at that index with the updatedActivity object. Then, we save the updated activities array back to the local storage using localStorage.setItem.
Additionally, we call the displayActivitiesInHistory function to update the history page immediately after updating the activity in the local storage.
Make sure to update the activity.js file with this modified updateActivityInLocalStorage function.
Now, let's update the saveEditedActivity function to use the updated updateActivityInLocalStorage function:
javascriptCopy codeexport function saveEditedActivity(activityId) {
  const activityContainer = document.querySelector(`#${activityId}`);
  const durationInputs = activityContainer.querySelectorAll('.workout-duration');
  const activity = getActivitiesFromLocalStorage().find(act => act.id === activityId);

  if (activity) {
    activity.exercises.forEach((exercise, index) => {
      // Update the duration based on the edited input fields
      exercise.duration = durationInputs[index].value;
    });

    // Update the activity in local storage
    updateActivityInLocalStorage(activity);
  } else {
    console.error('Activity not found in local storage.');
  }
}
In this updated saveEditedActivity function, we simply call the updateActivityInLocalStorage function with the updated activity object.
With these changes, when the "Save Changes" button is clicked, the updated activity will be saved to the local storage correctly, and the history page will be updated to reflect the changes.
Please update the activity.js file with these modifications and let me know if you have any further questions or if the issue persists.

>it seems the updated workout name is not passed to the localstorage when save changes is clicked
You're right. In the saveEditedActivity function, the updated activity name is not being saved to the local storage. To fix this, you need to update the activity name in the activity object before saving it to the local storage.
Here's the modified saveEditedActivity function:
javascriptCopy codeexport function saveEditedActivity(activityId) {
  const activityContainer = document.querySelector(`#${activityId}`);
  const durationInputs = activityContainer.querySelectorAll('.workout-duration');
  const activityNameInput = activityContainer.querySelector('input[type="text"]');
  const activity = getActivitiesFromLocalStorage().find(act => act.id === activityId);

  if (activity) {
    activity.name = activityNameInput.value; // Update the activity name

    activity.exercises.forEach((exercise, index) => {
      // Update the duration based on the edited input fields
      exercise.duration = durationInputs[index].value;
    });

    // Update the activity in local storage
    updateActivityInLocalStorage(activity);

    // Update the activity in the history page
    const activityElement = document.querySelector(`#content3 section[id="${activityId}"]`);
    if (activityElement) {
      const activityHeading = activityElement.querySelector('h3');
      activityHeading.textContent = `Workout Name: ${activity.name}`; // Update the activity name in the history page

      const exercisesList = activityElement.querySelector('ul');
      exercisesList.innerHTML = ''; // Clear existing exercises

      // Recreate the exercises list with updated durations
      activity.exercises.forEach(exercise => {
        const exerciseItem = document.createElement('li');
        exerciseItem.textContent = `Exercise: ${exercise.title} (${exercise.duration} mins)`;
        exercisesList.appendChild(exerciseItem);
      });
    }
  } else {
    console.error('Activity not found in local storage.');
  }
}
In this updated version, the following changes have been made:

The activityNameInput is selected using activityContainer.querySelector('input[type="text"]') to get the input field that contains the activity name.
The activity name is updated in the activity object using activity.name = activityNameInput.value; before saving it to the local storage.
In the history page update section, the activityHeading is selected using activityElement.querySelector('h3'), and its text content is updated with the new activity name using activityHeading.textContent = Workout Name: ${activity.name};.

With these changes, the updated activity name will be saved to the local storage and reflected in the history page when the "Save Changes" button is clicked.

### Prompt on why my createlement(Section) is showing error at my displayActivitiesInHistory

> (i pasted the code) and the error Uncaught ReferenceError: createElement is not defined
at script.mjs:486:31
at Array.forEach (<anonymous>)
at displayActivitiesInHistory (script.mjs:485:14)
at script.mjs:525:1

The error message indicates that the createElement function is not defined. It seems like you are trying to use createElement without declaring or importing it.
To fix this error, you can modify the displayActivitiesInHistory function to use document.createElement instead of just createElement. Here's the corrected version of the function:
javascriptCopy codefunction displayActivitiesInHistory() {
  const activities = getActivitiesFromLocalStorage();
  const historyContent = document.querySelector('#content3');
  historyContent.innerHTML = '';

  activities.forEach(activity => {
    const activityContainer = document.createElement('section');
    activityContainer.classList.add('activity-container');

    const activityHeading = document.createElement('h3');
    activityHeading.textContent = `Workout Name: ${activity.name}`;
    activityContainer.appendChild(activityHeading);

    const activityIdHeading = document.createElement('p');
    activityIdHeading.textContent = `Workout ID: ${activity.id}`;
    activityContainer.appendChild(activityIdHeading);

    const exercisesList = document.createElement('ul');
    activity.exercises.forEach(exercise => {
      const exerciseItem = document.createElement('li');
      exerciseItem.textContent = `Exercise: ${exercise.title} (${exercise.duration} mins)`;
      exercisesList.appendChild(exerciseItem);
    });
    activityContainer.appendChild(exercisesList);

    const redoButton = document.createElement('button');
    redoButton.classList.add('redo');
    redoButton.textContent = 'Redo Workout';
    redoButton.addEventListener('click', function () {
      redoWorkout(activity);
    });
    activityContainer.appendChild(redoButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Activity';
    deleteButton.addEventListener('click', function () {
      deleteActivityFromLocalStorage(activity.id);
      displayActivitiesInHistory();
    });
    activityContainer.appendChild(deleteButton);

    historyContent.appendChild(activityContainer);
  });
}
In this corrected version, createElement is replaced with document.createElement to ensure that the function is properly defined and used.
Make this change and the error should be resolved.


