export default function StatCard({ icon: Icon, label, value, sublabel, accent = 'emerald' }) {
  const accentClasses = {
    emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
    navy: 'bg-navy-50 text-navy-600 dark:bg-navy-700 dark:text-navy-200',
    amber: 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
    red: 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400'
  }

  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card dark:border-navy-700 dark:bg-navy-800">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-navy-500 dark:text-navy-400">{label}</p>
          <p className="mt-2 text-2xl font-bold text-navy-900 dark:text-navy-50">{value}</p>
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${accentClasses[accent]}`}>
          <Icon className="h-5 w-5" strokeWidth={2} />
        </div>
      </div>
      {sublabel && <p className="mt-3 text-xs font-medium text-navy-400 dark:text-navy-500">{sublabel}</p>}
    </div>
  )
}
