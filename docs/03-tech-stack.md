# 🚀 TECH STACK — PerformAI

**Versión:** 1.0  
**Fecha:** 24 May 2026  
**Justificación:** Basado en requisitos del proyecto

---

## 📋 STACK TECNOLÓGICO SELECCIONADO

### Frontend

```
React 18
├── TypeScript
├── Tailwind CSS
└── Vite (build tool)
```

### Backend & Base de Datos

```
Firebase
├── Firestore (NoSQL)
├── Authentication (Firebase Auth)
├── Storage (archivos)
└── Cloud Functions (serverless)
```

### IA & Integraciones

```
Anthropic Claude API
├── Modelo: claude-sonnet-4-5
├── Uso: Generación de reportes
└── Configuración: .env (servidor solo)
```

### Deploy & DevOps

```
Firebase Hosting (Frontend)
Firebase Cloud Functions (Backend)
GitHub (Versionamiento)
```

---

## 🔍 DECISIONES TÉCNICAS JUSTIFICADAS

### ¿Por qué React 18 + TypeScript?

**Pros:**

- ✅ Tipado fuerte con TypeScript (menos bugs)
- ✅ Componentes reutilizables (fácil mantenimiento)
- ✅ Comunidad amplia, libs maduras
- ✅ Performance con React.memo, lazy loading
- ✅ Testing con React Testing Library

**Cons:**

- ❌ Curva de aprendizaje
- ❌ Setup inicial más complejo

**Alternativas consideradas:**

- Vue 3 (más fácil, menos ecosystem)
- Next.js (más pesado, pero mejor para SEO)

---

### ¿Por qué Tailwind CSS?

**Pros:**

- ✅ Utility-first (rápido en desarrollo)
- ✅ Pequeño bundle (purga CSS no usado)
- ✅ Consistencia visual (theme colors)
- ✅ Responsive built-in
- ✅ Dark mode ready

**Cons:**

- ❌ HTML con muchas clases
- ❌ Requiere customización (colores PerformAI)

**Alternativas consideradas:**

- Styled-components (más flexible, más overhead JS)
- CSS Modules (más verbose)
- Material-UI (más componentes, menos control)

---

### ¿Por qué Firestore (NO SQL)?

**Pros:**

- ✅ Escalabilidad horizontal (sin límites)
- ✅ Real-time listeners (live updates)
- ✅ Sync automático cliente-servidor
- ✅ Security Rules integradas (sin RLS manual)
- ✅ No requiere gestión de servidor
- ✅ Storage de archivos integrado

**Cons:**

- ❌ Modelo NoSQL (denormalización)
- ❌ Queries limitadas vs SQL
- ❌ Costo por lectura (no por GB)

**Alternativas consideradas:**

- PostgreSQL + Supabase (más SQL, pero RLS requiere configuración manual)
- MongoDB (similar, menos integración con auth)

---

### ¿Por qué Claude API (NO OpenAI)?

**Pros:**

- ✅ Mejor reasoning para análisis narrativos
- ✅ Contexto de 200K tokens (historial completo de evaluación)
- ✅ Mejor para generar reportes con estructura
- ✅ API estable y documentada

**Cons:**

- ❌ Más caro que GPT-4
- ❌ Latencia ligeramente mayor

**Alternativas consideradas:**

- OpenAI GPT-4 (más barato pero menos contexto)
- Google Gemini (opción viable, menos proven)

---

### ¿Por qué Vite (NO Create React App)?

**Pros:**

- ✅ Build 10-100x más rápido
- ✅ HMR (Hot Module Replacement) instantáneo
- ✅ Menor overhead de dev
- ✅ Mejor para microapps

**Cons:**

- ❌ Menos "batteries included"
- ❌ Comunidad más nueva

**Alternativas consideradas:**

- Create React App (más config out-of-box, pero lento)
- Next.js (más setup, mejor para app completa)

---

### ¿Por qué Firebase Hosting + Cloud Functions (NO servidor propio)?

**Pros:**

- ✅ Serverless = cero DevOps
- ✅ Auto-scaling (sin limites)
- ✅ HTTPS automático
- ✅ CDN global
- ✅ Integración perfecta con Firestore + Auth

**Cons:**

- ❌ Vendor lock-in (Google)
- ❌ Costo puede escalar
- ❌ Menos control

**Alternativas consideradas:**

- Vercel (Next.js, más caro)
- AWS Lambda + API Gateway (más configuración)
- DigitalOcean App Platform (más simple, menos scalable)

---

## 📦 DEPENDENCIAS CLAVE

