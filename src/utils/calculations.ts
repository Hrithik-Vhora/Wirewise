import type { WireProductionInputs } from '../types'

/**
 * Calculates conductor weight from the verified unit weight (kg/km).
 * Formula:
 * Weight = Length × (kg/km ÷ 1000)
 */
export function calculateWireWeightKg(
  weightPerKm: number,
  lengthM: number
): number {
  if (weightPerKm <= 0 || lengthM <= 0) return 0
  return (weightPerKm * lengthM) / 1000
}

/** Cross-sectional area of a round conductor in mm². */
export function calculateCrossSectionAreaMm2(diameterMm: number): number {
  if (diameterMm <= 0) return 0
  const radius = diameterMm / 2
  return Math.PI * radius * radius
}

/** Material cost for a given weight and price/kg. */
export function calculateMaterialCost(
  weightKg: number,
  pricePerKg: number
): number {
  return Math.max(0, weightKg) * Math.max(0, pricePerKg)
}

/** Waste percentage between raw and finished conductor weight. */
export function calculateWastePercentage(
  inputWeightKg: number,
  outputWeightKg: number
): number {
  if (inputWeightKg <= 0) return 0

  const waste =
    ((inputWeightKg - outputWeightKg) / inputWeightKg) * 100

  return Math.max(0, waste)
}

/** Required raw material to produce a finished output weight. */
export function calculateRequiredInputWeight(
  targetOutputWeightKg: number,
  wastePercent: number
): number {
  if (wastePercent >= 100) return Infinity

  return targetOutputWeightKg / (1 - wastePercent / 100)
}

export interface ProfitBreakdown {
  materialCost: number
  additionalCosts: number
  totalCost: number
  revenue: number
  profit: number
  marginPercent: number
}

export function calculateProfit(
  outputWeightKg: number,
  sellPricePerKg: number,
  materialCost: number,
  additionalCosts: number
): ProfitBreakdown {
  const revenue =
    Math.max(0, outputWeightKg) * Math.max(0, sellPricePerKg)

  const totalCost =
    Math.max(0, materialCost) + Math.max(0, additionalCosts)

  const profit = revenue - totalCost

  const marginPercent =
    revenue > 0 ? (profit / revenue) * 100 : 0

  return {
    materialCost,
    additionalCosts,
    totalCost,
    revenue,
    profit,
    marginPercent,
  }
}

export interface ProductionSnapshot {
  outputWeightKg: number
  inputWeightKg: number
  wasteWeightKg: number
  wastePercent: number
  materialCost: number
  profit: ProfitBreakdown
}

/**
 * Master derivation pipeline.
 * Every dashboard card and calculator reads from this snapshot.
 */
export function computeProductionSnapshot(
  inputs: WireProductionInputs
): ProductionSnapshot {
  const outputWeightKg = calculateWireWeightKg(
    inputs.weightPerKm,
    inputs.lengthM
  )

  const rawInputWeight = calculateRequiredInputWeight(
    outputWeightKg,
    inputs.wastePercent
  )

  const inputWeightKg = Number.isFinite(rawInputWeight)
    ? rawInputWeight
    : 0

  const wasteWeightKg = Math.max(
    0,
    inputWeightKg - outputWeightKg
  )

  const materialCost = calculateMaterialCost(
    inputWeightKg,
    inputs.materialPricePerKg
  )

  const profit = calculateProfit(
    outputWeightKg,
    inputs.sellPricePerKg,
    materialCost,
    inputs.additionalCosts
  )

  return {
    outputWeightKg,
    inputWeightKg,
    wasteWeightKg,
    wastePercent: inputs.wastePercent,
    materialCost,
    profit,
  }
}

export function formatNumber(value: number, digits = 2): string {
  if (!Number.isFinite(value)) return '—'

  return value.toLocaleString('en-IN', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })
}

export function formatCurrency(value: number): string {
  if (!Number.isFinite(value)) return '—'

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}
