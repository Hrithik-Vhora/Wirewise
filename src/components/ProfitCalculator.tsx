import { Field } from './Field'
import { SpoolGauge } from './SpoolGauge'
import { StatCard } from './StatCard'
import { formatCurrency, formatNumber } from '../utils/calculations'
import type { ProfitBreakdown } from '../utils/calculations'

const REFERENCE_REVENUE = 10000

interface ProfitCalculatorProps {
  sellPricePerKg: number
  additionalCosts: number
  onSellPriceChange: (value: number) => void
  onAdditionalCostsChange: (value: number) => void
  outputWeightKg: number
  materialCost: number
  profit: ProfitBreakdown
}

export function ProfitCalculator({
  sellPricePerKg,
  additionalCosts,
  onSellPriceChange,
  onAdditionalCostsChange,
  outputWeightKg,
  materialCost,
  profit,
}: ProfitCalculatorProps) {
  const isProfitable = profit.profit >= 0

  return (
    <section className="panel-grid">
      <div className="panel">
        <h2 className="panel__title">Revenue &amp; Profit</h2>
        <p className="panel__hint">
          Weighs {formatNumber(outputWeightKg)} kg of finished wire against {formatCurrency(materialCost)} of
          material plus your other production costs.
        </p>
        <div className="field-grid">
          <Field label="Sell price" unit="$/kg" value={sellPricePerKg} onChange={onSellPriceChange} step={0.05} />
          <Field label="Other costs" unit="$" value={additionalCosts} onChange={onAdditionalCostsChange} step={10} />
        </div>
        <div className="stat-row">
          <StatCard label="Revenue" value={formatCurrency(profit.revenue)} />
          <StatCard label="Total cost" value={formatCurrency(profit.totalCost)} />
          <StatCard label="Margin" value={formatNumber(profit.marginPercent)} unit="%" />
        </div>
      </div>

      <div className="panel panel--visual">
        <SpoolGauge
          progress={Math.abs(profit.profit) / REFERENCE_REVENUE}
          label={isProfitable ? 'Profit' : 'Loss'}
          value={formatCurrency(profit.profit)}
          unit=""
          tone={isProfitable ? 'success' : 'danger'}
        />
      </div>
    </section>
  )
}
