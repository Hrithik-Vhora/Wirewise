import type { ReactNode } from 'react'
import { KpiCard } from './KpiCard'
import { NavTile } from './NavTile'
import { IconWeight, IconRevenue, IconProfit, IconWaste } from './icons'
import { formatCurrency, formatNumber } from '../utils/calculations'
import type { ProductionSnapshot } from '../utils/calculations'
import type { CalculatorId } from '../types'
import ConductorSelector from './ConductorSelector'
import type { Conductor } from '../data/conductors'

interface HomeProps {
  snapshot: ProductionSnapshot
  onNavigate: (id: CalculatorId) => void

  selectedConductor: Conductor
  onConductorChange: (conductor: Conductor) => void
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
    title: 'Wire Weight Calculator',
    description: 'Estimate finished wire weight from diameter and run length.',
    icon: <IconWeight />,
  },
  {
    id: 'material',
    title: 'Material Cost Calculator',
    description: 'Price raw aluminium consumption, waste-adjusted.',
    icon: <IconRevenue />,
  },
  {
    id: 'waste',
    title: 'Waste Calculator',
    description: 'Track scrap rate between raw input and finished output.',
    icon: <IconWaste />,
  },
  {
    id: 'profit',
    title: 'Profit & Revenue Calculator',
    description: 'Weigh finished-wire revenue against total production cost.',
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
      <header className="home__hero">
        <p className="app__eyebrow">WireWise Production Console</p>
        <h1 className="home__title">Production Overview</h1>
        <p className="home__subtitle">
          Live figures from your current wire specification, material pricing, and waste settings.
        </p>
        <div className="home__selector">
  <ConductorSelector
    selected={selectedConductor}
    onSelect={onConductorChange}
  />

  <div className="conductor-spec-card">
    <div className="conductor-spec-card__header">
      <div>
        <p className="conductor-spec-card__eyebrow">
          {selectedConductor.family}
        </p>
        <h3>{selectedConductor.name}</h3>
        <p>{selectedConductor.description}</p>
      </div>
    </div>

    <div className="conductor-spec-grid">
      <div className="spec-item">
        <span>Diameter</span>
        <strong>{selectedConductor.diameter.toFixed(2)} mm</strong>
      </div>

      <div className="spec-item">
        <span>Area</span>
        <strong>{selectedConductor.totalArea.toFixed(2)} mm²</strong>
      </div>

      <div className="spec-item">
        <span>Weight</span>
        <strong>{selectedConductor.weightPerKm} kg/km</strong>
      </div>

      <div className="spec-item">
        <span>Resistance</span>
        <strong>{selectedConductor.resistance20.toFixed(3)} Ω/km</strong>
      </div>

      <div className="spec-item">
        <span>Al Strands</span>
        <strong>{selectedConductor.aluminiumStrands}</strong>
      </div>

      <div className="spec-item">
        <span>Steel</span>
        <strong>{selectedConductor.steelStrands ?? '—'}</strong>
      </div>
    </div>
  </div>
</div>
      </header>

      <div className="kpi-grid">
        <KpiCard
          label="Total Weight"
          value={snapshot.outputWeightKg}
          format={(v) => formatNumber(v)}
          icon={<IconWeight />}
        />
        <KpiCard
          label="Total Revenue"
          value={snapshot.profit.revenue}
          format={(v) => formatCurrency(v)}
          icon={<IconRevenue />}
        />
        <KpiCard
          label="Total Profit"
          value={snapshot.profit.profit}
          format={(v) => formatCurrency(v)}
          icon={<IconProfit />}
          tone="profit"
        />
        <KpiCard
          label="Total Waste"
          value={snapshot.wastePercent}
          format={(v) => `${formatNumber(v)}%`}
          icon={<IconWaste />}
        />
      </div>

      <section className="home__nav">
        <h2 className="home__nav-title">Calculators</h2>
        <div className="nav-tile-grid">
          {TILES.map((tile, i) => (
            <NavTile
              key={tile.id}
              index={String(i + 1).padStart(2, '0')}
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
