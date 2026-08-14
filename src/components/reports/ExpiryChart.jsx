import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { getStatusColor } from '../../utils/expiryUtils'

const COLOR_HEX = {
  emerald: '#10b981',
  amber: '#f59e0b',
  orange: '#f97316',
  red: '#ef4444'
}

export default function ExpiryChart({ data }) {
  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card dark:border-navy-700 dark:bg-navy-800">
      <h3 className="text-base font-semibold text-navy-900 dark:text-navy-50">Expiry Status Distribution</h3>
      <div className="mt-4 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={60} outerRadius={92} paddingAngle={3}>
              {data.map((entry) => (
                <Cell key={entry.status} fill={COLOR_HEX[getStatusColor(entry.status)]} stroke="none" />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e5e9f0', fontSize: 13 }} />
            <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
