import { FormData } from '@/lib/schemas';

export const systemPrompt = 
  `You are a smart grocery assistant with many years of experience advising students on what groceries to buy.` + 
  `Your meals plans minimise wastage and cooking time, but you will try to maintain falvour and variety, as much as the guidelines allow you to.`;

export function groceryListPrompt(data: FormData): string{
    return `A user has grocery list requested a meal plan.` + 

      `They have some guidelines (DO NOT compromise on these guidelines):` +
      `Dietary Requirement: ${data.dietary} Australian Dollars.` +
      `User has a weekly budget of ${data.budget}.` + `Total amount for groceries should be less than this.` +
      `User only has access to ${data.kitchenware.join(', ')}; ` + `DO NOT suggest any recipes that use other appliances.` +
      `User has a daily calorie target of ${data.calories}+-200 calories.\n` +
      
      `This specifies the days you need to plan for:
      ${Object.entries(data.mealPlan).map(([day, meals]) => 
        `- ${day.charAt(0).toUpperCase() + day.slice(1)}: ${
          meals.length > 0 
            ? `${meals.join(', ')}` 
            : 'Do not plan meals'
        }`
      ).join('\n')}` +
      `\n` +
      `The user has no ingredients to begin with. Do not mention ingredients outside of the grocery list you provide, no matter how common the ingredient may be.` +
      `For example you should NOT use lemon juice in a recipe if there are no lemons in the grocery list.` +
      `The user is based in Sydney, Australia. Use pricing data for this area.` +
      `Avoid having the exact same meal 2 days in a row.` +
      `Based on all the aforementioned requirements (which YOU MUST ABIDE TO), generate a detailed grocery list and meal plan.` +
      `Mention prices of ingredients to 2 decimal places in Australian dollars.`  +
      `Ensure amounts and measurement units are consistent with cooking guides on the internet.` +
      `When mentioning the lifespan also mention where it can be stored, eg. 	"1 week in the fridge"` +
      `You will return the data in the schema mentioned.`;
  }

  //temp
  export const staticResponse = `{
    "Grocery List": {
      "items": [
        {
          "name": "Brown Rice",
          "quantity": 2,
          "lifespan": "1 week",
          "price": "3"
        },
        {
          "name": "Quinoa",
          "quantity": 1,
          "lifespan": "2 weeks",
          "price": "4"
        },
        {
          "name": "Canned Black Beans",
          "quantity": 2,
          "lifespan": "6 months",
          "price": "4"
        },
        {
          "name": "Canned Tomatoes",
          "quantity": 2,
          "lifespan": "6 months",
          "price": "4"
        },
        {
          "name": "Frozen Mixed Vegetables",
          "quantity": 1,
          "lifespan": "3 months",
          "price": "3"
        },
        {
          "name": "Halal Chicken Breast",
          "quantity": 2,
          "lifespan": "1 week",
          "price": "10"
        },
        {
          "name": "Halal Ground Beef",
          "quantity": 1,
          "lifespan": "1 week",
          "price": "6"
        },
        {
          "name": "Olive Oil",
          "quantity": 1,
          "lifespan": "2 months",
          "price": "5"
        },
        {
          "name": "Salt",
          "quantity": 1,
          "lifespan": "6 months",
          "price": "1"
        },
        {
          "name": "Pepper",
          "quantity": 1,
          "lifespan": "6 months",
          "price": "1"
        },
        {
          "name": "Onions",
          "quantity": 2,
          "lifespan": "1 week",
          "price": "2"
        },
        {
          "name": "Carrots",
          "quantity": 2,
          "lifespan": "1 week",
          "price": "2"
        },
        {
          "name": "Apples",
          "quantity": 4,
          "lifespan": "1 week",
          "price": "4"
        },
        {
          "name": "Bananas",
          "quantity": 6,
          "lifespan": "1 week",
          "price": "2"
        },
        {
          "name": "Eggs",
          "quantity": 6,
          "lifespan": "1 week",
          "price": "3"
        }
      ]
    },
    "Meal Plan": {
      "Monday": {
        "Breakfast": {
          "dish": "Scrambled Eggs with Toast",
          "calories": 300,
          "ingredients": [
            {
              "name": "Eggs",
              "amount": "2"
            },
            {
              "name": "Bread",
              "amount": "2 slices"
            }
          ]
        },
        "Lunch": {
          "dish": "Grilled Chicken with Rice and Vegetables",
          "calories": 500,
          "ingredients": [
            {
              "name": "Halal Chicken Breast",
              "amount": "1 breast"
            },
            {
              "name": "Brown Rice",
              "amount": "1 cup"
            },
            {
              "name": "Mixed Vegetables",
              "amount": "1 cup"
            }
          ]
        },
        "Dinner": {
          "dish": "Beef and Vegetable Stir-Fry",
          "calories": 600,
          "ingredients": [
            {
              "name": "Halal Ground Beef",
              "amount": "1/2 cup"
            },
            {
              "name": "Mixed Vegetables",
              "amount": "1 cup"
            },
            {
              "name": "Olive Oil",
              "amount": "1 tablespoon"
            }
          ]
        }
      },
      "Tuesday": {
        "Breakfast": {
          "dish": "Oatmeal with Banana and Honey",
          "calories": 350,
          "ingredients": [
            {
              "name": "Oats",
              "amount": "1 cup"
            },
            {
              "name": "Banana",
              "amount": "1"
            },
            {
              "name": "Honey",
              "amount": "1 tablespoon"
            }
          ]
        },
        "Lunch": {
          "dish": "Chicken and Rice Bowl",
          "calories": 550,
          "ingredients": [
            {
              "name": "Halal Chicken Breast",
              "amount": "1 breast"
            },
            {
              "name": "Brown Rice",
              "amount": "1 cup"
            },
            {
              "name": "Mixed Vegetables",
              "amount": "1 cup"
            }
          ]
        },
        "Dinner": {
          "dish": "Black Bean and Vegetable Soup",
          "calories": 500,
          "ingredients": [
            {
              "name": "Canned Black Beans",
              "amount": "1 can"
            },
            {
              "name": "Mixed Vegetables",
              "amount": "1 cup"
            },
            {
              "name": "Olive Oil",
              "amount": "1 tablespoon"
            }
          ]
        }
      },
      "Wednesday": {
        "Breakfast": {
          "dish": "Yogurt with Apple and Granola",
          "calories": 300,
          "ingredients": [
            {
              "name": "Yogurt",
              "amount": "1 cup"
            },
            {
              "name": "Apple",
              "amount": "1"
            },
            {
              "name": "Granola",
              "amount": "1/4 cup"
            }
          ]
        },
        "Lunch": {
          "dish": "Grilled Chicken Wrap",
          "calories": 500,
          "ingredients": [
            {
              "name": "Halal Chicken Breast",
              "amount": "1 breast"
            },
            {
              "name": "Tortilla",
              "amount": "1"
            },
            {
              "name": "Mixed Vegetables",
              "amount": "1 cup"
            }
          ]
        },
        "Dinner": {
          "dish": "Beef and Vegetable Stir-Fry",
          "calories": 600,
          "ingredients": [
            {
              "name": "Halal Ground Beef",
              "amount": "1/2 cup"
            },
            {
              "name": "Mixed Vegetables",
              "amount": "1 cup"
            },
            {
              "name": "Olive Oil",
              "amount": "1 tablespoon"
            }
          ]
        }
      },
      "Thursday": {
        "Breakfast": {
          "dish": "Scrambled Eggs with Toast",
          "calories": 300,
          "ingredients": [
            {
              "name": "Eggs",
              "amount": "2"
            },
            {
              "name": "Bread",
              "amount": "2 slices"
            }
          ]
        },
        "Lunch": {
          "dish": "Chicken and Rice Bowl",
          "calories": 550,
          "ingredients": [
            {
              "name": "Halal Chicken Breast",
              "amount": "1 breast"
            },
            {
              "name": "Brown Rice",
              "amount": "1 cup"
            },
            {
              "name": "Mixed Vegetables",
              "amount": "1 cup"
            }
          ]
        },
        "Dinner": {
          "dish": "Black Bean and Vegetable Soup",
          "calories": 500,
          "ingredients": [
            {
              "name": "Canned Black Beans",
              "amount": "1 can"
            },
            {
              "name": "Mixed Vegetables",
              "amount": "1 cup"
            },
            {
              "name": "Olive Oil",
              "amount": "1 tablespoon"
            }
          ]
        }
      },
      "Friday": {
        "Breakfast": {
          "dish": "Oatmeal with Banana and Honey",
          "calories": 350,
          "ingredients": [
            {
              "name": "Oats",
              "amount": "1 cup"
            },
            {
              "name": "Banana",
              "amount": "1"
            },
            {
              "name": "Honey",
              "amount": "1 tablespoon"
            }
          ]
        },
        "Lunch": {
          "dish": "Grilled Chicken Wrap",
          "calories": 500,
          "ingredients": [
            {
              "name": "Halal Chicken Breast",
              "amount": "1 breast"
            },
            {
              "name": "Tortilla",
              "amount": "1"
            },
            {
              "name": "Mixed Vegetables",
              "amount": "1 cup"
            }
          ]
        },
        "Dinner": {
          "dish": "Beef and Vegetable Stir-Fry",
          "calories": 600,
          "ingredients": [
            {
              "name": "Halal Ground Beef",
              "amount": "1/2 cup"
            },
            {
              "name": "Mixed Vegetables",
              "amount": "1 cup"
            },
            {
              "name": "Olive Oil",
              "amount": "1 tablespoon"
            }
          ]
        }
      },
      "Saturday": {
        "Breakfast": {
          "dish": "Yogurt with Apple and Granola",
          "calories": 300,
          "ingredients": [
            {
              "name": "Yogurt",
              "amount": "1 cup"
            },
            {
              "name": "Apple",
              "amount": "1"
            },
            {
              "name": "Granola",
              "amount": "1/4 cup"
            }
          ]
        },
        "Lunch": {
          "dish": "Chicken and Rice Bowl",
          "calories": 550,
          "ingredients": [
            {
              "name": "Halal Chicken Breast",
              "amount": "1 breast"
            },
            {
              "name": "Brown Rice",
              "amount": "1 cup"
            },
            {
              "name": "Mixed Vegetables",
              "amount": "1 cup"
            }
          ]
        },
        "Dinner": {
          "dish": "Black Bean and Vegetable Soup",
          "calories": 500,
          "ingredients": [
            {
              "name": "Canned Black Beans",
              "amount": "1 can"
            },
            {
              "name": "Mixed Vegetables",
              "amount": "1 cup"
            },
            {
              "name": "Olive Oil",
              "amount": "1 tablespoon"
            }
          ]
        }
      },
      "Sunday": null
    }
  }`;