import axios from 'axios';

export const getNutritionInfo = async (query: string) => {
  const apiKey = process.env.NEXT_PUBLIC_CALORIE_YOUR_API_KEY! // Replace with your actual API key
  const url = `https://api.calorieninjas.com/v1/nutrition?query=${query}`;
  const headers = {
    'X-Api-Key': apiKey,
  };

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching nutrition info:', error);
    throw error;
  }
};