import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function CategoryChart({ data }) {
  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card dark:border-navy-700 dark:bg-navy-800">
      <h3 className="text-base font-semibold text-navy-900 dark:text-navy-50">Products by Category</h3>
      <div className="mt-4 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e9f0" />
            <XAxis dataKey="category" tick={{ fontSize: 11, fill: '#67779f' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#67779f' }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip
              cursor={{ fill: 'rgba(16,185,129,0.06)' }}
              contentStyle={{ borderRadius: 12, border: '1px solid #e5e9f0', fontSize: 13 }}
            />
            <Bar dataKey="count" fill="#059669" radius={[8, 8, 0, 0]} maxBarSize={48} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
