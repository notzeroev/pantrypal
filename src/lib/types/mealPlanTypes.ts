import { z } from 'zod';
import { IngredientSchema, MealSchema } from '@/lib/schemas/mealPlanSchema';

export type Ingredient = z.infer<typeof IngredientSchema>;
export type Meal = z.infer<typeof MealSchema>;