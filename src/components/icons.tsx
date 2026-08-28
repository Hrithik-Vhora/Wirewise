const shared = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function IconWeight() {
  return (
    <svg {...shared} aria-hidden="true">
      <ellipse cx="12" cy="6.2" rx="7" ry="2.4" />
      <path d="M5 6.2v5.6c0 1.3 3.1 2.4 7 2.4s7-1.1 7-2.4V6.2" />
      <path d="M5 11.8v5.6c0 1.3 3.1 2.4 7 2.4s7-1.1 7-2.4v-5.6" />
    </svg>
  )
}

export function IconRevenue() {
  return (
    <svg {...shared} aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5v9M14.6 9.6c0-1-1.1-1.8-2.6-1.8s-2.6.8-2.6 1.8.9 1.5 2.6 1.9c1.7.4 2.6 1 2.6 2s-1.1 1.9-2.6 1.9-2.6-.7-2.6-1.8" />
    </svg>
  )
}

export function IconProfit() {
  return (
    <svg {...shared} aria-hidden="true">
      <path d="M4 16l5.2-5.6 3.6 3 6.2-7" />
      <path d="M14.2 6.4h4.8v4.8" />
    </svg>
  )
}

export function IconWaste() {
  return (
    <svg {...shared} aria-hidden="true">
      <circle cx="7.5" cy="7.5" r="2" />
      <circle cx="16.5" cy="16.5" r="2" />
      <path d="M18 6L6 18" />
    </svg>
  )
}
