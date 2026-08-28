// Density of aluminium in g/cm³. Adjustable for alloy variants.
export const ALUMINIUM_DENSITY_G_PER_CM3 = 2.70

/**
 * Calculates the weight of a cylindrical aluminium wire.
 * @param diameterMm  Wire diameter in millimetres
 * @param lengthM     Wire length in metres
 * @param densityGCm3 Material density in g/cm³ (defaults to pure aluminium)
 * @returns weight in kilograms
 */
export function calculateWireWeightKg(
  diameterMm: number,
  lengthM: number,
  densityGCm3: number = ALUMINIUM_DENSITY_G_PER_CM3
): number {
  if (diameterMm <= 0 || lengthM <= 0) return 0
  const radiusCm = diameterMm / 10 / 2
  const lengthCm = lengthM * 100
  const volumeCm3 = Math.PI * radiusCm * radiusCm * lengthCm
  const weightG = volumeCm3 * densityGCm3
  return weightG / 1000
}

/** Material cost for a given weight and price per kilogram. */
export function calculateMaterialCost(weightKg: number, pricePerKg: number): number {
  if (weightKg <= 0 || pricePerKg <= 0) return 0
  return weightKg * pricePerKg
}

/** Waste percentage between raw input weight and finished output weight. */
export function calculateWastePercentage(inputWeightKg: number, outputWeightKg: number): number {
  if (inputWeightKg <= 0) return 0
  const waste = ((inputWeightKg - outputWeightKg) / inputWeightKg) * 100
  return Math.max(0, waste)
}

/** Raw material needed to yield a target finished weight, given an expected waste rate. */
export function calculateRequiredInputWeight(targetOutputWeightKg: number, wastePercent: number): number {
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

/**
 * Computes revenue, total cost, profit, and margin for a production batch.
 * @param outputWeightKg  Finished (sellable) wire weight
 * @param sellPricePerKg  Sale price per kilogram of finished wire
 * @param materialCost    Cost of raw material consumed (already waste-adjusted upstream)
 * @param additionalCosts Labour, energy, overhead, etc.
 */
export function calculateProfit(
  outputWeightKg: number,
  sellPricePerKg: number,
  materialCost: number,
  additionalCosts: number
): ProfitBreakdown {
  const revenue = Math.max(0, outputWeightKg) * Math.max(0, sellPricePerKg)
  const totalCost = Math.max(0, materialCost) + Math.max(0, additionalCosts)
  const profit = revenue - totalCost
  const marginPercent = revenue > 0 ? (profit / revenue) * 100 : 0
  return { materialCost, additionalCosts, totalCost, revenue, profit, marginPercent }
}

/** Formats a number as a fixed-precision string, safe against NaN/Infinity. */
export function formatNumber(value: number, digits = 2): string {
  if (!Number.isFinite(value)) return '—'
  return value.toLocaleString(undefined, { minimumFractionDigits: digits, maximumFractionDigits: digits })
}

export function formatCurrency(value: number, currency = 'USD'): string {
  if (!Number.isFinite(value)) return '—'
  return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(value)
}
