# 💰 Simulador Financiero Avanzado

Un simulador financiero interactivo y profesional que te permite analizar tu situación económica en detalle y proyectar tu futuro financiero.

## 🎯 Características Principales

### 📊 Dashboard Inteligente
- **Overview de Ingresos y Gastos**: Visualiza tus ingresos, gastos y balance mensual en tarjetas informativas
- **Tasa de Ahorro**: Calcula automáticamente qué porcentaje de tus ingresos estás ahorrando
- **Alertas Inteligentes**: Recibe avisos si tus gastos superan los ingresos o si tu tasa de ahorro es muy baja
- **Proyección a 12 Meses**: Gráfico interactivo que muestra cómo crecerán tus ahorros en el tiempo

### 📈 Gestor de Ingresos
- Agrega múltiples fuentes de ingresos:
  - Salario
  - Trabajo Freelance
  - Inversiones
  - Bonificaciones
  - Negocio Propio
  - Otros ingresos
- Define la frecuencia: Semanal, Quincenal, Mensual, Trimestral o Anual
- Sistema automático de normalización a valores mensuales
- Activa/desactiva ingresos sin eliminarlos

### 📉 Gestor de Gastos
- Categoriza tus gastos:
  - Vivienda
  - Servicios
  - Alimentos
  - Transporte
  - Entretenimiento
  - Salud
  - Educación
  - Suscripciones
  - Seguros
  - Otros
- Clasifica gastos como **Fijos** o **Variables**
- Control total con tabla de todos los gastos
- Visualización del total por tipo

### 🔍 Panel de Análisis Avanzado

#### Tabla Detallada
- Proyección mes a mes con:
  - Ingresos totales
  - Gastos totales
  - Balance mensual
  - Ahorros acumulados
  - Tasa de ahorro

#### Modo "¿Qué pasaría si...?"
- **Ajusta tus ingresos**: Simula un aumento o disminución de ingresos (0% a 200%)
- **Ajusta tus gastos**: Simula cambios en gastos (0% a 200%)
- **Proyecta períodos**: Analiza desde 1 mes hasta 5 años (60 meses)
- **Comparación visual**: Ve lado a lado el escenario actual vs el simulado

### 🎨 Interfaz Moderna
- **Modo Claro/Oscuro**: Alterna entre temas para tu comodidad
- **Diseño Responsivo**: Funciona perfectamente en desktop, tablet y mobile
- **Gráficos Interactivos**: Visualización con Recharts
- **Tailwind CSS**: Estilo moderno y consistente

## 🚀 Cómo Usar

### Paso 1: Agregar Ingresos
1. Ve a la pestaña **📈 Ingresos**
2. Haz clic en **Agregar Ingreso**
3. Completa el formulario:
   - Nombre del ingreso
   - Monto
   - Frecuencia
   - Categoría
   - Notas (opcional)
4. Haz clic en **Agregar**

### Paso 2: Agregar Gastos
1. Ve a la pestaña **📉 Gastos**
2. Haz clic en **Agregar Gasto**
3. Completa el formulario:
   - Nombre del gasto
   - Monto
   - Frecuencia
   - Categoría
   - Tipo (Fijo/Variable)
   - Notas (opcional)
4. Haz clic en **Agregar**

### Paso 3: Revisar Dashboard
1. Ve a la pestaña **📊 Dashboard**
2. Observa tu situación financiera:
   - Overview de números clave
   - Alertas si hay problemas
   - Gráficos de proyección
   - Desglose por categoría

### Paso 4: Analizar Escenarios
1. Ve a la pestaña **🔍 Análisis**
2. Visualiza la tabla de proyección detallada
3. Activa el modo **"¿Qué pasaría si...?"**
4. Ajusta los sliders para simular diferentes escenarios
5. Ve en tiempo real cómo cambia tu proyección

## 📋 Interfaz de Usuario

