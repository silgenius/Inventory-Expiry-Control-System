import { Link } from 'react-router-dom'
import { PackagePlus, Clock, XCircle, FileBarChart } from 'lucide-react'

const ACTIONS = [
  { label: 'Add Product', to: '/products/add', icon: PackagePlus },
  { label: 'View Expiring Products', to: '/expiry-monitor', icon: Clock },
  { label: 'View Expired Products', to: '/expiry-monitor?tab=expired', icon: XCircle },
  { label: 'View Reports', to: '/reports', icon: FileBarChart }
]

export default function QuickActions() {
  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card dark:border-navy-700 dark:bg-navy-800">
      <h3 className="text-base font-semibold text-navy-900 dark:text-navy-50">Quick Actions</h3>
      <div className="mt-4 flex flex-col gap-2">
        {ACTIONS.map((action) => (
          <Link
            key={action.label}
            to={action.to}
            className="flex items-center gap-3 rounded-xl border border-navy-100 px-3.5 py-2.5 text-sm font-medium text-navy-700 transition-colors hover:border-emerald-200 hover:bg-emerald-50 dark:border-navy-700 dark:text-navy-200 dark:hover:bg-navy-700"
          >
            <action.icon className="h-4 w-4 text-emerald-600" strokeWidth={2} />
            {action.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
