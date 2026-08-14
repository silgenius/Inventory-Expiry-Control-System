export default function AuthHero({ eyebrow, title, subtitle, compact = false }) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-navy-900 px-6 pb-12 pt-8 text-white sm:rounded-b-[2.5rem] ${
        compact ? 'sm:pb-14' : 'sm:pb-16 sm:pt-10'
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '16px 16px'
        }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-400/20 blur-2xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-navy-900/30 blur-2xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-sm text-center">
        <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
            <path d="M4 8.5 12 4l8 4.5-8 4.5-8-4.5Z" stroke="white" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M4 8.5v7L12 20l8-4.5v-7" stroke="white" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
          </svg>
        </div>
        {eyebrow && <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-100">{eyebrow}</p>}
        <h1 className="mt-1.5 text-xl font-bold leading-snug sm:text-2xl">{title}</h1>
        {subtitle && <p className="mt-2 text-sm text-emerald-50/90">{subtitle}</p>}

        <FreshnessGauge />
      </div>
    </div>
  )
}

function FreshnessGauge() {
  return (
    <div className="mx-auto mt-6 flex max-w-[220px] flex-col items-center">
      <svg viewBox="0 0 200 110" className="w-full">
        <path d="M15 100 A85 85 0 0 1 68 21" stroke="#6ee7b7" strokeWidth="14" strokeLinecap="round" fill="none" />
        <path d="M68 21 A85 85 0 0 1 132 21" stroke="#fbbf24" strokeWidth="14" strokeLinecap="round" fill="none" />
        <path d="M132 21 A85 85 0 0 1 185 100" stroke="#fb923c" strokeWidth="14" strokeLinecap="round" fill="none" />
        <g transform="rotate(-25 100 100)">
          <line x1="100" y1="100" x2="100" y2="32" stroke="white" strokeWidth="3" strokeLinecap="round" />
        </g>
        <circle cx="100" cy="100" r="6" fill="white" />
      </svg>
      <p className="-mt-2 text-xs font-semibold text-emerald-50/90">Live freshness at a glance</p>
    </div>
  )
}
