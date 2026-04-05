import { useMemo } from "react"
import { useFinance, type IncomeItem, type ExpenseItem } from "../hooks/finance"
import { FinancialOverview } from "./financial-overview"
import { ProjectionChart } from "./projection-chart"
import { CategoryBreakdown } from "./category-breakdown"
import { AlertsPanel } from "./alerts-panel"

interface DashboardProps {
  incomes: IncomeItem[]
  expenses: ExpenseItem[]
}

export function Dashboard({ incomes, expenses }: DashboardProps) {
  const { calculateSnapshot, projectFinances } = useFinance()

  const snapshot = useMemo(() => {
    return calculateSnapshot(incomes, expenses)
  }, [incomes, expenses, calculateSnapshot])

  const projection = useMemo(() => {
    return projectFinances(incomes, expenses, 12)
  }, [incomes, expenses, projectFinances])

  return (
    <div className="space-y-6">

      <FinancialOverview snapshot={snapshot} />

      <AlertsPanel snapshot={snapshot} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProjectionChart projection={projection} />
        <CategoryBreakdown snapshot={snapshot} />
      </div>
    </div>
  )
}
