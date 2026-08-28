import type { ViewId } from '../types'

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
          <div className="sidebar__mark-sub">
            Conductor Intelligence
          </div>
        </div>
      </div>

      <button
        className={
          active === 'home'
            ? 'sidebar__home sidebar__home--active'
            : 'sidebar__home'
        }
        onClick={() => onSelect('home')}
        aria-current={active === 'home'}
      >
        <span className="sidebar__home-glyph">⌂</span>
        Overview
      </button>
    </nav>
  )
}
