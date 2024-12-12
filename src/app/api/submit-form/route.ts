import { NextResponse } from "next/server"
import { groq } from '@ai-sdk/groq';
import { generateObject, generateText } from 'ai';
import { MealPlanSchema } from '@/lib/schemas';
import { systemPrompt, groceryListPrompt, staticResponse } from '@/lib/prompts/pantryPrompts';

export async function POST(request: Request) {
    try {
        // Parse incoming request data
        const data = await request.json(); 

        // //testing with synthetic data
        // await new Promise(resolve => setTimeout(resolve, 2000));
        
        // // Parse the static data string into a JSON object
        // const parsedStaticData = JSON.parse(staticResponse)

        // return NextResponse.json({
        //     error: false,
        //     data: parsedStaticData
        // }, { status: 200 });


        if (!data) {
            return NextResponse.json({
                error: true,
                message: "No data received in the request"
            }, { status: 400 });
        }

        try {
            // Attempt to generate object
            const { object } = await generateObject({
                model: groq('mixtral-8x7b-32768'),
                system: systemPrompt,
                prompt: groceryListPrompt(data),
                schema: MealPlanSchema
            });

            return NextResponse.json({
                error: false,
                data: object
            }, { status: 200 });

        } catch (generateError) {
            console.error('Generation Error:', generateError);
            return NextResponse.json({
                error: true,
                message: "Error generating meal plan",
                details: generateError instanceof Error ? generateError.message : String(generateError)
            }, { status: 500 });
        }

    } catch (error) {
        console.error('Unhandled API Error:', error);
        return NextResponse.json({
            error: true,
            message: "Internal server error",
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}