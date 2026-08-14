import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { getStatusColor } from '../../utils/expiryUtils'

const COLOR_HEX = {
  emerald: '#10b981',
  amber: '#f59e0b',
  orange: '#f97316',
  red: '#ef4444'
}

export default function ExpiryOverview({ data }) {
  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card dark:border-navy-700 dark:bg-navy-800">
      <h3 className="text-base font-semibold text-navy-900 dark:text-navy-50">Expiry Overview</h3>
      <p className="mt-0.5 text-sm text-navy-500 dark:text-navy-400">
        Product distribution across expiry status categories.
      </p>
      <div className="mt-4 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e9f0" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#67779f' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#67779f' }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip
              cursor={{ fill: 'rgba(16,185,129,0.06)' }}
              contentStyle={{ borderRadius: 12, border: '1px solid #e5e9f0', fontSize: 13 }}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={56}>
              {data.map((entry) => (
                <Cell key={entry.status} fill={COLOR_HEX[getStatusColor(entry.status)]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
