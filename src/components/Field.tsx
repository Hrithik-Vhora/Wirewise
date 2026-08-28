interface FieldProps {
  label: string
  unit: string
  value: number
  onChange: (value: number) => void
  step?: number
  min?: number
}

export function Field({ label, unit, value, onChange, step = 0.1, min = 0 }: FieldProps) {
  return (
    <label className="field">
      <span className="field__label">
        {label}
        <span className="field__unit">{unit}</span>
      </span>
      <input
        className="field__input"
        type="number"
        inputMode="decimal"
        step={step}
        min={min}
        value={Number.isFinite(value) ? value : ''}
        onChange={(e) => onChange(e.target.valueAsNumber)}
      />
    </label>
  )
}
