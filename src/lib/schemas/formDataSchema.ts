import { z } from 'zod';

const MealDaySchema = z.object({
    monday: z.array(z.string()),
    tuesday: z.array(z.string()),
    wednesday: z.array(z.string()),
    thursday: z.array(z.string()),
    friday: z.array(z.string()),
    saturday: z.array(z.string()),
    sunday: z.array(z.string())
  });
  
  // form data schema
  export const FormDataSchema = z.object({
    dietary: z.string(),
    kitchenware: z.array(z.string()),
    budget: z.number(),
    calories: z.number(),
    mealPlan: MealDaySchema
  });
  
  // Type inference
  export type FormData = z.infer<typeof FormDataSchema>;
