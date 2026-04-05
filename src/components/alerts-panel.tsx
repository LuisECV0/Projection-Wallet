import { AlertCircle, TrendingDown, Lightbulb } from "lucide-react"

interface AlertsPanelProps {
  snapshot: {
    monthlyIncome: number
    monthlyExpenses: number
    monthlyBalance: number
    savingsRate: number
    incomeByCategory: Record<string, number>
    expenseByCategory: Record<string, number>
  }
}

export function AlertsPanel({ snapshot }: AlertsPanelProps) {
  const alerts = []

  if (snapshot.monthlyBalance < 0) {
    alerts.push({
      type: "error",
      icon: AlertCircle,
      title: "Balance Negativo",
      message: `Tus gastos superan tus ingresos en ${Math.abs(snapshot.monthlyBalance).toLocaleString("es-ES", { maximumFractionDigits: 2 })} USD/mes`,
    })
  }

  if (snapshot.savingsRate < 10) {
    alerts.push({
      type: "warning",
      icon: TrendingDown,
      title: "Baja Tasa de Ahorro",
      message: `Solo estás ahorrando el ${snapshot.savingsRate.toFixed(1)}% de tus ingresos. Lo recomendado es al menos 20%`,
    })
  }

  if (snapshot.savingsRate >= 20) {
    alerts.push({
      type: "success",
      icon: Lightbulb,
      title: "Buen Balance",
      message: `Excelente! Estás ahorrando el ${snapshot.savingsRate.toFixed(1)}% de tus ingresos`,
    })
  }

  if (alerts.length === 0) return null

  return (
    <div className="space-y-3">
      {alerts.map((alert, idx) => {
        const bgColor = {
          error: "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800",
          warning: "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800",
          success: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800",
        }[alert.type]

        const textColor = {
          error: "text-red-800 dark:text-red-200",
          warning: "text-yellow-800 dark:text-yellow-200",
          success: "text-green-800 dark:text-green-200",
        }[alert.type]

        const Icon = alert.icon

        return (
          <div key={idx} className={`border rounded-lg p-4 flex gap-3 ${bgColor}`}>
            <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${textColor}`} />
            <div>
              <h4 className={`font-semibold ${textColor}`}>{alert.title}</h4>
              <p className={`text-sm ${textColor} opacity-90`}>{alert.message}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
