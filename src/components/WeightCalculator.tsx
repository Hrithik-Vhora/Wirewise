import { Field } from './Field'
import { SpoolGauge } from './SpoolGauge'
import { StatCard } from './StatCard'
import { calculateCrossSectionAreaMm2, formatNumber } from '../utils/calculations'

const REFERENCE_WEIGHT_KG = 2500

interface WeightCalculatorProps {
  diameterMm: number
  lengthM: number
  weightPerKm: number
  onDiameterChange: (value: number) => void
  onLengthChange: (value: number) => void
  outputWeightKg: number
}

export function WeightCalculator({
  diameterMm,
  lengthM,
  weightPerKm,
  onDiameterChange,
  onLengthChange,
  outputWeightKg,
}: WeightCalculatorProps) {
  const crossSection = calculateCrossSectionAreaMm2(diameterMm)

  return (
    <section className="panel-grid">
      <div className="panel">
        <h2 className="panel__title">Conductor Specification</h2>

        <p className="panel__hint">
          Diameter is populated automatically from the selected conductor.
          Weight calculations use the verified IS 398 unit weight (kg/km),
          not aluminium density.
        </p>

        <div className="field-grid">
          <Field
            label="Diameter"
            unit="mm"
            value={diameterMm}
            onChange={onDiameterChange}
            step={0.01}
          />

          <Field
            label="Length"
            unit="m"
            value={lengthM}
            onChange={onLengthChange}
            step={10}
          />
        </div>

        <div className="stat-row">
          <StatCard
            label="Unit Weight"
            value={formatNumber(weightPerKm, 0)}
            unit="kg/km"
          />

          <StatCard
            label="Cross-section"
            value={formatNumber(crossSection, 2)}
            unit="mm²"
          />
        </div>
      </div>

      <div className="panel panel--visual">
        <SpoolGauge
          progress={outputWeightKg / REFERENCE_WEIGHT_KG}
          label="Estimated Weight"
          value={formatNumber(outputWeightKg)}
          unit="kg"
          tone="ember"
        />
      </div>
    </section>
  )
}
