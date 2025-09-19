import { useId, useState } from "react"

interface ComboBoxProps<T> {
  label?: string
  options: T[]
  getOptionLabel: (option: T) => string
  getOptionDescription: (option: T) => string
  onChange?: (value: T | null) => void
  value?: T | null
  onQueryChange?: (q: string) => void
  loading?: boolean
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
}: ComboBoxProps<T>) => {
  const [query, setQuery] = useState<string>("")

  const id = useId()

  const handleQueryChange = (q: string) => {
    setQuery(q)
    onQueryChange?.(q)
  }

  return (
    <div className='flex flex-col gap-1 min-w-64'>
      {label && (
        <label className='label' htmlFor={id}>
          {label}
        </label>
      )}

      <div className='dropdown w-full'>
        <input
          id={id}
          type='text'
          placeholder='Search...'
          className='input input-bordered w-full'
          value={value ? getOptionLabel(value) : query}
          onChange={(e) => {
            handleQueryChange(e.target.value)
            onChange?.(null)
          }}
          onFocus={() => onChange?.(null)}
        />

        <ul className='dropdown-content menu menu-xs flex-nowrap bg-base-100 rounded-field z-1 w-full p-1 shadow max-h-60 overflow-y-auto'>
          {loading ? (
            <li>
              <div>Loading...</div>
            </li>
          ) : options.length > 0 ? (
            options.map((item, idx) => (
              <li key={idx}>
                <button
                  type='button'
                  onClick={() => onChange?.(item)}
                  className='grid grid-flow-row-dense auto-rows-max gap-0'
                >
                  <span className='text-sm'>{getOptionLabel(item)}</span>
                  <span className='text-current/70'>{getOptionDescription(item)}</span>
                </button>
              </li>
            ))
          ) : (
            <li className='disabled'>
              <span>No results</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}
