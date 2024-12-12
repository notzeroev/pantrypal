import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MealPlan } from "@/lib/schemas/mealPlanSchema"

interface MealPlanViewerProps {
  data: MealPlan
}

export function MealPlanViewer({ data }: MealPlanViewerProps) {
  return (
    <div className="space-y-8">
      <GroceryList items={data["Grocery List"].items || []} />
      <WeeklyMealPlan mealPlan={data["Meal Plan"]} />
    </div>
  )
}



function GroceryList({ items }: { items: NonNullable<MealPlan["Grocery List"]["items"]> }) {
  const totalPrice = items.reduce((sum, item) => sum + (item?.price || 0), 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Grocery List - ${totalPrice}</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Lifespan</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item?.name || 'N/A'}</TableCell>
                  <TableCell>{item?.quantity || 0}</TableCell>
                  <TableCell>{item?.lifespan || 'N/A'}</TableCell>
                  <TableCell>${item?.price || '0.00'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

function WeeklyMealPlan({ mealPlan }: { mealPlan: MealPlan["Meal Plan"] }) {
  const days = Object.keys(mealPlan)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Meal Plan</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {days.map((day) => (
            <DayMeals key={day} day={day} meals={mealPlan[day as keyof typeof mealPlan]} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function DayMeals({ day, meals }: { day: string; meals: NonNullable<MealPlan["Meal Plan"][keyof MealPlan["Meal Plan"]]> | null }) {
  if (!meals) return null

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">{day}</h3>
      <div className="grid gap-4 md:grid-cols-3">
        {Object.entries(meals).map(([mealType, meal]) => (
          <MealCard key={mealType} mealType={mealType} meal={meal} />
        ))}
      </div>
    </div>
  )
}

function MealCard({ mealType, meal }: { mealType: string; meal: NonNullable<MealPlan["Meal Plan"][keyof MealPlan["Meal Plan"]][keyof MealPlan["Meal Plan"][keyof MealPlan["Meal Plan"]]]> | null }) {
  if (!meal) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{mealType}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-semibold">{meal.dish}</p>
        <p className="text-sm text-muted-foreground">Calories: {meal.calories}</p>
        <div className="mt-2">
          <p className="text-sm font-medium">Ingredients:</p>
          <ul className="text-sm list-disc list-inside">
            {meal.ingredients?.map((ingredient, index) => (
              <li key={index}>
                {ingredient?.name || 'N/A'} - {ingredient?.quantity || 'N/A'}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

