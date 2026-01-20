import { useState } from "react"
import { Trash2, Plus } from "lucide-react"

type IncomeFrequency = "monthly" | "weekly" | "annual"

type Income = {
  id: number
  name: string
  amount: number
  frequency: IncomeFrequency
}

type IncomeStepProps = {
  incomes: Income[]
  setIncomes: React.Dispatch<React.SetStateAction<Income[]>>
  onNext: () => void
}

export function IncomeStep({incomes, setIncomes, onNext,}: IncomeStepProps) {
  const [name, setName] = useState<string>("")
  const [amount, setAmount] = useState<string>("")
  const [frequency, setFrequency] = useState<IncomeFrequency>("monthly")

  const handleAddIncome = () => {
    if (!name || !amount) return

    const newIncome: Income = {
      id: Date.now(),
      name,
      amount: Number(amount),
      frequency,
    }

    setIncomes((prev) => [...prev, newIncome])

    setName("")
    setAmount("")
    setFrequency("monthly")
  }

  const handleDeleteIncome = (id: number) => {
    setIncomes((prev) => prev.filter((income) => income.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          Paso 1: Ingresos
        </h2>
        <p className="text-muted-foreground">
          Agrega tus fuentes de ingresos
        </p>
      </div>

      {/* Formulario */}
      <div className="bg-card border border-border rounded-lg p-4 md:p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Nombre del ingreso
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: Salario principal"
            className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Monto
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Frecuencia
            </label>
            <select
              value={frequency}
              onChange={(e) =>
                setFrequency(e.target.value as IncomeFrequency)
              }
              className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="monthly">Mensual</option>
              <option value="weekly">Semanal</option>
              <option value="annual">Anual</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleAddIncome}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          Agregar ingreso
        </button>
      </div>

      {/* Lista de ingresos */}
      {incomes.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">Ingresos agregados</h3>

          {incomes.map((income) => (
            <div
              key={income.id}
              className="bg-secondary border border-border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{income.name}</p>
                <p className="text-sm text-muted-foreground">
                  ${income.amount.toLocaleString("es-ES")} ·{" "}
                  {income.frequency === "monthly"
                    ? "Mensual"
                    : income.frequency === "weekly"
                    ? "Semanal"
                    : "Anual"}
                </p>
              </div>

              <button
                onClick={() => handleDeleteIncome(income.id)}
                className="text-destructive hover:bg-destructive/10 p-2 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Navegación */}
      <div className="flex gap-4 pt-4">
        <button
          onClick={onNext}
          disabled={incomes.length === 0}
          className="flex-1 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground text-primary-foreground py-3 rounded-lg font-semibold transition-all"
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}
