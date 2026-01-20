type WelcomeScreenProps = {
  onStart: () => void
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl text-primary-foreground">💰</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-pretty">
          Financial Speculator
        </h1>

        <p className="text-lg text-muted-foreground mb-8 text-balance">
          Simulador financiero accesible para planificar tus ingresos, gastos y metas de ahorro
        </p>

        <button
          onClick={onStart}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
        >
          Comenzar
        </button>
      </div>
    </div>
  )
}
