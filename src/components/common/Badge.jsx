const COLOR_MAP = {
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800',
  amber: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800',
  orange: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800',
  red: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800',
  navy: 'bg-navy-50 text-navy-700 border-navy-200 dark:bg-navy-800 dark:text-navy-200 dark:border-navy-700'
}

export default function Badge({ color = 'navy', icon: Icon, children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-semibold ${COLOR_MAP[color]} ${className}`}
    >
      {Icon && <Icon className="h-3.5 w-3.5" strokeWidth={2.5} />}
      {children}
    </span>
  )
}
