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
    npm install express
    ```

3. Start the application:
    ```bash
    npm start

4. Open any Selected web browser of your choice and visit [http://localhost:8080/](http://localhost:8080/) to view the app.
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
8. Put the time 
9. Select the Instructions

# Description of the Features
1. History: The "History" feature allows users to keep track of their exercise routines over time. This page displays a list of recorded workout sessions, showing the names of the workouts and providing users with the ability to delete entries.

### Key Components

- **Display**: The workout history is presented in a clean and organized manner, making it easy for users to review their past fitness activities.

- **Delete Functionality**: Each entry in the workout history includes a "Delete" button, enabling users to remove specific workouts they no longer wish to keep in their history.

### How it Works

1. **Retrieval from Local Storage**: The app retrieves workout history data from the local storage, ensuring that users can access their previously recorded sessions even when they revisit the page or reload the app.

2. **Dynamic Rendering**: The workout history list is dynamically rendered on the page, allowing for seamless updates whenever a new workout is added or an existing one is deleted.

3. **User Interaction**: Users can interact with the "Delete" button next to each workout entry to remove specific workouts from their history.

