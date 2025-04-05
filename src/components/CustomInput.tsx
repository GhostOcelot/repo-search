import { InputHTMLAttributes } from "react"

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  delay?: number
}

const DebouncedInput = ({ label, delay, ...props }: Props) => {
  return (
    <div className="flex items-center justify-center bg-amber-200 rounded-full pr-2">
      {label && (
        <label htmlFor="search-phrase" className="w-34 h-12 flex items-center justify-end pr-3">
          {label}:
        </label>
      )}
      <input
        {...props}
        name={props.id || ""}
        id={props.id || ""}
        className="w-48 px-4 py-1 my-2 rounded-full bg-cyan-50"
      ></input>
    </div>
  )
}

export default DebouncedInput
