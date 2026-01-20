import { useMemo } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

type Frequency = "weekly" | "monthly" | "annual"

type Income = {
  id: number
  name: string
  amount: number
  frequency: Frequency
}

type Expense = {
  id: number
  name: string
  amount: number
  frequency: Frequency
}

type SavingsGoal = {
  targetAmount: number
  months: number
}

type ResultsStepProps = {
  incomes: Income[]
  expenses: Expense[]
  savingsGoal: SavingsGoal | null
  onPrevious: () => void
  onReset: () => void
}

export function ResultsStep({
  incomes,
  expenses,
  savingsGoal,
  onPrevious,
  onReset,
}: ResultsStepProps) {
  const calculations = useMemo(() => {
    const normalizeAmount = (amount: number, frequency: Frequency): number => {
      switch (frequency) {
        case "weekly":
          return (amount * 52) / 12
        case "annual":
          return amount / 12
        default:
          return amount
      }
    }

    const monthlyIncome = incomes.reduce(
      (sum, income) => sum + normalizeAmount(income.amount, income.frequency),
      0
    )

    const monthlyExpenses = expenses.reduce(
      (sum, expense) => sum + normalizeAmount(expense.amount, expense.frequency),
      0
    )

    const monthlyBalance = monthlyIncome - monthlyExpenses

    const projectionMonths = savingsGoal?.months ?? 12
    let cumulativeSavings = 0

    const projectionData = Array.from({ length: projectionMonths }, (_, i) => {
      cumulativeSavings += monthlyBalance

      return {
        month: i + 1,
        monthName: `Mes ${i + 1}`,
        savings: Math.max(0, cumulativeSavings),
        goal: savingsGoal
          ? (savingsGoal.targetAmount / projectionMonths) * (i + 1)
          : 0,
      }
    })

    const savingsPercentage = savingsGoal
      ? Math.min(100, (cumulativeSavings / savingsGoal.targetAmount) * 100)
      : 0

    return {
      monthlyIncome,
      monthlyExpenses,
      monthlyBalance,
      projectionData,
      savingsPercentage,
      finalSavings: cumulativeSavings,
    }
  }, [incomes, expenses, savingsGoal])

  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0)
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          Paso 4: Resultados
        </h2>
        <p className="text-muted-foreground">
          Aquí está tu análisis financiero completo
        </p>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-sm text-muted-foreground mb-2">
            Balance Mensual
          </p>
          <p
            className={`text-3xl font-bold ${
              calculations.monthlyBalance >= 0
                ? "text-accent"
                : "text-destructive"
            }`}
          >
            ${calculations.monthlyBalance.toLocaleString("es-ES")}
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-sm text-muted-foreground mb-2">
            Ingresos Mensuales
          </p>
          <p className="text-3xl font-bold text-primary">
            ${calculations.monthlyIncome.toLocaleString("es-ES")}
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-sm text-muted-foreground mb-2">
            Gastos Mensuales
          </p>
          <p className="text-3xl font-bold text-destructive">
            ${calculations.monthlyExpenses.toLocaleString("es-ES")}
          </p>
        </div>
      </div>

      {/* Gráfico */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-semibold mb-4">
          Proyección de Ahorro
        </h3>
        <ResponsiveContainer width="100%" height={300}>
        <LineChart data={calculations.projectionData}>
            <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(var(--color-border))"
            opacity={0.3}
            />

            <XAxis
            dataKey="monthName"
            tick={{ fill: "hsl(var(--color-muted-foreground))", fontSize: 12 }}
            axisLine={{ stroke: "hsl(var(--color-border))" }}
            tickLine={{ stroke: "hsl(var(--color-border))" }}
            />

            <YAxis
            tick={{ fill: "hsl(var(--color-muted-foreground))", fontSize: 12 }}
            axisLine={{ stroke: "hsl(var(--color-border))" }}
            tickLine={{ stroke: "hsl(var(--color-border))" }}
            />

            <Tooltip
            formatter={(value) =>
                typeof value === "number"
                ? `$${value.toLocaleString("es-ES")}`
                : value
            }
            contentStyle={{
                backgroundColor: "hsl(var(--color-card))",
                border: "1px solid hsl(var(--color-border))",
                borderRadius: "8px",
                color: "hsl(var(--color-foreground))",
            }}
            labelStyle={{
                color: "hsl(var(--color-foreground))",
                fontWeight: 600,
            }}
            />

            <Legend
            wrapperStyle={{
                color: "hsl(var(--color-foreground))",
            }}
            />

            <Line
            type="monotone"
            dataKey="savings"
            stroke="hsl(var(--color-accent))"
            strokeWidth={2}
            dot={{
                r: 4,
                fill: "hsl(var(--color-accent))",
                stroke: "hsl(var(--color-background))",
                strokeWidth: 2,
            }}
            activeDot={{ r: 6 }}
            name="Ahorro Acumulado"
            />

            {savingsGoal && (
            <Line
                type="monotone"
                dataKey="goal"
                stroke="hsl(var(--color-primary))"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{
                r: 4,
                fill: "hsl(var(--color-primary))",
                stroke: "hsl(var(--color-background))",
                strokeWidth: 2,
                }}
                activeDot={{ r: 6 }}
                name="Meta Objetivo"
            />
            )}
        </LineChart>
        </ResponsiveContainer>

      </div>

      <div className="flex gap-4 pt-4">
        <button
          onClick={onPrevious}
          className="flex-1 bg-secondary py-3 rounded-lg font-semibold"
        >
          Anterior
        </button>
        <button
          onClick={onReset}
          className="flex-1 bg-primary py-3 rounded-lg font-semibold text-primary-foreground"
        >
          Empezar de Nuevo
        </button>
      </div>
    </div>
  )
}
