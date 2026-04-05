import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface ProjectionChartProps {
  projection: Array<{
    period: number
    periodName: string
    income: number
    expenses: number
    balance: number
    cumulative: number
    savingsRate: number
  }>
}

export function ProjectionChart({ projection }: ProjectionChartProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
      notation: "compact",
    }).format(value)
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Proyección 12 Meses</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={projection}>
          <defs>
            <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="periodName" stroke="var(--muted-foreground)" />
          <YAxis stroke="var(--muted-foreground)" tickFormatter={(value) => `$${Math.round(value / 1000)}k`} />
          <Tooltip formatter={(value: number | undefined) => value !== undefined ? formatCurrency(value) : ""} contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} />
          <Area type="monotone" dataKey="cumulative" stroke="#10b981" fillOpacity={1} fill="url(#colorCumulative)" name="Ahorros Acumulados" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
