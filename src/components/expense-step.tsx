"use client"

import { useState } from "react"
import { Trash2, Plus } from "lucide-react"

export type Expense = {
  id: number
  name: string
  amount: number
  frequency: "monthly" | "weekly" | "annual"
}

type ExpenseStepProps = {
  expenses: Expense[]
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>
  onPrevious: () => void
  onNext: () => void
}

export function ExpenseStep({
  expenses,
  setExpenses,
  onPrevious,
  onNext,
}: ExpenseStepProps) {
  const [name, setName] = useState<string>("")
  const [amount, setAmount] = useState<string>("")
  const [frequency, setFrequency] = useState<Expense["frequency"]>("monthly")

  const handleAddExpense = () => {
    if (!name || !amount) return

    setExpenses((prev) => [
      ...prev,
      {
        id: Date.now(),
        name,
        amount: Number.parseFloat(amount),
        frequency,
      },
    ])

    setName("")
    setAmount("")
    setFrequency("monthly")
  }

  const handleDeleteExpense = (id: number) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          Paso 2: Gastos
        </h2>
        <p className="text-muted-foreground">
          Agrega tus gastos recurrentes
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg p-4 md:p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Nombre del gasto
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: Renta"
            className="w-full px-4 py-2 rounded-lg border border-border bg-input"
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
              className="w-full px-4 py-2 rounded-lg border border-border bg-input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Frecuencia
            </label>
            <select
              value={frequency}
              onChange={(e) =>
                setFrequency(e.target.value as Expense["frequency"])
              }
              className="w-full px-4 py-2 rounded-lg border border-border bg-input"
            >
              <option value="monthly">Mensual</option>
              <option value="weekly">Semanal</option>
              <option value="annual">Anual</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleAddExpense}
          className="w-full bg-accent hover:bg-accent/90 py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Agregar gasto
        </button>
      </div>

      {expenses.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">
            Gastos agregados
          </h3>

          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="bg-secondary border border-border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{expense.name}</p>
                <p className="text-sm text-muted-foreground">
                  ${expense.amount.toLocaleString("es-ES")} (
                  {expense.frequency === "monthly"
                    ? "Mensual"
                    : expense.frequency === "weekly"
                    ? "Semanal"
                    : "Anual"}
                  )
                </p>
              </div>

              <button
                onClick={() => handleDeleteExpense(expense.id)}
                className="text-destructive hover:bg-destructive/10 p-2 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-4 pt-4">
        <button
          onClick={onPrevious}
          className="flex-1 bg-secondary py-3 rounded-lg font-semibold"
        >
          Anterior
        </button>

        <button
          onClick={onNext}
          disabled={expenses.length === 0}
          className="flex-1 bg-primary disabled:bg-muted py-3 rounded-lg font-semibold"
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}
