'use client';

import { useState } from 'react';
import { databases } from 'src/lib/appwrite';

const WorkoutLog = () => {
  const [workouts, setWorkouts] = useState<string[]>([]);
  const [newWorkout, setNewWorkout] = useState<string>('');
  const [userId, setUserId] = useState<string>(''); // Assume you have the user ID from authentication
  const [message, setMessage] = useState<string>('');

  const handleAddWorkout = async () => {
    if (newWorkout) {
      try {
        const date = new Date().toISOString();
        const documentId = 'unique()'; // Generate a unique ID for the document
        await databases.createDocument(
          process.env.NEXT_YOUR_APPWRITE_DATABASE_ID!, // Replace with actual database ID
          process.env.NEXT_YOUR_APPWRITE_COLLECTION_ID!, // Replace with actual collection ID
          documentId,
          {
            userId,
            date,
            workoutType: newWorkout,
            duration: 0, // Add a field for duration if needed
            steps: 0, // Add a field for steps if needed
            caloriesBurned: 0, // Add a field for calories burned if needed
          }
        );
        setWorkouts((prevWorkouts) => [...prevWorkouts, newWorkout]);
        setNewWorkout('');
        setMessage('Workout added successfully!');
      } catch (error) {
        setMessage('Failed to add workout.');
        console.error('Error adding workout:', error);
      }
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

      {message && <p>{message}</p>}

      <ul>
        {workouts.map((workout, index) => (
          <li key={index}>{workout}</li>
        ))}
      </ul>
    </div>
  );
};

export default WorkoutLog;