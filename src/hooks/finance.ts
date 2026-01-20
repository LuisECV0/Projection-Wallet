export type Frequency = "weekly" | "monthly" | "annual"

export type Income = {
  id: number
  name: string
  amount: number
  frequency: Frequency
}

export type Expense = {
  id: number
  name: string
  amount: number
  frequency: Frequency
}

export type SavingsGoal = {
  targetAmount: number
  months: number
}
