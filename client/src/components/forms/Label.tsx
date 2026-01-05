import { LabelHTMLAttributes } from "react"

type Props = {
  label: string
  className?: string
} & LabelHTMLAttributes<HTMLLabelElement>

export function Label({ className = "", label, ...props }: Props) {
  return (
    <label
      className={`block text-sm font-semibold mb-2 ${className}`}
      {...props}
    >
      {label}
    </label>
  )
}
