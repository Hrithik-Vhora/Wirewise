import type { ReactNode } from 'react'

interface NavTileProps {
  index: string
  title: string
  description: string
  icon: ReactNode
  onClick: () => void
}

export function NavTile({ index, title, description, icon, onClick }: NavTileProps) {
  return (
    <button className="nav-tile" onClick={onClick}>
      <div className="nav-tile__top">
        <span className="nav-tile__index">{index}</span>
        <span className="nav-tile__icon">{icon}</span>
      </div>
      <h3 className="nav-tile__title">{title}</h3>
      <p className="nav-tile__description">{description}</p>
      <span className="nav-tile__cta">Open →</span>
    </button>
  )
}
