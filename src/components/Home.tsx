import type { ReactNode } from 'react'
import ConductorSelector from './ConductorSelector'
import { KpiCard } from './KpiCard'
import { NavTile } from './NavTile'
import { IconWeight, IconRevenue, IconProfit, IconWaste } from './icons'
import { formatCurrency, formatNumber } from '../utils/calculations'
import type { ProductionSnapshot } from '../utils/calculations'
import type { CalculatorId } from '../types'
import type { Conductor } from '../data/conductors'

interface HomeProps {
  snapshot: ProductionSnapshot
  onNavigate: (id: CalculatorId) => void
  selectedConductor: Conductor
  onConductorChange: (c: Conductor) => void
}

interface TileConfig {
  id: CalculatorId
  title: string
  description: string
  icon: ReactNode
}

const TILES: TileConfig[] = [
  {
    id: 'weight',
    title: 'Wire Weight',
    description: 'Estimate finished conductor mass',
    icon: <IconWeight />,
  },
  {
    id: 'material',
    title: 'Material Cost',
    description: 'Calculate raw material cost',
    icon: <IconRevenue />,
  },
  {
    id: 'waste',
    title: 'Waste %',
    description: 'Analyse scrap and recovery',
    icon: <IconWaste />,
  },
  {
    id: 'profit',
    title: 'Revenue & Profit',
    description: 'Financial production analysis',
    icon: <IconProfit />,
  },
]

export function Home({
  snapshot,
  onNavigate,
  selectedConductor,
  onConductorChange,
}: HomeProps) {
  return (
    <div className="home">
      <header className="hero">
        <div className="hero__top">
          <div>
            <p className="hero__eyebrow">WIREWISE</p>
            <h1>Production Overview</h1>
            <p className="hero__subtitle">
              Engineering dashboard for verified Indian conductor specifications.
            </p>
          </div>

          <ConductorSelector
            selected={selectedConductor}
            onSelect={onConductorChange}
          />
        </div>

        <div className="conductor-card">
          <div className="conductor-card__title">
            <span>{selectedConductor.family}</span>
            <h2>{selectedConductor.name}</h2>
            <p>{selectedConductor.description}</p>
          </div>

          <div className="spec-grid">
            <div className="spec-box">
              <label>Diameter</label>
              <strong>{selectedConductor.diameter.toFixed(2)} mm</strong>
            </div>

            <div className="spec-box">
              <label>Weight</label>
              <strong>{selectedConductor.weightPerKm} kg/km</strong>
            </div>

            <div className="spec-box">
              <label>Resistance</label>
              <strong>{selectedConductor.resistance20.toFixed(3)} Ω/km</strong>
            </div>

            <div className="spec-box">
              <label>Area</label>
              <strong>{selectedConductor.totalArea.toFixed(0)} mm²</strong>
            </div>

            <div className="spec-box">
              <label>Al Strands</label>
              <strong>{selectedConductor.aluminiumStrands}</strong>
            </div>

            <div className="spec-box">
              <label>Steel</label>
              <strong>{selectedConductor.steelStrands ?? '—'}</strong>
            </div>
          </div>
        </div>
      </header>

      <div className="kpi-grid">
        <KpiCard
          label="Weight"
          value={snapshot.outputWeightKg}
          format={(v) => formatNumber(v / 1000, 2)}
          unit="t"
          icon={<IconWeight />}
        />
        <KpiCard
          label="Material"
          value={snapshot.materialCost}
          format={(v) => formatCurrency(v)}
          icon={<IconRevenue />}
        />
        <KpiCard
          label="Revenue"
          value={snapshot.profit.revenue}
          format={(v) => formatCurrency(v)}
          icon={<IconProfit />}
          tone="profit"
        />
        <KpiCard
          label="Waste"
          value={snapshot.wastePercent}
          format={(v) => `${formatNumber(v, 1)}%`}
          icon={<IconWaste />}
        />
      </div>

      <section className="home__nav">
        <h2>Calculators</h2>

        <div className="nav-tile-grid">
          {TILES.map((tile) => (
            <NavTile
              key={tile.id}
              title={tile.title}
              description={tile.description}
              icon={tile.icon}
              onClick={() => onNavigate(tile.id)}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
