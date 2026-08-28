import { useMemo, useState } from 'react'
import { Field } from './Field'
import { SpoolGauge } from './SpoolGauge'
import { StatCard } from './StatCard'
import { calculateWastePercentage, formatNumber } from '../utils/calculations'

export function WasteCalculator() {
  const [inputWeightKg, setInputWeightKg] = useState(1000)
  const [outputWeightKg, setOutputWeightKg] = useState(930)

  const wastePercent = useMemo(
    () => calculateWastePercentage(inputWeightKg, outputWeightKg),
    [inputWeightKg, outputWeightKg]
  )
  const wasteWeightKg = Math.max(0, inputWeightKg - outputWeightKg)
  const yieldPercent = Math.max(0, 100 - wastePercent)

  return (
    <section className="panel-grid">
      <div className="panel">
        <h2 className="panel__title">Production Waste</h2>
        <p className="panel__hint">Compare raw material fed into the line against finished, sellable output.</p>
        <div className="field-grid">
          <Field label="Input weight" unit="kg" value={inputWeightKg} onChange={setInputWeightKg} step={10} />
          <Field label="Output weight" unit="kg" value={outputWeightKg} onChange={setOutputWeightKg} step={10} />
        </div>
        <div className="stat-row">
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