### Pestaña Dashboard
- Tarjetas de resumen
- Alertas de salud financiera
- Gráfico de proyección acumulada
- Desglose por categoría

### Pestaña Ingresos
- Formulario para agregar ingresos
- Tabla completa con todos los ingresos
- Botones de editar/eliminar
- Total de ingresos mensuales

### Pestaña Gastos
- Formulario para agregar gastos
- Tabla completa con todos los gastos
- Clasificación Fijo/Variable
- Totales desglosados

### Pestaña Análisis
- Tabla de proyección mes a mes
- Modo "¿Qué pasaría si...?" con sliders
- Gráfico de comparación de escenarios
- Estadísticas resumidas

## 🧮 Cálculos

### Normalización de Frecuencias
- **Semanal**: × 52 ÷ 12 = valor mensual
- **Quincenal**: × 26 ÷ 12 = valor mensual
- **Mensual**: valor tal cual
- **Trimestral**: × 4 ÷ 12 = valor mensual
- **Anual**: ÷ 12 = valor mensual

### Tasa de Ahorro
```
Tasa de Ahorro = (Ingresos Mensuales - Gastos Mensuales) / Ingresos Mensuales × 100%
```

### Proyección Acumulada
```
Ahorros Acumulados = Balance Mensual × Número de Meses
```

## 💡 Consejos Financieros

- **Tasa de Ahorro Mínima**: Intenta ahorrar al menos 20% de tus ingresos
- **Emergencia**: Ten preparados 3-6 meses de gastos en caso de emergencia
- **Deuda**: Si tienes deuda, prioriza pagarla antes de invertir
- **Balance**: Mantén un balance entre necesidades, lujos y ahorros (50-30-20)

## 🛠️ Tecnologías

- **React 19**: Framework principal
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Estilos
- **Recharts**: Gráficos interactivos
- **Lucide React**: Iconos
- **Vite**: Empaquetador

## 📦 Estructura del Proyecto

```
src/
├── components/
│   ├── dashboard.tsx              # Dashboard principal
│   ├── financial-overview.tsx     # Tarjetas de overview
│   ├── income-manager.tsx         # Gestor de ingresos
│   ├── expense-manager.tsx        # Gestor de gastos
│   ├── analysis-panel.tsx         # Panel de análisis
│   ├── projection-chart.tsx       # Gráfico de proyección
│   ├── category-breakdown.tsx     # Desglose por categoría
│   ├── alerts-panel.tsx           # Panel de alertas
│   ├── theme-toggle.tsx           # Toggle de tema
│   └── ...otros componentes
├── hooks/
│   ├── finance.ts                 # Lógica de cálculos financieros
│   ├── use-mobile.ts              # Hook para detectar mobile
│   └── use-toast.ts               # Hook para notificaciones
├── lib/
│   └── utils.ts                   # Utilidades
├── App.tsx                        # Componente principal
└── main.tsx                       # Punto de entrada
```

## 🎨 Paleta de Colores

- **Ingresos**: Verde (#10b981)
- **Gastos**: Rojo (#ef4444)
- **Ahorros**: Azul (#3b82f6)
- **Tasa de Ahorro**: Púrpura (#8b5cf6)

## 📱 Responsividad

- **Mobile**: Diseño adaptado para pantallas pequeñas
- **Tablet**: Optimizado para tablets
- **Desktop**: Experiencia completa con gráficos grandes

## 🔐 Privacidad

Todos tus datos se guardan localmente en tu navegador. No se envía información a servidores externos.

## 📝 Notas

- Los gastos y ingresos marcados como inactivos no se cuentan en los cálculos
- Puedes editar o eliminar cualquier ingreso o gasto en cualquier momento
- Las proyecciones se actualizan en tiempo real
- El modo "¿Qué pasaría si...?" no modifica tus datos reales

## 🚀 Instalación y Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa de producción
npm run preview
```

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

**Última actualización**: Enero 2026
**Versión**: 2.0
