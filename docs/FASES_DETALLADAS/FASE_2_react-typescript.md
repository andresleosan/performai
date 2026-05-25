# FASE 2: REACT + TYPESCRIPT

**Estado:** ⏳ EN PROGRESO  
**Semanas:** 5-8  
**Fecha Inicio:** 24 May 2026  
**Objetivo:** Convertir maquetas HTML/CSS a componentes React + Setup TypeScript + React Router

---

## 📋 SUBFASES FASE 2

### 2.1 Setup Inicial (Semana 5)

**Objetivo:** Configurar proyecto base con todas las herramientas

- [ ] **2.1.1 Inicializar Vite + React 18**
  - [x] `npm create vite@latest app -- --template react-ts`
  - [ ] Verificar estructura creada
  - [ ] Instalar dependencias adicionales

- [ ] **2.1.2 Instalar y Configurar TailwindCSS**
  - [ ] `npm install -D tailwindcss postcss autoprefixer`
  - [ ] Configurar `tailwind.config.ts` con design system
  - [ ] Importar estilos en `app.css`
  - [ ] Variables CSS del design system

- [ ] **2.1.3 Instalar React Router**
  - [ ] `npm install react-router-dom`
  - [ ] Crear estructura de rutas
  - [ ] Setup App.tsx con Routes

- [ ] **2.1.4 Crear Estructura de Carpetas**

  ```
  app/src/
  ├── components/
  │   ├── common/       (Button, Card, Input, Badge, etc)
  │   ├── features/     (Evaluación, Reporte, etc)
  │   └── layout/       (Navbar, Sidebar, AuthLayout)
  ├── pages/            (Login, Dashboard, etc)
  ├── hooks/            (useAuth, useEvaluation, etc)
  ├── contexts/         (AuthContext, EvalContext)
  ├── types/            (TypeScript interfaces)
  ├── utils/            (helpers, constants)
  ├── styles/           (global CSS, tailwind)
  └── App.tsx
  ```

- [ ] **2.1.5 Configurar TypeScript Strict**
  - [ ] `tsconfig.json`: strict mode ON
  - [ ] eslint + prettier setup
  - [ ] Pre-commit hooks

**Entregables:**

- [ ] `app/` carpeta con Vite + React creada
- [ ] `tailwind.config.ts` con design system
- [ ] `app/src/App.tsx` con rutas iniciales
- [ ] `.env.local` configurado
- [ ] `npm run dev` funcionando

---

### 2.2 Componentes Base React (Semana 5-6)

**Objetivo:** Convertir 10 componentes HTML/CSS a componentes React reutilizables

#### Componentes a Crear

```
src/components/common/
├── Button.tsx        (primary, secondary, success + size, disabled)
├── Card.tsx          (header, body, footer sections)
├── Input.tsx         (text, email, textarea, error state)
├── Badge.tsx         (4 colores: purple, navy, green, gray)
├── Modal.tsx         (header, body, footer, overlay)
├── Table.tsx         (header, body, striped rows, hover)
├── Slider.tsx        (1-5 scale rating)
├── Select.tsx        (dropdown with options)
├── ProgressBar.tsx   (gradient from purple to green)
└── Navbar.tsx        (responsive header with user menu)
```

#### Props y TypeScript

