'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { MealPlanViewer } from '@/components/meal-plan-viewer'

export default function ResponsePage() {
  const router = useRouter()
  const [results, setResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Ensure this runs only on client-side
    if (typeof window !== 'undefined') {
      // Retrieve results from session storage
      const storedResults = sessionStorage.getItem('groceryPlanResults')
      
      if (storedResults) {
        try {
          const parsedResults = JSON.parse(storedResults)
          
          // Optional: Validate parsed results
          if (parsedResults) {
            setResults(parsedResults)
          } else {
            setError('No valid results found')
            router.push('/')
          }
        } catch (error) {
          setError('Error parsing results')
          router.push('/')
        }
      } else {
        // If no results found, redirect back to form
        router.push('/')
      }
    }
  }, [router])

  // Loading state
  if (!results && !error) {
    return <div>Loading your grocery plan...</div>
  }

  // Error state
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={() => router.push('/')}>
          Return to Form
        </button>
      </div>
    )
  }

  // Results state
  return (
    <div>
        <main className="min-h-screen py-12">
            <MealPlanViewer data={results} />
        </main>
    </div>
  )
}