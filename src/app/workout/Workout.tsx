"use client";

import { useState } from "react";

const WorkoutLog = () => {
  const [workouts, setWorkouts] = useState<string[]>([]);
  const [newWorkout, setNewWorkout] = useState<string>("");

  const handleAddWorkout = () => {
    if (newWorkout) {
      setWorkouts((prevWorkouts) => [...prevWorkouts, newWorkout]);
      setNewWorkout("");
    }
  };

  return (
    <div>
      <h2>Log Your Workout</h2>
      <input
        type="text"
        value={newWorkout}
        onChange={(e) => setNewWorkout(e.target.value)}
        placeholder="Enter your workout"
      />
      <button onClick={handleAddWorkout}>Add Workout</button>
      <ul>
        {workouts.map((workout, index) => (
          <li key={index}>{workout}</li>
        ))}
      </ul>
    </div>
  );
};

export default WorkoutLog;