Ejemplo Button:

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'success';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', ... }) => {
  // Implementation
}
```

**Entregables:**

- [ ] 10 componentes exportados desde `src/components/common/index.ts`
- [ ] Stories en Storybook (opcional)
- [ ] TypeScript interfaces para cada componente
- [ ] CSS/Tailwind classes aplicadas

---

### 2.3 Layout y Estructura (Semana 6)

**Objetivo:** Crear layouts reutilizables para diferentes vistas

#### Layout Components

```
src/components/layout/
├── AppLayout.tsx          (navbar + main content)
├── AuthLayout.tsx         (centered card para login)
├── AdminLayout.tsx        (navbar + sidebar)
├── DashboardLayout.tsx    (navbar + main grid)
└── EvaluationLayout.tsx   (full-screen evaluación)
```

**Entregables:**

- [ ] 5 layouts funcionales
- [ ] Responsive en mobile/tablet/desktop
- [ ] Navbar con user menu
- [ ] Sidebar (si aplica)

---

### 2.4 Pages / Vistas React (Semana 6-7)

**Objetivo:** Crear páginas React equivalentes a maquetas HTML

#### Pages a Crear

```
src/pages/
├── LoginPage.tsx                    (01-login.html)
├── DashboardAdmin.tsx               (02-dashboard-admin.html)
├── DashboardLider.tsx               (03-dashboard-lider.html)
├── DashboardColaborador.tsx         (04-dashboard-colaborador.html)
├── ConfigTipos.tsx                  (05-config-tipos.html)
├── EditorPreguntas.tsx              (06-editor-preguntas.html)
├── EvaluacionFormulario.tsx         (07-formulario-evaluacion.html)
└── ReporteEvaluacion.tsx            (08-reporte-evaluacion.html)
```

**Por cada página:**

- [ ] Usar componentes base
- [ ] Props tipados en TypeScript
- [ ] Responsive design
- [ ] Hooks personalizados si necesario
- [ ] Error boundaries

**Entregables:**

- [ ] 8 páginas React funcionales
- [ ] Todas exportadas en `src/pages/index.ts`
- [ ] Routing setup completado

---

### 2.5 Routing y Navegación (Semana 7)

**Objetivo:** Implementar React Router con todas las rutas

#### Router Structure

```typescript
const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: 'login', element: <LoginPage /> },
      {
        path: 'dashboard',
        element: <ProtectedRoute><DashboardAdmin /></ProtectedRoute>,
        children: [
          { path: 'admin', element: <DashboardAdmin /> },
          { path: 'lider', element: <DashboardLider /> },
          { path: 'colaborador', element: <DashboardColaborador /> },
        ]
      },
      { path: 'evaluacion', element: <EvaluacionFormulario /> },
      { path: 'reporte/:id', element: <ReporteEvaluacion /> },
      // ... más rutas
    ]
  }
])
```

**Entregables:**

- [ ] `src/router/index.ts` con configuración
- [ ] ProtectedRoute HOC
- [ ] Error page 404
- [ ] Navigation entre vistas funcional

---

### 2.6 Context API + Hooks (Semana 7-8)

**Objetivo:** Setup de estado global y custom hooks

#### Contextos a Crear

```typescript
// AuthContext
interface AuthContextType {
  user: User | null;
  login: (email, password) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// EvaluationContext
interface EvalContextType {
  currentEvaluation: Evaluation | null;
  answers: Record<string, any>;
  saveAnswer: (questionId, answer) => void;
  submitEvaluation: () => Promise<void>;
}
```

#### Custom Hooks

```
src/hooks/
├── useAuth.ts                 (AuthContext)
├── useEvaluation.ts           (EvaluationContext)
├── useLocalStorage.ts         (Persistencia)
├── useFetch.ts                (API calls)
└── useForm.ts                 (Form handling)
```

**Entregables:**

- [ ] 2 contextos principales
- [ ] 5 hooks personalizados
- [ ] Provider setup en App.tsx
- [ ] Tipados con TypeScript

---

### 2.7 Testing y Optimización (Semana 8)

**Objetivo:** Validar que todo funcione correctamente

- [ ] **Pruebas Unitarias (Vitest)**
  - [ ] Tests para componentes base
  - [ ] Tests para hooks
  - [ ] Coverage ≥ 80%

- [ ] **E2E Tests (Playwright opcional)**
  - [ ] Flujo login
  - [ ] Flujo evaluación
  - [ ] Navegación

- [ ] **Performance**
  - [ ] Code splitting
  - [ ] Lazy loading routes
  - [ ] Bundle size < 500KB

- [ ] **Accesibilidad**
  - [ ] axe-core testing
  - [ ] WCAG AA compliance

**Entregables:**

- [ ] Tests passing
- [ ] Coverage report
- [ ] Bundle analysis
- [ ] Lighthouse score ≥ 90

---

## 🎯 ARCHIVOS A CREAR

### Estructura Final

```
performai/
├── app/                           (Proyecto React nuevo)
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/           (10 componentes base)
│   │   │   ├── features/         (Componentes feature-specific)
│   │   │   ├── layout/           (Layouts reutilizables)
│   │   │   └── index.ts          (Exports)
│   │   ├── pages/                (8 páginas)
│   │   ├── hooks/                (Custom hooks)
│   │   ├── contexts/             (Context API)
│   │   ├── types/                (TypeScript interfaces)
│   │   ├── utils/                (Helpers)
│   │   ├── styles/               (Global CSS)
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   ├── public/
│   ├── index.html
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   ├── postcss.config.js
│   ├── package.json
│   └── .env.local
│
├── src/                           (Maquetas HTML del Proyecto antiguo)
│   ├── components/base/
│   └── views/
│
└── docs/
    ├── FASES_DETALLADAS/
    │   └── FASE_2_react-typescript.md (este archivo)
    └── CONTINUIDAD.md
```

---

## 📊 MÉTRICAS Y VALIDACIÓN

### Fase 2.1 (Setup)

- [ ] Node.js ≥ 18
- [ ] npm ≥ 9
- [ ] Vite dev server funcionando
- [ ] `npm run build` exitoso
- [ ] TypeScript strict mode ON

### Fase 2.2-2.3 (Componentes + Layout)

- [ ] 10 componentes base funcionales
- [ ] 5 layouts responsive
- [ ] Props tipadas en TypeScript
- [ ] Tailwind classes aplicadas
- [ ] Visual tests vs maquetas HTML

### Fase 2.4-2.5 (Pages + Router)

- [ ] 8 páginas creadas
- [ ] Todas las rutas navegables
- [ ] ProtectedRoute funcionando
- [ ] Transiciones suaves

### Fase 2.6-2.7 (Context + Testing)

- [ ] AuthContext + EvaluationContext
- [ ] 5 custom hooks
- [ ] Tests ≥ 80% coverage
- [ ] Lighthouse score ≥ 90
- [ ] Bundle size < 500KB

---

## 🔗 DEPENDENCIAS A INSTALAR

```bash
# Core
npm install react react-dom react-router-dom

# Styling
npm install -D tailwindcss postcss autoprefixer
npm install clsx classnames

# Development
npm install -D @types/react @types/react-dom
npm install -D typescript

# Optional: Testing
npm install -D vitest @testing-library/react @testing-library/jest-dom
npm install -D @playwright/test

# Optional: Linting
npm install -D eslint prettier @typescript-eslint/eslint-plugin
```

---

## 🚀 COMANDOS PRINCIPALES

```bash
# Development
npm run dev              # Iniciar dev server

# Build
npm run build            # Build para producción
npm run preview          # Preview build local

# Testing
npm run test             # Run tests
npm run test:coverage    # Coverage report

# Linting
npm run lint             # Eslint check
npm run format           # Prettier format
```

---

## 📝 NOTAS IMPORTANTES

### Design System Migration

- CSS Variables → Tailwind config
- Colors: #6C3E99, #003A70, #4CAF50, #FFFFFF
- Typography: Inter font family
- Spacing: 8px grid (4px, 8px, 16px, 24px, 32px, 48px)

### TypeScript Best Practices

- Todos los componentes: `React.FC<PropsInterface>`
- Props interfaces en archivo separado (component.types.ts)
- Strict mode: `"strict": true` en tsconfig
- No usar `any` tipo

### Accessibility

- ARIA labels en componentes interactivos
- Keyboard navigation working
- Focus management
- Color contrast validado (WCAG AA)

### Performance

- Code splitting por ruta
- Lazy loading components
- Image optimization
- Bundle analysis

---

## ✅ CHECKLIST FASE 2

- [ ] Setup Vite + React + TypeScript
- [ ] TailwindCSS configurado
- [ ] React Router instalado
- [ ] Carpetas de estructura creadas
- [ ] 10 componentes base convertidos
- [ ] 5 layouts creados
- [ ] 8 páginas convertidas
- [ ] Rutas funcionando
- [ ] Context API setup
- [ ] Custom hooks implementados
- [ ] Tests >= 80% coverage
- [ ] Lighthouse >= 90
- [ ] Commit + Push a GitHub

---

## 📞 PRÓXIMA FASE

**Fase 3: Firebase + Claude IA** (Semanas 9-12)

- Firebase Auth integration
- Firestore database
- Cloud Functions
- Claude API integration
- Email notifications

---

**Fase 2 Status:** ⏳ EN PROGRESO — Setup inicial en marcha  
**Última Actualización:** 24 May 2026, 11:00 UTC
