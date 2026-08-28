interface StatCardProps {
  label: string
  value: string
  unit?: string
  emphasis?: boolean
}

export function StatCard({ label, value, unit, emphasis }: StatCardProps) {
  return (
    <div className={emphasis ? 'stat-card stat-card--emphasis' : 'stat-card'}>
      <span className="stat-card__label">{label}</span>
      <span className="stat-card__value">
        {value}
        {unit ? <span className="stat-card__unit"> {unit}</span> : null}
      </span>
    </div>
  )
}
