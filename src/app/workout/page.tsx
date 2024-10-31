'use client';
import { useState } from 'react';
import { databases } from 'src/lib/appwrite';
import '../../styles/globals.css';

const WorkoutLog = () => {
  const [workouts, setWorkouts] = useState<string[]>([]);
  const [newWorkout, setNewWorkout] = useState<string>('');
  const [userId, setUserId] = useState<string>(''); // Assume you have the user ID from authentication
  const [message, setMessage] = useState<string>('');

  const handleAddWorkout = async () => {
    if (newWorkout) {
      try {
        const date = new Date().toISOString();
        await databases.createDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!, 
          process.env.NEXT_PUBLIC_APPWRITE_WORKOUTS_COLLECTION_ID!, 
          'unique()', // Use 'unique()' for automatic ID
          {
            userId,
            date,
            workoutType: newWorkout,
            duration: 0,
            steps: 0,
            caloriesBurned: 0,
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gradientStart via-gradientMiddle to-gradientEnd text-white">
      <header className="text-center py-10 w-full animate-slideIn">
        <h2 className="text-4xl font-bold mb-4">Log Your Workout</h2>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center w-full px-4">
        <div className="text-center mb-10 animate-fadeIn">
          <input
            type="text"
            value={newWorkout}
            onChange={(e) => setNewWorkout(e.target.value)}
            placeholder="Enter your workout"
            className="mb-4 p-2 rounded-md text-black"
          />
          <button 
            onClick={handleAddWorkout} 
            className="bg-white text-primary py-2 px-6 rounded-full shadow-lg hover:bg-gray-100 transition transform hover:scale-105"
          >
            Add Workout
          </button>
          {message && <p className="mt-4">{message}</p>}
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-5xl animate-fadeIn">
          {workouts.map((workout, index) => (
            <li 
              key={index} 
              className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition transform hover:-translate-y-1 text-primary"
            >
              {workout}
            </li>
          ))}
        </ul>
      </main>
      <footer className="py-4 w-full text-center bg-gradient-to-r from-gradientStart via-gradientMiddle to-gradientEnd">
        <p className="text-white">&copy; 2024 Fitness Tracker & Wellness Journal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default WorkoutLog;