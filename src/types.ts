export type CalculatorId = 'weight' | 'material' | 'waste' | 'profit'

/** Two-level navigation: the landing dashboard, or one of the calculator sections. */
export type ViewId = 'home' | CalculatorId

export interface CalculatorMeta {
  id: CalculatorId
  label: string
  shortLabel: string
  unit: string
}

/**
 * The single shared input state for the whole app. Every calculator reads
 * and edits a slice of this instead of keeping its own local copy.
 */
export interface WireProductionInputs {
  diameterMm: number
  lengthM: number
  density: number
  materialPricePerKg: number
  wastePercent: number
  sellPricePerKg: number
  additionalCosts: number
}
