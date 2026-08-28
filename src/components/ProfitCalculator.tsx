import { useMemo, useState } from 'react'
import { Field } from './Field'
import { SpoolGauge } from './SpoolGauge'
import { StatCard } from './StatCard'
import { calculateProfit, formatCurrency, formatNumber } from '../utils/calculations'

const REFERENCE_REVENUE = 10000

export function ProfitCalculator() {
  const [outputWeightKg, setOutputWeightKg] = useState(930)
  const [sellPricePerKg, setSellPricePerKg] = useState(3.6)
  const [materialCost, setMaterialCost] = useState(2400)
  const [additionalCosts, setAdditionalCosts] = useState(600)

  const breakdown = useMemo(
    () => calculateProfit(outputWeightKg, sellPricePerKg, materialCost, additionalCosts),
    [outputWeightKg, sellPricePerKg, materialCost, additionalCosts]
  )

  const isProfitable = breakdown.profit >= 0

  return (
    <section className="panel-grid">
      <div className="panel">
        <h2 className="panel__title">Revenue &amp; Profit</h2>
        <p className="panel__hint">Weigh finished-wire revenue against material and production cost.</p>
        <div className="field-grid">
          <Field label="Output weight" unit="kg" value={outputWeightKg} onChange={setOutputWeightKg} step={10} />
          <Field label="Sell price" unit="$/kg" value={sellPricePerKg} onChange={setSellPricePerKg} step={0.05} />
          <Field label="Material cost" unit="$" value={materialCost} onChange={setMaterialCost} step={10} />
          <Field label="Other costs" unit="$" value={additionalCosts} onChange={setAdditionalCosts} step={10} />
        </div>
        <div className="stat-row">
          <StatCard label="Revenue" value={formatCurrency(breakdown.revenue)} />
          <StatCard label="Total cost" value={formatCurrency(breakdown.totalCost)} />
          <StatCard label="Margin" value={formatNumber(breakdown.marginPercent)} unit="%" />
        </div>
      </div>

      <div className="panel panel--visual">
        <SpoolGauge
          progress={Math.abs(breakdown.profit) / REFERENCE_REVENUE}
          label={isProfitable ? 'Profit' : 'Loss'}
          value={formatCurrency(breakdown.profit)}
          unit=""
          tone={isProfitable ? 'success' : 'danger'}
        />
      </div>
    </section>
  )
}
