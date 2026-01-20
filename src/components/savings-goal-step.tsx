import { useState } from "react"

type SavingsGoal = {
  targetAmount: number
  months: number
}

type SavingsGoalStepProps = {
  savingsGoal: SavingsGoal | null
  setSavingsGoal: React.Dispatch<React.SetStateAction<SavingsGoal | null>>
  onPrevious: () => void
  onNext: () => void
}

export function SavingsGoalStep({
  savingsGoal,
  setSavingsGoal,
  onPrevious,
  onNext,
}: SavingsGoalStepProps) {
  const [targetAmount, setTargetAmount] = useState<string>(
    savingsGoal ? String(savingsGoal.targetAmount) : ""
  )
  const [months, setMonths] = useState<string>(
    savingsGoal ? String(savingsGoal.months) : ""
  )

  const handleSetGoal = () => {
    if (!targetAmount) return

    setSavingsGoal({
      targetAmount: Number.parseFloat(targetAmount),
      months: Number.parseInt(months) || 12,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          Paso 3: Meta de Ahorro
        </h2>
        <p className="text-muted-foreground">
          Define tu objetivo de ahorro (opcional)
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg p-4 md:p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Monto objetivo
          </label>
          <input
            type="number"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Período (meses)
          </label>
          <input
            type="number"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
            placeholder="12"
            className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {savingsGoal && (
          <div className="bg-accent/10 border border-accent rounded-lg p-4">
            <p className="text-sm font-medium text-accent-foreground">
              Meta guardada
            </p>
            <p className="text-lg font-bold">
              ${savingsGoal.targetAmount.toLocaleString("es-ES")} en{" "}
              {savingsGoal.months} meses
            </p>
          </div>
        )}
      </div>

      <div className="flex gap-4 pt-4">
        <button
          onClick={onPrevious}
          className="flex-1 bg-secondary hover:bg-secondary/90 text-foreground py-3 rounded-lg font-semibold transition-all"
        >
          Anterior
        </button>
        <button
          onClick={() => {
            handleSetGoal()
            onNext()
          }}
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg font-semibold transition-all"
        >
          Ver Resultados
        </button>
      </div>
    </div>
  )
}
