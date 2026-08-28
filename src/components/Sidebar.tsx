import type { ViewId, CalculatorMeta } from '../types'

const NAV_ITEMS: CalculatorMeta[] = [
  { id: 'weight', label: 'Wire Weight', shortLabel: 'Weight', unit: 'kg' },
  { id: 'material', label: 'Material Cost', shortLabel: 'Cost', unit: '$' },
  { id: 'waste', label: 'Waste %', shortLabel: 'Waste', unit: '%' },
  { id: 'profit', label: 'Revenue & Profit', shortLabel: 'Profit', unit: '$' },
]

interface SidebarProps {
  active: ViewId
  onSelect: (id: ViewId) => void
}

export function Sidebar({ active, onSelect }: SidebarProps) {
  return (
    <nav className="sidebar" aria-label="Primary">
      <div className="sidebar__mark">
        <span className="sidebar__mark-glyph">⌁</span>
        <div>
          <div className="sidebar__mark-title">WIREWISE</div>
          <div className="sidebar__mark-sub">Production Console</div>
        </div>
      </div>

      <button
        className={active === 'home' ? 'sidebar__home sidebar__home--active' : 'sidebar__home'}
        onClick={() => onSelect('home')}
        aria-current={active === 'home'}
      >
        <span className="sidebar__home-glyph">⌂</span>
        Overview
      </button>

      <ul className="sidebar__list">
        {NAV_ITEMS.map((item, i) => (
          <li key={item.id}>
            <button
              className={item.id === active ? 'sidebar__item sidebar__item--active' : 'sidebar__item'}
              onClick={() => onSelect(item.id)}
              aria-current={item.id === active}
            >
              <span className="sidebar__item-index">{String(i + 1).padStart(2, '0')}</span>
              <span className="sidebar__item-label">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="sidebar__footer">Aluminium wire production toolkit</div>
    </nav>
  )
}
