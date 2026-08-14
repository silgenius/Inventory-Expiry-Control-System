import { forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'

const Select = forwardRef(function Select(
  { label, error, options, placeholder, id, className = '', containerClassName = '', ...rest },
  ref
) {
  const selectId = id || rest.name

  return (
    <div className={containerClassName}>
      {label && (
        <label htmlFor={selectId} className="mb-1.5 block text-sm font-medium text-navy-700 dark:text-navy-200">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          className={`w-full appearance-none rounded-xl border bg-white px-3.5 py-2.5 pr-10 text-sm text-navy-800 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/40 dark:bg-navy-800 dark:text-navy-100 ${
            error ? 'border-red-400 focus:ring-red-500/30' : 'border-navy-200 dark:border-navy-700'
          } ${className}`}
          aria-invalid={Boolean(error)}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
      </div>
      {error && <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>}
    </div>
  )
})

export default Select
