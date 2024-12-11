import { useState } from 'react'
import { Button } from "@/components/ui/button"

interface ToggleButtonProps {
  value: string
  label: string
  onChange: (value: string, isSelected: boolean) => void
  isSelected?: boolean
}

export function ToggleButton({ value, label, onChange, isSelected = false }: ToggleButtonProps) {
  const [selected, setSelected] = useState(isSelected)

  const handleClick = () => {
    const newState = !selected
    setSelected(newState)
    onChange(value, newState)
  }

  return (
    <Button
      type="button"
      variant={selected ? "default" : "outline"}
      onClick={handleClick}
      className="m-1"
    >
      {label}
    </Button>
  )
}

