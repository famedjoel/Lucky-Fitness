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

# Description of the Features

## Customize HiiT Workout

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

## Favourite an exercise of choice

The "Favourite an exercise of choice" feature in Lucky Fitness allows users to bookmark the exercise they like the more and they can see them in the favorites page.

### Key Components

- the user can see a favorite button in a star format

### How it Works

so basically while they are creating their personalized HiiT they can decide to favorite exercise. so it is in any exercise portrait clicking it will do the job and you can view it from your favorite page.

### Design

I believe that integrating these features will enhance the app's appeal and interactivity for users.

## search for an exercise

The "search for an exercise" feature in Lucky Fitness allows users to search for any exercise while creating their HiiT.

### How it Works

Simply enter any exercise into the search bar to find available sessions at any time.

### design 

I decided to integrate this feature because some users may have difficulty scrolling, so typing to create your own HIIT session offers a more accessible alternative.

##  Start a HiiT workout

The " Start a HiiT workout" feature in Lucky Fitness allows users to start the workout they created.

### Key Components

- **Start Button**: The user can start their workout from the get-go.

- **Stop Button**: The user can stop/pause the workout they started.
- **Continue Button**: The user can continue/play the workout the stopped

### How it Works

It's quite straightforward: after creating your HIIT session, simply click 'Save HIIT.' This action will redirect you to the 'Saved-HIIT' page. From there, click 'Start' and you're ready to begin your workout.

### Design
For every workout created, users can easily start their session with the click of a button. I've also implemented detailed instructions for each exercise to guide them effectively. Additionally, to help users stay focused and informed, the app displays real-time updates on current activities and what’s coming up next.

## Record Keeping 

The "record-keeping" basically a history page where users  keep track of their exercise workouts over time. This page displays a list of recorded workout sessions, showing the names of the workouts and providing users with the ability to delete entries and also redo that specific workout.

### Key Components

- **Delete Functionality**: Each entry in the workout history includes a "Delete" button, enabling users to remove specific workouts they no longer wish to keep in their history.

- **Redo Functionality**: Each past entry the user entered created the user can be able to redo it if they want fancy doing it.

### How it Works

Once you create your workout, refreshing the page will display your most recent entry in the history, complete with options to redo or delete it.

### Design 

I implemented this feature because users may sometimes forget their past activities, so having a visible record of previous workouts helps them track their progress and maintain consistency.


## Visual cues

The "Visual cues" feature in Lucky Fitness allows users to access/see the app in a different way of their choice.

### Key Components

- **Light and dark Mode**: Users can put their screen in a light and dark mode.

- **Rests with a different colour**: Users can see the rest in different colour compared to the current activity.

### How it Works

For light and dark mode, users can simply click on the sun or star icon to toggle between them. Additionally, various color options are available, allowing users to customize their display while working out.

### Design


While designing the app, I realized that light and dark modes are standard features on mobile phones, so I decided to incorporate them, recognizing their potential benefits for users. Additionally, the idea of offering different color themes stemmed from a discussion with friends. Realizing its appeal, I decided to seriously pursue and implement this feature to enhance the user experience.

## Progress Tracking

The "Progress Tracking" feature in Lucky Fitness allows users to view their progress during the entire workouts they did while using the app.

### Key Components

- **Workouts Completed**: Users can see the total workouts while being in the app.
- **Total Duration**: Users can see the total duration while being in the app.
- **Estimated Total calories burnt**: Users can see the estimated calories burnt while being on the app.

### How it Works


The process is streamlined for ease of use: simply create your HIIT session, start it, complete it, and enter your accurate weight. Your progress will automatically be displayed, allowing you to track your results effortlessly.

### Design

While designing the app, I recognized the importance of users being able to easily track their progress without confusion. This led me to conduct research and explore innovative features. Consequently, I decided to incorporate a weight-tracking functionality, considering the primary goal of this HIIT app is to help users burn fat and lose weight effectively.

## Clear Workout

The "Clear Workout" feature in Lucky Fitness allows users to clear their current workout if they don't fancy it and create a new one.
### Key Components

- **Clear Workout Button**: Users can clear the workout they created
  
### How it Works

It's easy to use: simply return to the "Customize HIIT" page and click "Clear Workout" to reset everything.

### Design


While designing the app, I acknowledged the varied preferences and moods of users, which can change frequently. To accommodate this, I added a feature allowing users to easily switch out exercises they find mundane for more engaging and challenging options. This flexibility enhances the user experience by catering to individual needs and keeping the workouts interesting.

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

    
> Prompt
