import axios from 'axios';

export interface FoodProduct {
  name: string;
  calories: number; // per 100g or serving
  protein_g: number;
  carbs_g: number;
  fat_g: number;
}

export async function lookupBarcode(barcode: string): Promise<FoodProduct | null> {
  try {
    const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
    
    if (response.data.status !== 1) {
      return null;
    }

    const { product } = response.data;
    const nutriments = product.nutriments || {};

    const name = product.product_name || product.generic_name || 'Unknown Food';
    
    // Getting per 100g or serving as fallback.
    // Calorie values can be in kcals or kj.
    const energy = nutriments['energy-kcal_100g'] || nutriments['energy-kcal_serving'] || nutriments['energy_100g'] / 4.184 || 0;
    const protein = nutriments['proteins_100g'] || nutriments['proteins_serving'] || 0;
    const carbs = nutriments['carbohydrates_100g'] || nutriments['carbohydrates_serving'] || 0;
    const fat = nutriments['fat_100g'] || nutriments['fat_serving'] || 0;

    return {
      name,
      calories: Math.round(energy),
      protein_g: Math.round(protein),
      carbs_g: Math.round(carbs),
      fat_g: Math.round(fat),
    };
  } catch (error) {
    console.error('Barcode lookup failed:', error);
    return null;
  }
}
