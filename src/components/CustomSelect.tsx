import { SelectHTMLAttributes } from "react"

interface Option {
  label: string
  value: string | number
}

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: Option[]
  className?: string
}

const CustomSelect = ({ options, name, label, className, ...props }: Props) => {
  return (
    <div className="flex items-center justify-center bg-amber-200 rounded-full pr-2">
      <label htmlFor={name} className="w-34 h-12 flex items-center justify-end pr-3">
        {label}:
      </label>
      <select
        {...props}
        name={name}
        id={name}
        className={`appearance-none relative w-48 px-4 py-1 my-2 pr-10 rounded-full bg-white ${className}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="relative">
        <span className="text-xs text-amber-600 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          ▼
        </span>
      </div>
    </div>
  )
}

export default CustomSelect
