'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
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
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleKitchenwareChange = (value: string, isSelected: boolean) => {
    setKitchenware(prev => 
      isSelected ? [...prev, value] : prev.filter(item => item !== value)
    )
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    // Add validation check for kitchenware
    if (kitchenware.length === 0) {
      setError("Please select at least one kitchenware item")
      return
    }

    // Set loading state AFTER validation passes
    setIsLoading(true)
    setError(null)
  
    const formData = new FormData(event.currentTarget)
    const data = {
      dietary: formData.get('dietary') as string,
      kitchenware,
      budget,
      calories,
      mealPlan
    }
  
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
  
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || 'Network response was not ok')
      }
  
      const responseData = await response.json()
      
      sessionStorage.setItem('groceryPlanResults', JSON.stringify(responseData.data))
      
      // Navigate to results page
      router.push('/my-list')
    } catch (error) {
      // Handle and store error
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'An unexpected error occurred'
      
      setError(errorMessage)
      setIsLoading(false)
      console.error('Error submitting grocery plan:', error)
    }
    // Removed finally block as loading state is now managed more precisely
  }

  // Render loading state first if loading
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] space-y-4">
        <div className="animate-spin w-16 h-16 border-4 border-primary border-t-transparent rounded-full"></div>
        <p className="text-lg text-gray-600">Generating your grocery plan...</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto p-6 rounded-lg">
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
          min={1500}
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

      {error && (
        <div className="text-red-500 text-center mb-4">
          {error}
        </div>
      )}

      <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded hover:bg-primary transition-colors ease-in-out duration-300">
        Submit
      </button>
    </form>
  )
}

