import { useState, useMemo } from "react"
import { useFinance, type IncomeItem, type ExpenseItem } from "../hooks/finance"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Sliders } from "lucide-react"

interface AnalysisPanelProps {
  incomes: IncomeItem[]
  expenses: ExpenseItem[]
}

export function AnalysisPanel({ incomes, expenses }: AnalysisPanelProps) {
  const { projectFinances } = useFinance()
  const [showWhatIf, setShowWhatIf] = useState(false)
  const [adjustments, setAdjustments] = useState({
    incomeMultiplier: 1,
    expenseMultiplier: 1,
    months: 12,
  })

  const baseProjection = useMemo(() => {
    return projectFinances(incomes, expenses, 12)
  }, [incomes, expenses, projectFinances])

  const adjustedProjection = useMemo(() => {
    if (!showWhatIf || (adjustments.incomeMultiplier === 1 && adjustments.expenseMultiplier === 1)) {
      return baseProjection
    }

    const adjustedIncomes = incomes.map(i => ({
      ...i,
      amount: i.amount * adjustments.incomeMultiplier,
    }))

    const adjustedExpenses = expenses.map(e => ({
      ...e,
      amount: e.amount * adjustments.expenseMultiplier,
    }))

    return projectFinances(adjustedIncomes, adjustedExpenses, adjustments.months)
  }, [baseProjection, incomes, expenses, adjustments, showWhatIf, projectFinances])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
    }).format(value)
  }

  const getComparisonData = () => {
    const data = []
    for (let i = 0; i < Math.min(baseProjection.length, adjustedProjection.length); i++) {
      data.push({
        month: baseProjection[i].periodName,
        base: baseProjection[i].cumulative,
        adjusted: adjustedProjection[i].cumulative,
      })
    }
    return data
  }

  return (
    <div className="space-y-6">
   
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Sliders className="w-5 h-5" />
            Modo "¿Qué pasaría si...?"
          </h3>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showWhatIf}
              onChange={(e) => setShowWhatIf(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium">Activar simulación</span>
          </label>
        </div>

        {showWhatIf && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Ingresos: {(adjustments.incomeMultiplier * 100).toFixed(0)}%
              </label>
              <input
                type="range"
                min="0"
                max="200"
                value={adjustments.incomeMultiplier * 100}
                onChange={(e) => setAdjustments({ ...adjustments, incomeMultiplier: parseFloat(e.target.value) / 100 })}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0%</span>
                <span>200%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Gastos: {(adjustments.expenseMultiplier * 100).toFixed(0)}%
              </label>
              <input
                type="range"
                min="0"
                max="200"
                value={adjustments.expenseMultiplier * 100}
                onChange={(e) => setAdjustments({ ...adjustments, expenseMultiplier: parseFloat(e.target.value) / 100 })}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0%</span>
                <span>200%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Meses a proyectar: {adjustments.months}
              </label>
              <input
                type="range"
                min="1"
                max="60"
                value={adjustments.months}
                onChange={(e) => setAdjustments({ ...adjustments, months: parseInt(e.target.value) })}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>1 mes</span>
                <span>60 meses (5 años)</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {showWhatIf && adjustments.incomeMultiplier !== 1 || adjustments.expenseMultiplier !== 1 ? (
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Comparación: Escenario Actual vs Simulado</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={getComparisonData()}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip
                formatter={(value: number | undefined) => value !== undefined ? formatCurrency(value) : ""}
                contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
              />
              <Legend />
              <Line type="monotone" dataKey="base" stroke="#3b82f6" name="Escenario Actual" />
              <Line type="monotone" dataKey="adjusted" stroke="#10b981" name="Escenario Simulado" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : null}

      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Tabla de Proyección Detallada</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted border-b border-border sticky top-0">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">Mes</th>
                <th className="text-right px-4 py-3 font-semibold">Ingresos Totales</th>
                <th className="text-right px-4 py-3 font-semibold">Gastos Totales</th>
                <th className="text-right px-4 py-3 font-semibold">Balance Mensual</th>
                <th className="text-right px-4 py-3 font-semibold">Ahorros Acumulados</th>
                <th className="text-center px-4 py-3 font-semibold">Tasa de Ahorro</th>
              </tr>
            </thead>
            <tbody>
              {adjustedProjection.map((row, idx) => (
                <tr key={idx} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3 font-medium">{row.periodName}</td>
                  <td className="text-right px-4 py-3 text-green-600 dark:text-green-400">
                    {formatCurrency(row.income)}
                  </td>
                  <td className="text-right px-4 py-3 text-red-600 dark:text-red-400">
                    {formatCurrency(row.expenses)}
                  </td>
                  <td className="text-right px-4 py-3 font-semibold">
                    {formatCurrency(row.balance)}
                  </td>
                  <td className="text-right px-4 py-3 font-bold">
                    <span className={row.cumulative >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                      {formatCurrency(row.cumulative)}
                    </span>
                  </td>
                  <td className="text-center px-4 py-3">
                    <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded text-xs font-medium">
                      {row.savingsRate.toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Ingresos Totales (12 meses)</p>
          <p className="text-xl font-bold text-green-600 dark:text-green-400">
            {formatCurrency(adjustedProjection[Math.min(11, adjustedProjection.length - 1)]?.income || 0)}
          </p>
        </div>
        <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Gastos Totales (12 meses)</p>
          <p className="text-xl font-bold text-red-600 dark:text-red-400">
            {formatCurrency(adjustedProjection[Math.min(11, adjustedProjection.length - 1)]?.expenses || 0)}
          </p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Ahorros Proyectados</p>
          <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
            {formatCurrency(adjustedProjection[adjustedProjection.length - 1]?.cumulative || 0)}
          </p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Tasa Promedio de Ahorro</p>
          <p className="text-xl font-bold text-purple-600 dark:text-purple-400">
            {(adjustedProjection.reduce((sum, p) => sum + p.savingsRate, 0) / adjustedProjection.length).toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  )
}
