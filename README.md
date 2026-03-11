# Dinametra CoinGecko Dashboard

Dashboard interactivo en React + TypeScript que consume la API pública de **CoinGecko** para visualizar métricas y gráficas de criptomonedas en tiempo real.

Incluye:
- Menú inicial para elegir criptomoneda/moneda base

<img width="875" height="576" alt="image" src="https://github.com/user-attachments/assets/14cf37ca-2a7a-47a5-98f6-5a8e3334ab3c" />
- Dashboard con KPIs + gráficas (Chart.js)
- Filtros (cripto, moneda base, rango)
- Manejo de estados: loading, empty, error + retry
- Estilos con Tailwind CSS
- Pruebas unitarias con Vitest + Testing Library
<img width="961" height="569" alt="image" src="https://github.com/user-attachments/assets/78b86407-341c-45ec-9ed1-07ae36ec28c8" />


## Demo
- Live: https://dinametra-dashboard.vercel.app/
- Repo: https://github.com/ManuAG7/dinametra-dashboard.git

---

## Tecnologías
- React + TypeScript
- Vite
- Tailwind CSS
- Chart.js + react-chartjs-2
- Axios
- TanStack React Query
- React Router DOM
- Vitest + @testing-library/react + @testing-library/user-event

---

## Arquitectura (carpetas)
  src/
    components/
        cards/ # KPI cards
        charts/ # Line/Bar charts
        filters/ # selects, tabs, filtros
        layouts/ # DashboardLayaut
        states/ # LoadingState, EmptyState, ErrorState
    hooks/ # hooks con React Query (useTopCoins/useCoinNow/useMarketChart)
    pages/ # MarketPage (menú) + DashboardPage
    services/ # coingecko.service.ts, cliente axios + funciones de CoinGecko
    assets/ # iconos / imágenes
    utils/ # chart register (chart.js)
    
<img width="276" height="293" alt="image" src="https://github.com/user-attachments/assets/7c72befc-c661-434c-bfef-e33f052d6921" />


## Funcionalidades implementadas

- Fuente: CoinGecko API
- Gráficas:
  - Line chart: Precio
  - Bar chart: Volumen
<img width="942" height="317" alt="image" src="https://github.com/user-attachments/assets/e0ca1bae-bd6c-4d8f-93b1-43da90333563" />

### Filtros 
  - Criptomoneda (Top coins)
    <img width="496" height="312" alt="image" src="https://github.com/user-attachments/assets/cf3c6205-793e-444d-90ff-2efa59cc4787" />
  - Moneda base (USD, MXN, EUR)
    <img width="473" height="203" alt="image" src="https://github.com/user-attachments/assets/4218ecf7-b7a3-4a86-a159-8b8b392eb650" />
  - Rango (1 día, 1 semana, 1 mes, 1 año)
    <img width="310" height="55" alt="image" src="https://github.com/user-attachments/assets/01ff862d-391c-4ed1-b6e3-92cd3157f4c9" />
- Tooltips y leyendas habilitadas en Chart.js

### Diseño responsivo
- Layout con Tailwind (grid/flex) adaptado a desktop y móvil
- Cards y charts responsivos

### Manejo de errores
- Caching y deduplicación de requests con React Query
- Estados de carga y error con reintento
- Nota: CoinGecko tiene rate-limit (429); se muestra mensaje amigable y botón de reintento
  <img width="950" height="112" alt="image" src="https://github.com/user-attachments/assets/bbe5041a-1fe1-4eff-8dec-aad9bc54c52f" />
  <img width="255" height="58" alt="image" src="https://github.com/user-attachments/assets/4f422801-fcd6-41e6-a802-221505725f3a" />



### Accesibilidad (básica)
- Botones con `type="button"`
- En navegación y acciones principales se usan `aria-label` donde aplica

### Pruebas unitarias
- Tests con Vitest + Testing Library:
  - `KpiCard`
  - `RangeTabs`
  <img width="789" height="256" alt="image" src="https://github.com/user-attachments/assets/95216920-0de4-4f80-a124-2610015ed7e9" />

---

## Instalación y ejecución

### Requisitos
- Node.js 18+ (recomendado 20+)
- npm

### Instalar dependencias
```bash
npm install

### Levantar en local
  npm run dev

### Build producción
  npm run build
  npm run preview

### Pruebas
  npm test
    
