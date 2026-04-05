import { useState } from "react"
import { Plus, Trash2, Edit2 } from "lucide-react"
import { type ExpenseItem, type Frequency, type ExpenseCategory } from "../hooks/finance"

interface ExpenseManagerProps {
  expenses: ExpenseItem[]
  setExpenses: (expenses: ExpenseItem[]) => void
}

const FREQUENCY_LABELS: Record<Frequency, string> = {
  weekly: "Semanal",
  biweekly: "Quincenal",
  monthly: "Mensual",
  quarterly: "Trimestral",
  annual: "Anual",
}

const EXPENSE_CATEGORIES: { value: ExpenseCategory; label: string }[] = [
  { value: "housing", label: "Vivienda" },
  { value: "utilities", label: "Servicios" },
  { value: "food", label: "Alimentos" },
  { value: "transportation", label: "Transporte" },
  { value: "entertainment", label: "Entretenimiento" },
  { value: "healthcare", label: "Salud" },
  { value: "education", label: "Educación" },
  { value: "subscriptions", label: "Suscripciones" },
  { value: "insurance", label: "Seguros" },
  { value: "other", label: "Otro" },
]

export function ExpenseManager({ expenses, setExpenses }: ExpenseManagerProps) {
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    frequency: "monthly" as Frequency,
    category: "housing" as ExpenseCategory,
    isFixed: false,
    notes: "",
  })

  const handleAdd = () => {
    if (formData.name && formData.amount) {
      const newExpense: ExpenseItem = {
        id: editingId || Date.now().toString(),
        name: formData.name,
        amount: parseFloat(formData.amount),
        frequency: formData.frequency,
        category: formData.category,
        isFixed: formData.isFixed,
        notes: formData.notes,
        isActive: true,
      }

      if (editingId) {
        setExpenses(expenses.map(e => (e.id === editingId ? newExpense : e)))
      } else {
        setExpenses([...expenses, newExpense])
      }

      setFormData({ name: "", amount: "", frequency: "monthly", category: "housing", isFixed: false, notes: "" })
      setEditingId(null)
      setShowForm(false)
    }
  }

  const handleEdit = (expense: ExpenseItem) => {
    setFormData({
      name: expense.name,
      amount: expense.amount.toString(),
      frequency: expense.frequency,
      category: expense.category,
      isFixed: expense.isFixed,
      notes: expense.notes || "",
    })
    setEditingId(expense.id)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id))
  }

  const handleToggle = (id: string) => {
    setExpenses(expenses.map(e => (e.id === id ? { ...e, isActive: !e.isActive } : e)))
  }

  const totalMonthly = expenses.reduce((sum, expense) => sum + (expense.isActive ? expense.amount : 0), 0)
  const fixedExpenses = expenses.filter(e => e.isActive && e.isFixed).reduce((sum, e) => sum + e.amount, 0)
  const variableExpenses = expenses.filter(e => e.isActive && !e.isFixed).reduce((sum, e) => sum + e.amount, 0)

  return (
    <div className="space-y-6">
      {showForm && (
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold">{editingId ? "Editar Gasto" : "Agregar Nuevo Gasto"}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nombre del gasto"
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
              onChange={(e) => setFormData({ ...formData, category: e.target.value as ExpenseCategory })}
              className="bg-background border border-border rounded px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {EXPENSE_CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isFixed}
              onChange={(e) => setFormData({ ...formData, isFixed: e.target.checked })}
              className="w-4 h-4 cursor-pointer"
            />
            <span className="text-sm font-medium">¿Es un gasto fijo?</span>
          </label>

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
                setFormData({ name: "", amount: "", frequency: "monthly", category: "housing", isFixed: false, notes: "" })
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
          Agregar Gasto
        </button>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Total de Gastos</p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">
            ${totalMonthly.toLocaleString("es-ES")}
          </p>
        </div>
        <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Gastos Fijos</p>
          <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            ${fixedExpenses.toLocaleString("es-ES")}
          </p>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Gastos Variables</p>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            ${variableExpenses.toLocaleString("es-ES")}
          </p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">Nombre</th>
                <th className="text-left px-4 py-3 font-semibold">Categoría</th>
                <th className="text-right px-4 py-3 font-semibold">Monto</th>
                <th className="text-center px-4 py-3 font-semibold">Frecuencia</th>
                <th className="text-center px-4 py-3 font-semibold">Tipo</th>
                <th className="text-center px-4 py-3 font-semibold">Activo</th>
                <th className="text-center px-4 py-3 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {expenses.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-muted-foreground">
                    No hay gastos agregados
                  </td>
                </tr>
              ) : (
                expenses.map((expense) => (
                  <tr key={expense.id} className={`border-b border-border ${!expense.isActive ? "opacity-50" : ""}`}>
                    <td className="px-4 py-3">{expense.name}</td>
                    <td className="px-4 py-3">{EXPENSE_CATEGORIES.find(c => c.value === expense.category)?.label}</td>
                    <td className="text-right px-4 py-3 font-semibold text-red-600 dark:text-red-400">
                      ${expense.amount.toLocaleString()}
                    </td>
                    <td className="text-center px-4 py-3">{FREQUENCY_LABELS[expense.frequency]}</td>
                    <td className="text-center px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded ${expense.isFixed ? "bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200" : "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"}`}>
                        {expense.isFixed ? "Fijo" : "Variable"}
                      </span>
                    </td>
                    <td className="text-center px-4 py-3">
                      <input
                        type="checkbox"
                        checked={expense.isActive}
                        onChange={() => handleToggle(expense.id)}
                        className="w-4 h-4 cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-3 flex gap-2 justify-center">
                      <button
                        onClick={() => handleEdit(expense)}
                        className="p-1.5 hover:bg-secondary rounded transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(expense.id)}
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
    </div>
  )
}
