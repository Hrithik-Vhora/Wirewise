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
 * Shared production inputs for the entire application.
 * Every calculator edits this single source of truth.
 */
export interface WireProductionInputs {
  diameterMm: number
  lengthM: number

  /** Verified conductor specification (kg/km) */
  weightPerKm: number

  materialPricePerKg: number
  wastePercent: number
  sellPricePerKg: number
  additionalCosts: number
}
