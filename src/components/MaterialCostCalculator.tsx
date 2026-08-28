import { Field } from './Field'
import { SpoolGauge } from './SpoolGauge'
import { StatCard } from './StatCard'
import { formatCurrency, formatNumber } from '../utils/calculations'

const REFERENCE_COST = 5000

interface MaterialCostCalculatorProps {
  materialPricePerKg: number
  onPriceChange: (value: number) => void
  diameterMm: number
  lengthM: number
  inputWeightKg: number
  materialCost: number
}

export function MaterialCostCalculator({
  materialPricePerKg,
  onPriceChange,
  diameterMm,
  lengthM,
  inputWeightKg,
  materialCost,
}: MaterialCostCalculatorProps) {
  const costPerMeter = lengthM > 0 ? materialCost / lengthM : 0

  return (
    <section className="panel-grid">
      <div className="panel">
        <h2 className="panel__title">Material Cost</h2>
        <p className="panel__hint">
          Priced against the current wire spec ({formatNumber(diameterMm)} mm × {formatNumber(lengthM, 0)} m) and
          waste rate, from the raw material actually purchased.
        </p>
        <div className="field-grid">
          <Field label="Price" unit="$/kg" value={materialPricePerKg} onChange={onPriceChange} step={0.05} />
        </div>
        <div className="stat-row">
          <StatCard label="Raw material required" value={formatNumber(inputWeightKg)} unit="kg" />
          <StatCard label="Cost / metre" value={formatCurrency(costPerMeter)} />
        </div>
      </div>

      <div className="panel panel--visual">
        <SpoolGauge
          progress={materialCost / REFERENCE_COST}
          label="Material cost"
          value={formatCurrency(materialCost)}
          unit=""
          tone="ember"
        />
      </div>
    </section>
  )
}
