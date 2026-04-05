import { useState } from "react"
import { ThemeToggle } from "./components/theme-toggle"
import { type ExpenseItem, type IncomeItem } from "./hooks/finance"
import { Dashboard } from "./components/dashboard"
import { IncomeManager } from "./components/income-manager"
import { ExpenseManager } from "./components/expense-manager"
import { AnalysisPanel } from "./components/analysis-panel"

function App() {
  const [incomes, setIncomes] = useState<IncomeItem[]>([
    { id: "1", name: "Salario Mensual", amount: 2500, frequency: "monthly", category: "salary", isActive: true },
  ])

  const [expenses, setExpenses] = useState<ExpenseItem[]>([
    { id: "1", name: "Vivienda", amount: 900, frequency: "monthly", category: "housing", isActive: true, isFixed: true },
    { id: "2", name: "Servicios", amount: 150, frequency: "monthly", category: "utilities", isActive: true, isFixed: true },
  ])

  const [activeTab, setActiveTab] = useState<"dashboard" | "incomes" | "expenses" | "analysis">("dashboard")

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95 text-foreground transition-colors">
      <div className="fixed top-0 right-0 p-4 z-50"><ThemeToggle /></div>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold"> Simulador Financiero</h1>
 
        </header>

        <div className="flex flex-wrap gap-2 mb-6">
          {[
            ["dashboard", " Dashboard"],
            ["incomes", " Ingresos"],
            ["expenses", " Gastos"],
            ["analysis", " Análisis"],
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as "dashboard" | "incomes" | "expenses" | "analysis")}
              className={`px-3 py-2 rounded-lg font-medium ${activeTab === id ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
            >
              {label}
            </button>
          ))}
        </div>

        {activeTab === "dashboard" && (
          <Dashboard incomes={incomes} expenses={expenses} />
        )}

        {activeTab === "incomes" && (
          <IncomeManager incomes={incomes} setIncomes={setIncomes} />
        )}

        {activeTab === "expenses" && (
          <ExpenseManager expenses={expenses} setExpenses={setExpenses} />
        )}

        {activeTab === "analysis" && (
          <AnalysisPanel incomes={incomes} expenses={expenses} />
        )}
      </div>
    </div>
  )
}

export default App

