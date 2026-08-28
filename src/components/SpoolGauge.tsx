interface SpoolGaugeProps {
  /** 0–1 fill progress, e.g. weight relative to a reference capacity */
  progress: number
  label: string
  value: string
  unit: string
  tone?: 'ember' | 'success' | 'danger'
}

const RING_COUNT = 7
const RADIUS_STEP = 9
const BASE_RADIUS = 26

export function SpoolGauge({ progress, label, value, unit, tone = 'ember' }: SpoolGaugeProps) {
  const clamped = Math.min(1, Math.max(0, Number.isFinite(progress) ? progress : 0))
  const activeRings = Math.round(clamped * RING_COUNT)

  return (
    <div className={`spool-gauge spool-gauge--${tone}`}>
      <svg viewBox="0 0 200 200" className="spool-gauge__svg" role="img" aria-label={`${label}: ${value} ${unit}`}>
        <line x1="100" y1="8" x2="100" y2="192" className="spool-gauge__spindle" />
        {Array.from({ length: RING_COUNT }).map((_, i) => {
          const r = BASE_RADIUS + i * RADIUS_STEP
          const isActive = i < activeRings
          return (
            <ellipse
              key={i}
              cx="100"
              cy="100"
              rx={r * 0.42}
              ry={r}
              className={isActive ? 'spool-gauge__ring spool-gauge__ring--active' : 'spool-gauge__ring'}
              style={{ transitionDelay: `${i * 35}ms` }}
            />
          )
        })}
        <circle cx="100" cy="100" r="6" className="spool-gauge__hub" />
      </svg>
      <div className="spool-gauge__readout">
        <span className="spool-gauge__value">{value}</span>
        <span className="spool-gauge__unit">{unit}</span>
        <span className="spool-gauge__label">{label}</span>
      </div>
    </div>
  )
}
