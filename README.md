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

1. History
2. Vault
3. Starting the Workout
4. Adding the Workout
5. Create the Name of your selected Workout
6. Selecting the time of your choice
7. Start,Reset,Stop the timer 
8. Select the Instructions

# Description of the Features

## History Feature
The "History" feature allows users to keep track of their exercise routines over time. This page displays a list of recorded workout sessions, showing the names of the workouts and providing users with the ability to delete entries.

### Key Components

- **Display**: The workout history is presented in a clean and organized manner, making it easy for users to review their past fitness activities.

- **Delete Functionality**: Each entry in the workout history includes a "Delete" button, enabling users to remove specific workouts they no longer wish to keep in their history.

### How it Works

1. **Retrieval from Local Storage**: The app retrieves workout history data from the local storage, ensuring that users can access their previously recorded sessions even when they revisit the page or reload the app.

2. **Dynamic Rendering**: The workout history list is dynamically rendered on the page, allowing for seamless updates whenever a new workout is added or an existing one is deleted.

3. **User Interaction**: Users can interact with the "Delete" button next to each workout entry to remove specific workouts from their history.

## Vault Feature

The "Vault" feature in Lucky Fitness allows users to manage and customize their exercise routines by adding specific exercises to their personal vault. Users can also create personalized HIIT (High-Intensity Interval Training) workouts by selecting exercises from their vault. Additionally, users have the option to start their workouts directly from this feature.

### Key Components

- **Display**: The added exercises are presented in a clean and organized manner, providing essential details such as exercise title, description, duration, category, and required equipment.

- **Interaction**: Users can click on individual exercises to select them for their personalized workouts.

- **Create Workout**: The feature allows users to create a customized workout by providing a workout name.

- **Start Workout**: Users can initiate their workouts directly from the "Vault" feature.

### How it Works

1. **View Added Exercises**: The app retrieves added exercises from the local storage and dynamically displays them in workout boxes.

2. **Create Workout Box**: Each exercise is represented as a workout box, showing key details like title, description, duration, category, and required equipment.

3. **User Interaction**: Users can click on a workout box to select an exercise for their personalized workout.

4. **Create Workout**: The "Create HIIT" button allows users to input a workout name, adding a personal touch to their fitness routines.

5. **Start Workout**: The "Start Workout" button initiates the workout, redirecting users to the main timer page.

## Starting the Workout Feature

The "Starting the Workout" feature in Lucky Fitness allows users to initiate their exercise routines using a flexible and customizable timer. Users have the option to start individual exercises with specific durations or commence a general workout directly from the "Vault" page.

### Key Components

- **Individual Exercise Start**: Users can start each exercise individually with customized durations.

- **General Workout Start**: Users have the option to start a general workout directly from the "Vault" page, where a pre-defined sequence of exercises will be executed.

- **Timer Display**: The app provides a clear and user-friendly timer display during workouts.

### How it Works

1. **Individual Exercise Start**: Users can click on a specific exercise in the "Vault" feature to start it individually. The timer will run for the specified duration of that exercise.

2. **General Workout Start**: Users can click the "Start Workout" button on the "Vault" page to initiate a general workout. The app will guide users through a pre-defined sequence of exercises, displaying the timer for each.

3. **Timer Display**: During both individual and general workout sessions, a timer is prominently displayed, allowing users to track their progress.

## Selecting the Time of Your Choice Feature

The "Selecting the Time of Your Choice" feature in Lucky Fitness allows users to customize their workout durations using a flexible time input. Users can set the duration for individual exercises or workout sessions, providing a tailored experience based on their preferences.

### Key Components

- **Time Input**: Users can input their desired workout duration in the format HH:MM:SS.

- **Validation**: The app validates user input to ensure it follows the correct time format (HH:MM:SS).

- **Start Button**: Initiates the timer based on the user's selected time.

### How it Works

1. **Time Input**: Users enter the desired workout duration in the input field provided.

2. **Validation**: The app checks the input for correct time format compliance (HH:MM:SS).

3. **Start Button**: Clicking the "Start" button initiates the timer for the specified duration.

### Navigation

- The bottom navigation bar includes buttons for quick access to other app features such as "History," "Home," and "MyVault."

## Start, Reset, Stop the Timer Feature

The "Start, Reset, Stop the Timer" feature in Lucky Fitness enhances the user's control during workouts. Users can initiate, reset, and stop the timer as needed, providing a more dynamic and interactive workout experience.

### Key Components

- **Start Button**: Begins the timer based on the selected workout duration.

- **Stop Button**: Halts the ongoing timer, allowing users to pause their workout.

- **Reset Button**: Clears the timer and resets it to the initial state.

### How it Works

1. **Start Button**: Users click the "Start" button to initiate the timer based on the selected workout duration.

2. **Stop Button**: Clicking the "Stop" button halts the ongoing timer, allowing users to pause their workout.

3. **Reset Button**: The "Reset" button clears the timer, resetting it to the initial state.

## Select the Instructions Feature

The "Select the Instructions" feature in Lucky Fitness allows users to access and view detailed instructions for each exercise stored in their personal vault. Users can select an exercise from their vault, and the app will display step-by-step instructions to guide them through the workout.

### Key Components

- **MyVault Area**: Users can navigate to the "MyVault" area of the app to access their stored exercises.

- **Exercise Selection**: Users can select a specific exercise from their vault to view detailed instructions.

- **Step-by-Step Guidance**: The app provides step-by-step instructions for each selected exercise, aiding users in performing the workout correctly.

### How it Works

1. **Navigate to MyVault**: Users go to the "MyVault" area within the app.

2. **Exercise Selection**: Within the "MyVault," users can see a list of their stored exercises. Clicking on a specific exercise will open detailed instructions.

3. **Step-by-Step Guidance**: The app displays clear and concise step-by-step instructions for the selected exercise, ensuring users perform the workout correctly.

---

later i plan to reference the gifs and talk where i got the idea