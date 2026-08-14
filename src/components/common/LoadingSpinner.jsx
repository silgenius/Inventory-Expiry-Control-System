export default function LoadingSpinner({ label = 'Loading', size = 'md', className = '' }) {
  const dimension = size === 'lg' ? 'h-8 w-8' : size === 'sm' ? 'h-4 w-4' : 'h-6 w-6'
  return (
    <div className={`flex items-center justify-center gap-2 py-10 text-navy-400 ${className}`} role="status">
      <span className={`animate-spin rounded-full border-2 border-navy-200 border-t-emerald-600 ${dimension}`} />
      <span className="text-sm">{label}</span>
    </div>
  )
}
