import { useState } from "react"
import { Plus, Trash2, Edit2 } from "lucide-react"
import { type IncomeItem, type Frequency, type IncomeCategory } from "../hooks/finance"

interface IncomeManagerProps {
  incomes: IncomeItem[]
  setIncomes: (incomes: IncomeItem[]) => void
}

const FREQUENCY_LABELS: Record<Frequency, string> = {
  weekly: "Semanal",
  biweekly: "Quincenal",
  monthly: "Mensual",
  quarterly: "Trimestral",
  annual: "Anual",
}

const INCOME_CATEGORIES: { value: IncomeCategory; label: string }[] = [
  { value: "salary", label: "Salario" },
  { value: "freelance", label: "Trabajo Freelance" },
  { value: "investment", label: "Inversiones" },
  { value: "bonus", label: "Bonificaciones" },
  { value: "business", label: "Negocio Propio" },
  { value: "other", label: "Otro" },
]

export function IncomeManager({ incomes, setIncomes }: IncomeManagerProps) {
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    frequency: "monthly" as Frequency,
    category: "salary" as IncomeCategory,
    notes: "",
  })

  const handleAdd = () => {
    if (formData.name && formData.amount) {
      const newIncome: IncomeItem = {
        id: editingId || Date.now().toString(),
        name: formData.name,
        amount: parseFloat(formData.amount),
        frequency: formData.frequency,
        category: formData.category,
        notes: formData.notes,
        isActive: true,
      }

      if (editingId) {
        setIncomes(incomes.map(i => (i.id === editingId ? newIncome : i)))
      } else {
        setIncomes([...incomes, newIncome])
      }

      setFormData({ name: "", amount: "", frequency: "monthly", category: "salary", notes: "" })
      setEditingId(null)
      setShowForm(false)
    }
  }

  const handleEdit = (income: IncomeItem) => {
    setFormData({
      name: income.name,
      amount: income.amount.toString(),
      frequency: income.frequency,
      category: income.category,
      notes: income.notes || "",
    })
    setEditingId(income.id)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    setIncomes(incomes.filter(i => i.id !== id))
  }

  const handleToggle = (id: string) => {
    setIncomes(incomes.map(i => (i.id === id ? { ...i, isActive: !i.isActive } : i)))
  }

  const totalMonthly = incomes.reduce((sum, income) => sum + (income.isActive ? income.amount : 0), 0)

  return (
    <div className="space-y-6">
   
      {showForm && (
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold">{editingId ? "Editar Ingreso" : "Agregar Nuevo Ingreso"}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nombre del ingreso"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-background border border-border rounded px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <input
              type="number"
              placeholder="Monto"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="bg-background border border-border rounded px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <select
              value={formData.frequency}
              onChange={(e) => setFormData({ ...formData, frequency: e.target.value as Frequency })}
              className="bg-background border border-border rounded px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {Object.entries(FREQUENCY_LABELS).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>

            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as IncomeCategory })}
              className="bg-background border border-border rounded px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {INCOME_CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <textarea
            placeholder="Notas (opcional)"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full bg-background border border-border rounded px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            rows={2}
          />

          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-primary text-primary-foreground rounded font-medium hover:bg-primary/90 transition-colors"
            >
              {editingId ? "Actualizar" : "Agregar"}
            </button>
            <button
              onClick={() => {
                setShowForm(false)
                setEditingId(null)
                setFormData({ name: "", amount: "", frequency: "monthly", category: "salary", notes: "" })
              }}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded font-medium hover:bg-secondary/80 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Agregar Ingreso
        </button>
      )}

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">Nombre</th>
                <th className="text-left px-4 py-3 font-semibold">Categoría</th>
                <th className="text-right px-4 py-3 font-semibold">Monto</th>
                <th className="text-center px-4 py-3 font-semibold">Frecuencia</th>
                <th className="text-center px-4 py-3 font-semibold">Activo</th>
                <th className="text-center px-4 py-3 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {incomes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-muted-foreground">
                    No hay ingresos agregados
                  </td>
                </tr>
              ) : (
                incomes.map((income) => (
                  <tr key={income.id} className={`border-b border-border ${!income.isActive ? "opacity-50" : ""}`}>
                    <td className="px-4 py-3">{income.name}</td>
                    <td className="px-4 py-3">{INCOME_CATEGORIES.find(c => c.value === income.category)?.label}</td>
                    <td className="text-right px-4 py-3 font-semibold text-green-600 dark:text-green-400">
                      ${income.amount.toLocaleString()}
                    </td>
                    <td className="text-center px-4 py-3">{FREQUENCY_LABELS[income.frequency]}</td>
                    <td className="text-center px-4 py-3">
                      <input
                        type="checkbox"
                        checked={income.isActive}
                        onChange={() => handleToggle(income.id)}
                        className="w-4 h-4 cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-3 flex gap-2 justify-center">
                      <button
                        onClick={() => handleEdit(income)}
                        className="p-1.5 hover:bg-secondary rounded transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(income.id)}
                        className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900 rounded transition-colors text-red-600 dark:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {incomes.length > 0 && (
        <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Total de Ingresos Mensuales</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            ${totalMonthly.toLocaleString("es-ES")}
          </p>
        </div>
      )}
    </div>
  )
}
