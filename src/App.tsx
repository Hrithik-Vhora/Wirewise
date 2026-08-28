import { useEffect, useMemo, useState } from 'react'
import './App.css'

import { Sidebar } from './components/Sidebar'
import { Home } from './components/Home'
import { WeightCalculator } from './components/WeightCalculator'
import { MaterialCostCalculator } from './components/MaterialCostCalculator'
import { WasteCalculator } from './components/WasteCalculator'
import { ProfitCalculator } from './components/ProfitCalculator'

import ConductorSelector from './components/ConductorSelector'
import { conductors, Conductor } from './data/conductors'

import type { ViewId, WireProductionInputs } from './types'
import { ALUMINIUM_DENSITY_G_PER_CM3, computeProductionSnapshot } from './utils/calculations'

const TITLES: Record<ViewId, string> = {
  home: 'Production Overview',
  weight: 'Wire Weight Estimator',
  material: 'Material Cost Estimator',
  waste: 'Production Waste',
  profit: 'Revenue & Profit Analysis',
}

const INITIAL_INPUTS: WireProductionInputs = {
  diameterMm: 2.5,
  lengthM: 1000,
  density: ALUMINIUM_DENSITY_G_PER_CM3,
  materialPricePerKg: 2.4,
  wastePercent: 7,
  sellPricePerKg: 3.6,
  additionalCosts: 600,
}

function App() {
  const [view, setView] = useState<ViewId>('home')
  const [inputs, setInputs] = useState<WireProductionInputs>(INITIAL_INPUTS)

  // Shared conductor state
  const [selectedConductor, setSelectedConductor] = useState<Conductor>(
    conductors.find((c) => c.id === 'moose') ?? conductors[0]
  )

  // Sync conductor data into calculator inputs
  useEffect(() => {
    setInputs((prev) => ({
      ...prev,
      diameterMm: selectedConductor.diameter,
    }))
  }, [selectedConductor])

  const snapshot = useMemo(() => computeProductionSnapshot(inputs), [inputs])

  function updateInput<K extends keyof WireProductionInputs>(
    key: K,
    value: WireProductionInputs[K]
  ) {
    setInputs((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="app">
      <Sidebar active={view} onSelect={setView} />

      <main className="app__main">
        {view !== 'home' && (
          <header className="app__header">
            <div>
              <p className="app__eyebrow">Conductor Manufacturing Intelligence</p>
              <h1 className="app__title">{TITLES[view]}</h1>
            </div>

            <button className="app__back" onClick={() => setView('home')}>
              ← Overview
            </button>
          </header>
        )}

        {view === 'home' && (
          <>
            <div style={{ marginBottom: '1.75rem' }}>
              <ConductorSelector
                selected={selectedConductor}
                onSelect={setSelectedConductor}
              />
            </div>

            <Home
              snapshot={snapshot}
              onNavigate={setView}
              selectedConductor={selectedConductor}
              onConductorChange={setSelectedConductor}
            />
          </>
        )}

        {view === 'weight' && (
          <WeightCalculator
            diameterMm={inputs.diameterMm}
            lengthM={inputs.lengthM}
            density={inputs.density}
            onDiameterChange={(v) => updateInput('diameterMm', v)}
            onLengthChange={(v) => updateInput('lengthM', v)}
            onDensityChange={(v) => updateInput('density', v)}
            outputWeightKg={snapshot.outputWeightKg}
          />
        )}

        {view === 'material' && (
          <MaterialCostCalculator
            diameterMm={inputs.diameterMm}
            lengthM={inputs.lengthM}
            materialPricePerKg={inputs.materialPricePerKg}
            onPriceChange={(v) => updateInput('materialPricePerKg', v)}
            inputWeightKg={snapshot.inputWeightKg}
            materialCost={snapshot.materialCost}
          />
        )}

        {view === 'waste' && (
          <WasteCalculator
            wastePercent={inputs.wastePercent}
            onWastePercentChange={(v) => updateInput('wastePercent', v)}
            outputWeightKg={snapshot.outputWeightKg}
            inputWeightKg={snapshot.inputWeightKg}
            wasteWeightKg={snapshot.wasteWeightKg}
          />
        )}

        {view === 'profit' && (
          <ProfitCalculator
            sellPricePerKg={inputs.sellPricePerKg}
            additionalCosts={inputs.additionalCosts}
            onSellPriceChange={(v) => updateInput('sellPricePerKg', v)}
            onAdditionalCostsChange={(v) => updateInput('additionalCosts', v)}
            outputWeightKg={snapshot.outputWeightKg}
            materialCost={snapshot.materialCost}
            profit={snapshot.profit}
          />
        )}
      </main>
    </div>
  )
}

export default App
