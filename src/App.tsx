import { useState } from "react"
import { ThemeToggle } from "./components/theme-toggle"
import { WelcomeScreen } from "./components/welcome-screen"
import { StepIndicator } from "./components/step-indicator"
import { IncomeStep } from "./components/income-step"
import { ExpenseStep } from "./components/expense-step"
import { SavingsGoalStep } from "./components/savings-goal-step"
import { ResultsStep } from "./components/results-step"
import "./App.css"
import type { Income, Expense, SavingsGoal } from "./hooks/finance"

function App() {
  const [started, setStarted] = useState<boolean>(false)
  const [currentStep, setCurrentStep] = useState<number>(1)

const [incomes, setIncomes] = useState<Income[]>([])
const [expenses, setExpenses] = useState<Expense[]>([])
const [savingsGoal, setSavingsGoal] = useState<SavingsGoal | null>(null)

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleReset = () => {
    setStarted(false)
    setCurrentStep(1)
    setIncomes([])
    setExpenses([])
    setSavingsGoal(null)
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <div className="fixed top-0 right-0 p-4">
        <ThemeToggle />
      </div>

      {!started ? (
        <WelcomeScreen onStart={() => setStarted(true)} />
      ) : (
        <div className="max-w-4xl mx-auto px-4 py-8">
        <StepIndicator currentStep={currentStep} totalSteps={4} />

          <div className="mt-8">
            {currentStep === 1 && (
              <IncomeStep
                incomes={incomes}
                setIncomes={setIncomes}
                onNext={handleNext}
              />
            )}

            {currentStep === 2 && (
              <ExpenseStep
                expenses={expenses}
                setExpenses={setExpenses}
                onPrevious={handlePrevious}
                onNext={handleNext}
              />
            )}

            {currentStep === 3 && (
              <SavingsGoalStep
                savingsGoal={savingsGoal}
                setSavingsGoal={setSavingsGoal}
                onPrevious={handlePrevious}
                onNext={handleNext}
              />
            )}

            {currentStep === 4 && (
              <ResultsStep
                incomes={incomes}
                expenses={expenses}
                savingsGoal={savingsGoal}
                onPrevious={handlePrevious}
                onReset={handleReset}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
