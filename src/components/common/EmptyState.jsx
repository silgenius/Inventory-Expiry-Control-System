export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-navy-200 bg-white px-6 py-14 text-center dark:border-navy-700 dark:bg-navy-800">
      {Icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-navy-400 dark:bg-navy-700">
          <Icon className="h-6 w-6" strokeWidth={1.75} />
        </div>
      )}
      <h3 className="text-sm font-semibold text-navy-800 dark:text-navy-100">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-sm text-navy-500 dark:text-navy-400">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
