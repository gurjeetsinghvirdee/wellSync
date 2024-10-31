const API_KEY = process.env.NEXT_YOUR_USDA_API_KEY!;

export const getNutritionInfo = async (food: string) => {
    try {
        const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${API_KEY}&query=${food}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching nutrition info: ', error);
        throw new Error('Error fetching nutrition info');
    }
};