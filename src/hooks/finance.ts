import { useCallback } from "react"

export type Frequency = "weekly" | "biweekly" | "monthly" | "quarterly" | "annual"
export type IncomeCategory = "salary" | "freelance" | "investment" | "bonus" | "business" | "other"
export type ExpenseCategory = "housing" | "utilities" | "food" | "transportation" | "entertainment" | "healthcare" | "education" | "subscriptions" | "insurance" | "other"

export interface IncomeItem {
  id: string
  name: string
  amount: number
  frequency: Frequency
  category: IncomeCategory
  notes?: string
  isActive: boolean
}

export interface ExpenseItem {
  id: string
  name: string
  amount: number
  frequency: Frequency
  category: ExpenseCategory
  notes?: string
  isActive: boolean
  isFixed: boolean
}

export interface FinancialGoal {
  id: string
  name: string
  targetAmount: number
  currentAmount: number
  timeframeMonths: number
  priority: "high" | "medium" | "low"
}

export interface FinancialSnapshot {
  period: string
  monthlyIncome: number
  monthlyExpenses: number
  monthlyBalance: number
  savingsRate: number
  incomeByCategory: Record<IncomeCategory, number>
  expenseByCategory: Record<ExpenseCategory, number>
}

export function useFinance() {
  const normalizeToMonthly = useCallback((amount: number, frequency: Frequency): number => {
    switch (frequency) {
      case "weekly":
        return amount * 52 / 12
      case "biweekly":
        return amount * 26 / 12
      case "quarterly":
        return amount * 4 / 12
      case "annual":
        return amount / 12
      default:
        return amount
    }
  }, [])

  const calculateSnapshot = useCallback((incomes: IncomeItem[], expenses: ExpenseItem[]) => {
    const activeIncomes = incomes.filter(i => i.isActive)
    const activeExpenses = expenses.filter(e => e.isActive)

    const monthlyIncome = activeIncomes.reduce(
      (sum, income) => sum + normalizeToMonthly(income.amount, income.frequency),
      0
    )

    const monthlyExpenses = activeExpenses.reduce(
      (sum, expense) => sum + normalizeToMonthly(expense.amount, expense.frequency),
      0
    )

    const monthlyBalance = monthlyIncome - monthlyExpenses
    const savingsRate = monthlyIncome > 0 ? (monthlyBalance / monthlyIncome) * 100 : 0

    // Categorize incomes
    const incomeByCategory = {} as Record<IncomeCategory, number>
    const incomeCategoryList: IncomeCategory[] = ["salary", "freelance", "investment", "bonus", "business", "other"]
    incomeCategoryList.forEach(cat => { incomeByCategory[cat] = 0 })
    
    activeIncomes.forEach(income => {
      incomeByCategory[income.category] += normalizeToMonthly(income.amount, income.frequency)
    })

    // Categorize expenses
    const expenseByCategory = {} as Record<ExpenseCategory, number>
    const expenseCategoryList: ExpenseCategory[] = ["housing", "utilities", "food", "transportation", "entertainment", "healthcare", "education", "subscriptions", "insurance", "other"]
    expenseCategoryList.forEach(cat => { expenseByCategory[cat] = 0 })
    
    activeExpenses.forEach(expense => {
      expenseByCategory[expense.category] += normalizeToMonthly(expense.amount, expense.frequency)
    })

    return {
      monthlyIncome,
      monthlyExpenses,
      monthlyBalance,
      savingsRate,
      incomeByCategory,
      expenseByCategory,
    }
  }, [normalizeToMonthly])

  const projectFinances = useCallback((
    incomes: IncomeItem[],
    expenses: ExpenseItem[],
    months: number = 12
  ) => {
    const snapshot = calculateSnapshot(incomes, expenses)
    const projection = []

    let cumulativeSavings = 0

    for (let i = 1; i <= months; i++) {
      cumulativeSavings += snapshot.monthlyBalance
      projection.push({
        period: i,
        periodName: `Mes ${i}`,
        income: snapshot.monthlyIncome * i,
        expenses: snapshot.monthlyExpenses * i,
        balance: snapshot.monthlyBalance * i,
        cumulative: cumulativeSavings,
        savingsRate: snapshot.savingsRate,
      })
    }

    return projection
  }, [calculateSnapshot])

  return { normalizeToMonthly, calculateSnapshot, projectFinances }
}
