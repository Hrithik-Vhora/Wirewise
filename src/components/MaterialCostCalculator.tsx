import { useMemo, useState } from 'react'
import { Field } from './Field'
import { SpoolGauge } from './SpoolGauge'
import { StatCard } from './StatCard'
import { calculateMaterialCost, calculateWireWeightKg, formatCurrency, formatNumber } from '../utils/calculations'

const REFERENCE_COST = 5000

export function MaterialCostCalculator() {
  const [diameterMm, setDiameterMm] = useState(2.5)
  const [lengthM, setLengthM] = useState(1000)
  const [pricePerKg, setPricePerKg] = useState(2.4)

  const weightKg = useMemo(() => calculateWireWeightKg(diameterMm, lengthM), [diameterMm, lengthM])
  const cost = useMemo(() => calculateMaterialCost(weightKg, pricePerKg), [weightKg, pricePerKg])
  const costPerMeter = lengthM > 0 ? cost / lengthM : 0

  return (
    <section className="panel-grid">
      <div className="panel">
        <h2 className="panel__title">Material Cost</h2>
        <p className="panel__hint">Estimate raw aluminium spend for a given wire run and market price.</p>
        <div className="field-grid">
          <Field label="Diameter" unit="mm" value={diameterMm} onChange={setDiameterMm} step={0.05} />
          <Field label="Length" unit="m" value={lengthM} onChange={setLengthM} step={10} />
          <Field label="Price" unit="$/kg" value={pricePerKg} onChange={setPricePerKg} step={0.05} />
        </div>
        <div className="stat-row">
          <StatCard label="Wire weight" value={formatNumber(weightKg)} unit="kg" />
          <StatCard label="Cost / metre" value={formatCurrency(costPerMeter)} />
        </div>
      </div>

      <div className="panel panel--visual">
        <SpoolGauge
          progress={cost / REFERENCE_COST}
          label="Material cost"
          value={formatCurrency(cost)}
          unit=""
          tone="ember"
        />
      </div>
    </section>
  )
}
