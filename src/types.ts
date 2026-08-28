export type CalculatorId = 'weight' | 'material' | 'waste' | 'profit'

export interface CalculatorMeta {
  id: CalculatorId
  label: string
  shortLabel: string
  unit: string
}
