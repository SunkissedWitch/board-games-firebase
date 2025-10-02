import { useId, useState, type ComponentProps } from "react"
import type { ErrorOption } from "react-hook-form"

type NativeInputProps = ComponentProps<"input">

interface ComboBoxProps<T> extends Omit<NativeInputProps, "value" | "onChange"> {
  label?: string
  options: T[]
  getOptionLabel: (option: T) => string
  getOptionDescription?: (option: T) => string
  onChange?: (value: T | null) => void
  value?: T | null
  onQueryChange?: (q: string) => void
  loading?: boolean
  error?: ErrorOption
}

export const ComboBox = <T,>({
  label,
  options,
  getOptionLabel,
  getOptionDescription,
  onChange,
  value,
  onQueryChange,
  loading,
  placeholder = "Search...",
  error,
  ...props
}: ComboBoxProps<T>) => {
  const [query, setQuery] = useState<string>("")

  const id = useId()

  const handleQueryChange = (q: string) => {
    setQuery(q)
    onQueryChange?.(q)
  }

  return (
    <fieldset className='fieldset'>
      {label && (
        <label className='label' htmlFor={id}>
          {label}
        </label>
      )}

      <div className='dropdown w-full'>
        <input
          id={id}
          type='text'
          placeholder={placeholder}
          className='input input-bordered w-full'
          value={value ? getOptionLabel(value) : query}
          onChange={(e) => {
            handleQueryChange(e.target.value)
            onChange?.(null)
          }}
          onFocus={() => onChange?.(null)}
          {...props}
        />

        <ul className='dropdown-content menu menu-xs flex-nowrap bg-base-100 rounded-field z-1 w-full p-1 shadow max-h-60 overflow-y-auto'>
          {loading ? (
            <li>
              <div>Loading...</div>
            </li>
          ) : options.length > 0 ? (
            options.map((item, idx) => {
              const description = getOptionDescription?.(item) || ""
              return (
                <li key={idx}>
                  <button
                    type='button'
                    onClick={(e) => {
                      onChange?.(item)
                      e.currentTarget.blur()
                    }}
                    className='grid grid-flow-row-dense auto-rows-max gap-0'
                  >
                    <span className='text-sm'>{getOptionLabel(item)}</span>
                    {description.length > 0 && <span className='text-current/70'>{description}</span>}
                  </button>
                </li>
              )
            })
          ) : (
            <li className='opacity-60 italic'>
              <span>{query.length >= 3 ? "No results" : "Start typing to search..."}</span>
            </li>
          )}
        </ul>
      </div>
      {error && error.message && (
        <label htmlFor={id} className='label text-xs text-error'>
          {error.message}
        </label>
      )}
    </fieldset>
  )
}
