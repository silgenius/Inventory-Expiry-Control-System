const VARIANTS = {
  primary:
    'bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:ring-emerald-500 shadow-sm',
  secondary:
    'bg-white text-navy-700 border border-navy-200 hover:bg-navy-50 focus-visible:ring-navy-400 dark:bg-navy-800 dark:text-navy-100 dark:border-navy-700 dark:hover:bg-navy-700',
  danger:
    'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500 shadow-sm',
  ghost:
    'bg-transparent text-navy-600 hover:bg-navy-100 focus-visible:ring-navy-400 dark:text-navy-200 dark:hover:bg-navy-800'
}

const SIZES = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-base'
}

export default function Button({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  isLoading = false,
  className = '',
  children,
  disabled,
  type = 'button',
  ...rest
}) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...rest}
    >
      {isLoading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="h-4 w-4" strokeWidth={2} />}
          {children}
          {Icon && iconPosition === 'right' && <Icon className="h-4 w-4" strokeWidth={2} />}
        </>
      )}
    </button>
  )
}
