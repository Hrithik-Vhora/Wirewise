import { useState } from 'react'
import './App.css'
import { Sidebar } from './components/Sidebar'
import { WeightCalculator } from './components/WeightCalculator'
import { MaterialCostCalculator } from './components/MaterialCostCalculator'
import { WasteCalculator } from './components/WasteCalculator'
import { ProfitCalculator } from './components/ProfitCalculator'
import type { CalculatorId } from './types'

const TITLES: Record<CalculatorId, string> = {
  weight: 'Wire Weight Estimator',
  material: 'Material Cost Estimator',
  waste: 'Production Waste',
  profit: 'Revenue & Profit Analysis',
}

function App() {
  const [active, setActive] = useState<CalculatorId>('weight')

  return (
    <div className="app">
      <Sidebar active={active} onSelect={setActive} />
      <main className="app__main">
        <header className="app__header">
          <div>
            <p className="app__eyebrow">Aluminium Wire Production</p>
            <h1 className="app__title">{TITLES[active]}</h1>
          </div>
        </header>
        {active === 'weight' && <WeightCalculator />}
        {active === 'material' && <MaterialCostCalculator />}
        {active === 'waste' && <WasteCalculator />}
        {active === 'profit' && <ProfitCalculator />}
      </main>
    </div>
  )
}

export default App
