import { z } from 'zod';

// Schema for a single ingredient
export const IngredientSchema = z.object({
  name: z.string(),
  quantity: z.string()
});

// Schema for a single meal - now optional
export const MealSchema = z.object({
  dish: z.string(),
  calories: z.number(),
  ingredients: z.array(IngredientSchema)
}).nullable().optional();

// Schema for a single day's meals - now optional
export const DayMealsSchema = z.object({
  Breakfast: MealSchema,
  Lunch: MealSchema,
  Dinner: MealSchema
}).nullable().optional();

// Schema for grocery list item
export const GroceryItemSchema = z.object({
  name: z.string(),
  quantity: z.string(),
  lifespan: z.string(),
  price: z.number()
});

// Complete Meal Plan Schema
export const MealPlanSchema = z.object({
  'Grocery List': z.object({
    items: z.array(GroceryItemSchema)
  }),
  'Meal Plan': z.object({
    Monday: DayMealsSchema,
    Tuesday: DayMealsSchema,
    Wednesday: DayMealsSchema,
    Thursday: DayMealsSchema,
    Friday: DayMealsSchema,
    Saturday: DayMealsSchema,
    Sunday: DayMealsSchema
  })
});

// Type inference
export type MealPlan = z.infer<typeof MealPlanSchema>;