### Dependencias de Producción

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.x.x", // Routing
  "typescript": "^5.x.x",
  "firebase": "^10.x.x", // Firestore + Auth + Storage
  "anthropic": "^0.x.x" // Claude API client
}
```

### Dependencias de Desarrollo

```json
{
  "vite": "^5.x.x",
  "@vitejs/plugin-react": "^4.x.x",
  "tailwindcss": "^3.x.x",
  "postcss": "^8.x.x",
  "autoprefixer": "^10.x.x",
  "typescript-eslint": "^6.x.x",
  "vitest": "^0.x.x", // Testing
  "@testing-library/react": "^14.x.x",
  "prettier": "^3.x.x" // Code formatting
}
```

---

## 🔐 VARIABLES DE ENTORNO

### .env (Frontend — PÚBLICO)

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=performai.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=performai-prod
VITE_FIREBASE_STORAGE_BUCKET=performai-prod.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

### .env.local (Frontend — NO VERSIONADO)

```env
# Desarrollo local si es necesario
```

### .env (Cloud Functions — PRIVADO)

```env
ANTHROPIC_API_KEY=sk-ant-...
FIREBASE_CONFIG={...}
```

**REGLA CRÍTICA:**

- ❌ NUNCA hardcodear ANTHROPIC_API_KEY en React
- ✅ SIEMPRE acceder desde Cloud Functions
- ✅ .env NUNCA se versionan en Git

---

## 🏗️ ESTRUCTURA DE CARPETAS

```
performai/
├── src/
│   ├── components/          # Componentes React
│   │   ├── common/          # Botones, inputs, cards
│   │   ├── features/        # Componentes por feature
│   │   └── layout/          # Header, sidebar, footer
│   │
│   ├── pages/               # Páginas (routing)
│   │   ├── login.tsx
│   │   ├── dashboard.tsx
│   │   ├── evaluations.tsx
│   │   └── reports.tsx
│   │
│   ├── services/            # Lógica (APIs, Firebase)
│   │   ├── firebase.ts
│   │   ├── claudeApi.ts
│   │   └── auth.ts
│   │
│   ├── hooks/               # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useEvaluation.ts
│   │   └── useFirestore.ts
│   │
│   ├── types/               # Definiciones TypeScript
│   │   ├── evaluation.ts
│   │   ├── user.ts
│   │   └── question.ts
│   │
│   ├── utils/               # Utilidades
│   │   ├── constants.ts
│   │   ├── validators.ts
│   │   └── formatters.ts
│   │
│   ├── styles/              # Tailwind config
│   │   └── globals.css
│   │
│   ├── App.tsx              # Router principal
│   └── main.tsx             # Punto de entrada
│
├── functions/               # Cloud Functions
│   ├── src/
│   │   ├── generateReport.ts    # Claude API
│   │   ├── sendNotifications.ts # Email/push
│   │   └── index.ts             # Exports
│   └── package.json
│
├── public/                  # Assets estáticos
├── docs/                    # Documentación DDD
├── firebase.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── .env.example
```

---

## 🧪 TESTING STRATEGY

### Unit Tests

```
Frameworks: Vitest + @testing-library/react
Coverage objetivo: 80% de funciones críticas
Ejemplo: Validators, formatters, hooks
```

### Integration Tests

```
Simular Firebase Emulator
Testing: flujos completos (login → evaluación → reporte)
```

### E2E Tests (Futuro)

```
Cypress o Playwright
Testing: scenarios reales de usuario
```

---

## 📈 PERFORMANCE TARGETS

| Métrica                  | Target  | Herramienta   |
| ------------------------ | ------- | ------------- |
| First Contentful Paint   | < 2s    | Lighthouse    |
| Largest Contentful Paint | < 3s    | Lighthouse    |
| Cumulative Layout Shift  | < 0.1   | Lighthouse    |
| Time to Interactive      | < 3.5s  | WebPageTest   |
| Bundle size              | < 200KB | Vite analyzer |

---

## 🔄 CI/CD PIPELINE

```
Push a GitHub → GitHub Actions
├── npm run lint       # ESLint
├── npm run format     # Prettier
├── npm run type-check # TypeScript
├── npm run test       # Vitest
└── npm run build      # Vite

Si pasa → Deploy a Firebase Hosting
```

---

## 🌍 DEPLOYMENT

### Staging

```
Branch: develop
Deploy a: performai-staging.web.app
```

### Production

```
Branch: main
Deploy a: performai.web.app
```

---

**Estado:** 🔴 Esperando aprobación  
**Próximo:** Arquitectura del proyecto (04-arquitectura-del-proyecto.md)
