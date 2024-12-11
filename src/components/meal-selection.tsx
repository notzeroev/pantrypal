import { useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface MealSelectionProps {
  onChange: (meals: Record<string, string[]>) => void
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const MEALS = ['Breakfast', 'Lunch', 'Dinner']

export function MealSelection({ onChange }: MealSelectionProps) {
  const [selectedMeals, setSelectedMeals] = useState<Record<string, string[]>>(
    DAYS.reduce((acc, day) => ({ ...acc, [day.toLowerCase()]: ['lunch'] }), {})
  )

  const handleMealChange = (day: string, meal: string, isChecked: boolean) => {
    const updatedMeals = { ...selectedMeals }
    if (isChecked) {
      updatedMeals[day.toLowerCase()] = [...(updatedMeals[day.toLowerCase()] || []), meal.toLowerCase()]
    } else {
      updatedMeals[day.toLowerCase()] = updatedMeals[day.toLowerCase()].filter(m => m !== meal.toLowerCase())
    }
    setSelectedMeals(updatedMeals)
    onChange(updatedMeals)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
      {DAYS.map(day => (
        <div key={day} className="space-y-2">
          <Label className="font-bold">{day}</Label>
          <div className="flex space-x-2">
            {MEALS.map(meal => (
              <Checkbox
                key={`${day}-${meal}`}
                id={`${day}-${meal}`}
                checked={selectedMeals[day.toLowerCase()]?.includes(meal.toLowerCase())}
                onCheckedChange={(checked) => handleMealChange(day, meal, checked as boolean)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
