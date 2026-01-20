type StepIndicatorProps = {
  currentStep: number
  totalSteps: number
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  const steps = ["Ingresos", "Gastos", "Meta de Ahorro", "Resultados"]

  return (
    <div className="flex justify-between items-center gap-2 md:gap-4">
      {steps.slice(0, totalSteps).map((step, index) => (
        <div key={index} className="flex items-center flex-1">
          <div
            className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
              index + 1 <= currentStep
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground"
            }`}
          >
            {index + 1}
          </div>
          {index + 1 < totalSteps && (
            <div
              className={`hidden md:block flex-1 h-1 mx-2 rounded transition-all ${
                index + 1 < currentStep ? "bg-primary" : "bg-secondary"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}
