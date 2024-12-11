'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ToggleButton } from "./toggle-button"
import { MealSelection } from "./meal-selection"

export function GroceryForm() {
  const [kitchenware, setKitchenware] = useState<string[]>([])
  const [calories, setCalories] = useState(2000)
  const [mealPlan, setMealPlan] = useState<Record<string, string[]>>({})
  const [budget, setBudget] = useState(50)

  const handleKitchenwareChange = (value: string, isSelected: boolean) => {
    setKitchenware(prev => 
      isSelected ? [...prev, value] : prev.filter(item => item !== value)
    )
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = {
      dietary: formData.get('dietary') as string,
      kitchenware,
      budget,
      calories,
      mealPlan
    }
    // Handle form submission here
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div>
        <Label htmlFor="budget">My budget for the week is</Label>
        <Slider
          id="budget"
          min={20}
          max={300}
          step={10}
          value={[budget]}
          onValueChange={(value) => setBudget(value[0])}
        />
        <div className="text-center mt-2">${budget}</div>
      </div>

      <div>
        <Label htmlFor="calories">Select your calorie goal</Label>
        <Slider
          id="calories"
          min={1000}
          max={4000}
          step={100}
          value={[calories]}
          onValueChange={(value) => setCalories(value[0])}
        />
        <div className="text-center mt-2">{calories} calories</div>
      </div>

      <div>
        <Label>Select the meals you want to include in the plan (Breakfast, Lunch, Dinner)</Label>
        <MealSelection onChange={setMealPlan} />
      </div>

      <div>
        <Label>Select your kitchenware</Label>
        <div className="flex flex-wrap -m-1">
          {['Oven', 'Stove', 'Microwave', 'Blender', 'Rice Cooker', 'Air Fryer'].map((item) => (
            <ToggleButton 
              key={item} 
              value={item.toLowerCase().replace(' ', '_')} 
              label={item} 
              onChange={handleKitchenwareChange}
            />
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="dietary">Enter your dietary restrictions</Label>
        <Input id="dietary" name="dietary" placeholder="E.g., vegetarian, gluten-free, no nuts" />
      </div>

      <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
        Submit
      </button>
    </form>
  )
}

