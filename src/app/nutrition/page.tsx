"use client";

import { useState } from "react";
import { getNutritionInfo } from "src/lib/nutrition";

const MealLog = () => {
    const [meals, setMeals] = useState<string[]>([]);
    const [newMeal, setNewMeal] = useState<string>('');
    const [nutritionInfo, setNutritionInfo] = useState<any>(null);

    const handleAddMeal = async () => {
        if (newMeal) {
            setMeals([...meals, newMeal]);
            try {
                const info = await getNutritionInfo(newMeal);
                setNutritionInfo(info);
            } catch (error) {
                console.error('Error fetching nutrition info', error);
            }
            setNewMeal('');
        }
    };

    return (
        <div>
            <h2>Log Your Meal</h2>
            <input 
                type="text"
                value={newMeal}
                onChange={(e) => setNewMeal(e.target.value)}
                placeholder='Enter your meal'
            />
            <button onClick={handleAddMeal}>
                Add Meal
            </button>

            <ul>
                {meals.map((meal, index) => (
                    <li key={index}>{meal}</li>
                ))}
            </ul>

            {nutritionInfo && (
                <div>
                    <h3>Nutrition Information</h3>
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
        </div>
    );
};

export default MealLog;