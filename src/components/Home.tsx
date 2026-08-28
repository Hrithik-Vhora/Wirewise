import type { ReactNode } from 'react'
import { KpiCard } from './KpiCard'
import { NavTile } from './NavTile'
import { IconWeight, IconRevenue, IconProfit, IconWaste } from './icons'
import { formatCurrency, formatNumber } from '../utils/calculations'
import type { ProductionSnapshot } from '../utils/calculations'
import type { CalculatorId } from '../types'

interface HomeProps {
  snapshot: ProductionSnapshot
  onNavigate: (id: CalculatorId) => void
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

export function Home({ snapshot, onNavigate }: HomeProps) {
  return (
    <div className="home">
      <header className="home__hero">
        <p className="app__eyebrow">WireWise Production Console</p>
        <h1 className="home__title">Production Overview</h1>
        <p className="home__subtitle">
          Live figures from your current wire specification, material pricing, and waste settings.
        </p>
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
