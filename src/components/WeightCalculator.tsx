import { useMemo, useState } from 'react'
import { Field } from './Field'
import { SpoolGauge } from './SpoolGauge'
import { StatCard } from './StatCard'
import { ALUMINIUM_DENSITY_G_PER_CM3, calculateWireWeightKg, formatNumber } from '../utils/calculations'

// Reference capacity used only to give the spool gauge a sense of scale.
const REFERENCE_WEIGHT_KG = 500

export function WeightCalculator() {
  const [diameterMm, setDiameterMm] = useState(2.5)
  const [lengthM, setLengthM] = useState(1000)
  const [density, setDensity] = useState(ALUMINIUM_DENSITY_G_PER_CM3)

  const weightKg = useMemo(
    () => calculateWireWeightKg(diameterMm, lengthM, density),
    [diameterMm, lengthM, density]
  )
  const weightPerKm = useMemo(
    () => calculateWireWeightKg(diameterMm, 1000, density),
    [diameterMm, density]
  )

  return (
    <section className="panel-grid">
      <div className="panel">
        <h2 className="panel__title">Wire Specification</h2>
        <p className="panel__hint">Enter the wire's cross-section and run length to estimate finished weight.</p>
        <div className="field-grid">
          <Field label="Diameter" unit="mm" value={diameterMm} onChange={setDiameterMm} step={0.05} />
          <Field label="Length" unit="m" value={lengthM} onChange={setLengthM} step={10} />
          <Field label="Density" unit="g/cm³" value={density} onChange={setDensity} step={0.01} />
        </div>
        <div className="stat-row">
          <StatCard label="Weight / km" value={formatNumber(weightPerKm)} unit="kg" />
          <StatCard label="Cross-section" value={formatNumber(Math.PI * (diameterMm / 2) ** 2, 3)} unit="mm²" />
        </div>
      </div>

      <div className="panel panel--visual">
        <SpoolGauge
          progress={weightKg / REFERENCE_WEIGHT_KG}
          label="Estimated weight"
          value={formatNumber(weightKg)}
          unit="kg"
          tone="ember"
        />
      </div>
    </section>
  )
}
