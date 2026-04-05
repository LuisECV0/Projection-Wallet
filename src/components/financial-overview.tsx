import { TrendingUp, TrendingDown, Target, PieChart } from "lucide-react"

interface FinancialOverviewProps {
  snapshot: {
    monthlyIncome: number
    monthlyExpenses: number
    monthlyBalance: number
    savingsRate: number
    incomeByCategory: Record<string, number>
    expenseByCategory: Record<string, number>
  }
}

export function FinancialOverview({ snapshot }: FinancialOverviewProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
    }).format(value)
  }

  const isHealthy = snapshot.monthlyBalance >= 0
  const healthColor = isHealthy ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
  const healthBg = isHealthy ? "bg-green-50 dark:bg-green-950" : "bg-red-50 dark:bg-red-950"

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
 
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">Ingresos Mensuales</h3>
          <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
        </div>
        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
          {formatCurrency(snapshot.monthlyIncome)}
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">Gastos Mensuales</h3>
          <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
        </div>
        <p className="text-2xl font-bold text-red-600 dark:text-red-400">
          {formatCurrency(snapshot.monthlyExpenses)}
        </p>
      </div>

      <div className={`border border-border rounded-lg p-6 ${healthBg}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">Balance Mensual</h3>
          <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <p className={`text-2xl font-bold ${healthColor}`}>
          {formatCurrency(snapshot.monthlyBalance)}
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">Tasa de Ahorro</h3>
          <PieChart className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        </div>
        <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
          {snapshot.savingsRate.toFixed(1)}%
        </p>
      </div>
    </div>
  )
}
