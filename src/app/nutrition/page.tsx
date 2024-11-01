'use client';
import { useState } from 'react';
import { getNutritionInfo } from 'src/lib/nutrition';
import 'src/styles/globals.css';

const MealLog = () => {
  const [meals, setMeals] = useState<string[]>([]);
  const [newMeal, setNewMeal] = useState<string>('');
  const [nutritionInfo, setNutritionInfo] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const handleAddMeal = async () => {
    if (newMeal) {
      setMeals([...meals, newMeal]);
      try {
        const info = await getNutritionInfo(newMeal);
        setNutritionInfo(info);
        setError(''); // Clear previous errors
      } catch (error) {
        console.error('Error fetching nutrition info', error);
        setError('Failed to fetch nutrition information. Please try again.');
      }
      setNewMeal('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800">
      <header className="text-center py-10 w-full animate-slideIn border-b border-gray-300">
        <h2 className="text-4xl font-bold mb-4 text-pink-600">Log Your Meal</h2>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center w-full px-4">
        <div className="text-center mb-10 animate-fadeIn">
          <input
            type="text"
            value={newMeal}
            onChange={(e) => setNewMeal(e.target.value)}
            placeholder="Enter your meal"
            className="mb-4 p-2 rounded-md text-black w-full border border-pink-200"
          />
          <button
            onClick={handleAddMeal}
            className="bg-pink-600 text-white py-2 px-6 rounded-full shadow-lg hover:bg-pink-700 transition transform hover:scale-105"
          >
            Add Meal
          </button>
          {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-5xl animate-fadeIn">
          {meals.map((meal, index) => (
            <li 
              key={index} 
              className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition transform hover:-translate-y-1 border border-pink-200 text-primary"
            >
              {meal}
            </li>
          ))}
        </ul>
        {nutritionInfo && (
          <div className="mt-10 bg-white p-6 shadow-md rounded-lg border border-pink-200">
            <h3 className="text-3xl font-bold mb-4 text-pink-600">Nutrition Information</h3>
            {nutritionInfo.foods && nutritionInfo.foods.length > 0 && (
              <div>
                <p><strong>Name:</strong> {nutritionInfo.foods[0].description}</p>
                <p><strong>Calories:</strong> {nutritionInfo.foods[0].foodNutrients.find(nutrient => nutrient.nutrientName === "Energy").value} kcal</p>
                <p><strong>Protein:</strong> {nutritionInfo.foods[0].foodNutrients.find(nutrient => nutrient.nutrientName === "Protein").value} g</p>
                <p><strong>Fat:</strong> {nutritionInfo.foods[0].foodNutrients.find(nutrient => nutrient.nutrientName === "Total lipid (fat)").value} g</p>
                <p><strong>Carbohydrates:</strong> {nutritionInfo.foods[0].foodNutrients.find(nutrient => nutrient.nutrientName === "Carbohydrate, by difference").value} g</p>
              </div>
            )}
          </div>
        )}
      </main>
      <footer className="py-4 w-full text-center bg-pink-600">
        <p className="text-white">&copy; 2024 Fitness Tracker & Wellness Journal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MealLog;