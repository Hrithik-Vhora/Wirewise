import type { ReactNode } from 'react'
import { useCountUp } from '../hooks/useCountUp'

interface KpiCardProps {
  label: string
  value: number
  format: (value: number) => string
  icon: ReactNode
  /** 'profit' turns the value green/red depending on sign. */
  tone?: 'neutral' | 'profit'
}

export function KpiCard({ label, value, format, icon, tone = 'neutral' }: KpiCardProps) {
  const animated = useCountUp(value)
  const toneClass = tone === 'profit' ? (value >= 0 ? 'kpi-card--positive' : 'kpi-card--negative') : ''

  return (
    <div className={`kpi-card ${toneClass}`.trim()}>
      <div className="kpi-card__icon">{icon}</div>
      <span className="kpi-card__label">{label}</span>
      <span className="kpi-card__value">{format(animated)}</span>
    </div>
  )
}

