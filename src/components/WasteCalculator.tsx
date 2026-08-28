import { Field } from './Field'
import { SpoolGauge } from './SpoolGauge'
import { StatCard } from './StatCard'
import { formatNumber } from '../utils/calculations'

interface WasteCalculatorProps {
  wastePercent: number
  onWastePercentChange: (value: number) => void
  outputWeightKg: number
  inputWeightKg: number
  wasteWeightKg: number
}

export function WasteCalculator({
  wastePercent,
  onWastePercentChange,
  outputWeightKg,
  inputWeightKg,
  wasteWeightKg,
}: WasteCalculatorProps) {
  const yieldPercent = Math.max(0, 100 - wastePercent)

  return (
    <section className="panel-grid">
      <div className="panel">
        <h2 className="panel__title">Production Waste</h2>
        <p className="panel__hint">
          Set the expected scrap rate for the line. Raw input weight scales automatically to still deliver the
          finished spec.
        </p>
        <div className="field-grid">
          <Field label="Waste rate" unit="%" value={wastePercent} onChange={onWastePercentChange} step={0.5} />
        </div>
        <div className="stat-row">
          <StatCard label="Finished output" value={formatNumber(outputWeightKg)} unit="kg" />
          <StatCard label="Raw input required" value={formatNumber(inputWeightKg)} unit="kg" />
          <StatCard label="Scrap weight" value={formatNumber(wasteWeightKg)} unit="kg" />
          <StatCard label="Yield" value={formatNumber(yieldPercent)} unit="%" />
        </div>
      </div>

      <div className="panel panel--visual">
        <SpoolGauge
          progress={wastePercent / 100}
          label="Waste"
          value={formatNumber(wastePercent)}
          unit="%"
          tone="danger"
        />
      </div>
    </section>
  )
}
