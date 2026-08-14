import { forwardRef } from 'react'

const Input = forwardRef(function Input(
  { label, error, hint, icon: Icon, id, className = '', containerClassName = '', ...rest },
  ref
) {
  const inputId = id || rest.name

  return (
    <div className={containerClassName}>
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-navy-700 dark:text-navy-200">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-navy-800 placeholder:text-navy-400 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/40 dark:bg-navy-800 dark:text-navy-100 dark:placeholder:text-navy-500 ${
            Icon ? 'pl-10' : ''
          } ${error ? 'border-red-400 focus:ring-red-500/30' : 'border-navy-200 dark:border-navy-700'} ${className}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...rest}
        />
      </div>
      {error && (
        <p id={`${inputId}-error`} className="mt-1.5 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
      {!error && hint && <p className="mt-1.5 text-xs text-navy-400">{hint}</p>}
    </div>
  )
})

export default Input
