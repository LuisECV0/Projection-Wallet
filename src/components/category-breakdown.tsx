import { Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"

interface CategoryBreakdownProps {
  snapshot: {
    monthlyIncome: number
    monthlyExpenses: number
    monthlyBalance: number
    savingsRate: number
    incomeByCategory: Record<string, number>
    expenseByCategory: Record<string, number>
  }
}

export function CategoryBreakdown({ snapshot }: CategoryBreakdownProps) {
  const incomeData = Object.entries(snapshot.incomeByCategory)
    .filter(([_, value]) => value > 0)
    .map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value: Math.round(value * 100) / 100,
    }))

  const expenseData = Object.entries(snapshot.expenseByCategory)
    .filter(([_, value]) => value > 0)
    .map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value: Math.round(value * 100) / 100,
    }))

  const formatCurrency = (value: number) => `$${value.toLocaleString()}`

  return (
    <div className="space-y-6">

      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Ingresos por Categoría</h3>
        {incomeData.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={incomeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip formatter={(value: number | undefined) => value !== undefined ? formatCurrency(value) : ""} contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-muted-foreground text-center py-8">Sin ingresos agregados</p>
        )}
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Gastos por Categoría</h3>
        {expenseData.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={expenseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip formatter={(value: number | undefined) => value !== undefined ? formatCurrency(value) : ""} contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} />
              <Bar dataKey="value" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-muted-foreground text-center py-8">Sin gastos agregados</p>
        )}
      </div>
    </div>
  )
}
