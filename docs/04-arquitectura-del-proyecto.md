# 🏗️ ARQUITECTURA DEL PROYECTO — PerformAI

**Versión:** 1.0  
**Fecha:** 24 May 2026  
**Patrón arquitectónico:** DDD (Domain-Driven Design) + Modular

---

## 📁 ESTRUCTURA DE CARPETAS

```
performai/
│
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Badge.tsx
│   │   │   └── Modal.tsx
│   │   │
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   └── LogoutButton.tsx
│   │   │   │
│   │   │   ├── evaluations/
│   │   │   │   ├── EvaluationForm.tsx
│   │   │   │   ├── EvaluationList.tsx
│   │   │   │   ├── SelfEvaluationForm.tsx
│   │   │   │   └── EvaluationStatus.tsx
│   │   │   │
│   │   │   ├── reports/
│   │   │   │   ├── ReportView.tsx
│   │   │   │   └── ReportDownload.tsx
│   │   │   │
│   │   │   ├── questions/
│   │   │   │   ├── QuestionList.tsx
│   │   │   │   ├── QuestionForm.tsx
│   │   │   │   └── QuestionBank.tsx
│   │   │   │
│   │   │   ├── workers/
│   │   │   │   ├── WorkerTypeList.tsx
│   │   │   │   ├── WorkerTypeForm.tsx
│   │   │   │   └── WorkerTypeManager.tsx
│   │   │   │
│   │   │   └── dashboard/
│   │   │       ├── AdminDashboard.tsx
│   │   │       ├── LeaderDashboard.tsx
│   │   │       └── CollaboratorDashboard.tsx
│   │   │
│   │   └── layout/
│   │       ├── Header.tsx
│   │       ├── Sidebar.tsx
│   │       ├── MainLayout.tsx
│   │       └── Footer.tsx
│   │
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Evaluations.tsx
│   │   ├── Reports.tsx
│   │   ├── Settings.tsx
│   │   └── NotFound.tsx
│   │
│   ├── services/
│   │   ├── firebase.ts (init Firebase)
│   │   ├── auth.ts (Firebase Auth)
│   │   ├── firestore.ts (Firestore queries)
│   │   ├── storage.ts (Firebase Storage)
│   │   ├── claudeApi.ts (llamadas a Cloud Function)
│   │   └── notifications.ts (email/push)
│   │
│   ├── hooks/
│   │   ├── useAuth.ts (contexto de usuario)
│   │   ├── useEvaluation.ts (CRUD evaluaciones)
│   │   ├── useQuestions.ts (CRUD preguntas)
│   │   ├── useWorkerTypes.ts (CRUD tipos)
│   │   └── useFirestore.ts (lectura realtime)
│   │
│   ├── types/
│   │   ├── evaluation.ts
│   │   ├── user.ts
│   │   ├── question.ts
│   │   ├── workerType.ts
│   │   └── api.ts
│   │
│   ├── utils/
│   │   ├── constants.ts
│   │   ├── validators.ts
│   │   ├── formatters.ts
│   │   ├── errors.ts
│   │   └── logger.ts
│   │
│   ├── styles/
│   │   ├── globals.css
│   │   ├── variables.css
│   │   └── animations.css
│   │
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   ├── NotificationContext.tsx
│   │   └── ThemeContext.tsx
│   │
│   ├── App.tsx (Router principal)
│   └── main.tsx (Punto de entrada)
│
├── functions/  (Cloud Functions)
│   ├── src/
│   │   ├── handlers/
│   │   │   ├── generateReport.ts
│   │   │   ├── sendNotifications.ts
│   │   │   └── validateEvaluation.ts
│   │   │
│   │   ├── lib/
│   │   │   ├── anthropic.ts
│   │   │   ├── firestore.ts
│   │   │   └── validators.ts
│   │   │
│   │   ├── config/
│   │   │   └── constants.ts
│   │   │
│   │   └── index.ts (Exports)
│   │
│   └── package.json
│
├── docs/ (DDD — Documentación)
│   ├── INDICE.md
│   ├── CONTINUIDAD.md
│   ├── 01-alcance-del-proyecto.md
│   ├── 02-sistema-de-diseno.md
│   ├── 03-tech-stack.md
│   ├── 04-arquitectura-del-proyecto.md
│   ├── 05-modelo-de-datos.md
│   ├── 06-roles-y-permisos.md
│   ├── 07-segmentacion-preguntas.md
│   ├── 08-flujo-evaluacion.md
│   ├── 09-fases-del-proyecto.md
│   ├── 10-plan-implementacion.md
│   └── referencias/
│       ├── reglas-seguridad-firebase.md
│       ├── paleta-colores.md
│       └── restricciones-api-claude.md
│
├── public/
│   ├── favicon.ico
│   ├── images/
│   └── fonts/
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── firebase.json (configuración Firebase)
├── vite.config.ts (configuración Vite)
├── tailwind.config.js (Tailwind)
├── tsconfig.json (TypeScript)
├── .env.example (variables de ejemplo)
├── .gitignore
├── package.json
└── README.md
```

---

## 🔄 FLUJO DE DATOS

### 1. Autenticación

```
User Input (Login)
    ↓
[LoginForm Component]
    ↓
[useAuth Hook] → Firebase Auth.signInWithEmailAndPassword()
    ↓
Firebase verifica credenciales
    ↓
Custom Claims (role) desde Firestore
    ↓
[AuthContext] actualiza estado global
    ↓
Redirige a Dashboard según role
```

### 2. Lectura de Evaluaciones

```
User accede a Evaluations
    ↓
[EvaluationList Component]
    ↓
[useEvaluation Hook] → Firestore.query()
    ↓
Real-time listener (onSnapshot)
    ↓
[Component state] actualiza con datos
    ↓
UI re-renders
```

### 3. Creación de Evaluación

```
Líder completa formulario
    ↓
[EvaluationForm] → onClick "Enviar"
    ↓
Validaciones locales
    ↓
[useEvaluation Hook] → callCloudFunction() o Firestore.doc.set()
    ↓
Cloud Function valida (server-side)
    ↓
Guarda en Firestore
    ↓
Trigger automático → generateReport (si status=completed)
    ↓
Claude API genera reporte
    ↓
Actualiza Firestore con aiReport
    ↓
Notificación a Colaborador
```

### 4. Generación de Reporte IA

```
Evaluación status = "completed"
    ↓
Firestore Trigger detecta cambio
    ↓
Cloud Function: generateReport()
    ↓
1. Obtiene leaderResponses + collaboratorResponses
2. Consolida diferencias
3. Prepara prompt para Claude
    ↓
POST Anthropic API (con ANTHROPIC_API_KEY)
    ↓
Claude procesa y retorna narrativa
    ↓
Cloud Function guarda en Firestore
    ├─ aiReport.strengths
    ├─ aiReport.improvements
    ├─ aiReport.recommendations
    └─ aiReport.conversationGuide
    ↓
Frontend (ReportView) obtiene datos via listener
```

---

## 🔌 PATRONES DE CÓDIGO

### Patrón 1: Custom Hooks (Estado + Lógica)

```typescript
// useEvaluation.ts
export function useEvaluation(evaluationId: string) {
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Real-time listener desde Firestore
    const unsubscribe = db
      .collection("evaluations")
      .doc(evaluationId)
      .onSnapshot(
        (doc) => {
          setEvaluation(doc.data() as Evaluation);
          setLoading(false);
        },
        (err) => {
          setError(err);
          setLoading(false);
        },
      );

    return () => unsubscribe();
  }, [evaluationId]);

  return { evaluation, loading, error };
}
```

### Patrón 2: Context para Estado Global

```typescript
// AuthContext.tsx
const AuthContext = createContext<{
  user: User | null;
  role: Role | null;
  loading: boolean;
  logout: () => Promise<void>;
}>({...});

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth fuera de AuthProvider');
  return context;
}
```

### Patrón 3: Componentes Controlados

```typescript
// EvaluationForm.tsx
export function EvaluationForm({ collaboratorId, workerTypeId }) {
  const [responses, setResponses] = useState({});

  const handleResponseChange = (questionId: string, score: number) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: { score, naApplies: false, comment: '' }
    }));
  };

  const handleSubmit = async () => {
    // Validar + guardar
    await useEvaluation().createEvaluation({...});
  };

  return (
    <form onSubmit={handleSubmit}>
      {questions.map((q) => (
        <Question
          key={q.id}
          question={q}
          onChange={(score) => handleResponseChange(q.id, score)}
        />
      ))}
    </form>
  );
}
```

### Patrón 4: Error Boundaries

```typescript
// ErrorBoundary.tsx
export class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

---

## 🔐 SEGURIDAD

### Niveles de Protección

```
1. Firebase Auth (autenticación)
2. Custom Claims (autorización por role)
3. Firestore Security Rules (acceso datos)
4. HTTPS + Encryption (transporte)
5. Cloud Functions (lógica sensitiva)
6. .env variables (secrets)
```

### Lugares Donde NO Va Código Sensitivo

```
❌ src/utils/*.ts        (ejecuta en navegador)
❌ src/components/*.tsx  (ejecuta en navegador)
❌ src/hooks/*.ts        (ejecuta en navegador)
❌ variables en React    (visible en DevTools)

✅ functions/src/*.ts    (ejecuta en servidor)
✅ .env de Cloud Fns     (no se expone)
✅ Firebase Rules        (valida en servidor)
```

---

## 📊 PATRONES DE ESTADO

### Estado Local (Component)

```typescript
const [isLoading, setIsLoading] = useState(false);
// Para UI state de corta vida
```

### Estado Global (Context)

```typescript
// AuthContext
export const useAuth = () => useContext(AuthContext);
// Para user, role, session
```

### Estado Remoto (Firestore)

```typescript
// useEvaluation Hook
const { evaluation, loading } = useEvaluation(evalId);
// Para datos que vienen del servidor
```

---

## 🧪 TESTING STRATEGY

### Unit Tests (Functions)

```
tests/utils/__tests__/validators.test.ts
tests/hooks/__tests__/useAuth.test.ts
```

### Integration Tests (Components)

```
tests/components/__tests__/EvaluationForm.test.tsx
// Mock Firestore, test flujo completo
```

### E2E Tests (Workflows)

```
tests/e2e/evaluation.workflow.test.ts
// Usar Firestore Emulator
```

---

## ⚡ PERFORMANCE

### Code Splitting

```typescript
// Lazy load pages
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Reports = lazy(() => import("./pages/Reports"));
```

### Memoization

```typescript
const EvaluationCard = memo(({ evaluation }) => (
  // Evitar re-renders innecesarios
));
```

### Firestore Queries (Índices)

```
Crear índices en:
- leaderId + createdAt
- collaboratorId + status
- cycleId + status
```

---

## 🔄 CI/CD Pipeline

```
Push a GitHub
    ↓
GitHub Actions
    ├─ npm run lint
    ├─ npm run type-check
    ├─ npm run test
    └─ npm run build
    ↓
Si OK:
    ├─ Deploy a Firebase Hosting (frontend)
    └─ Deploy a Cloud Functions (backend)
```

---

**Estado:** 🔴 Esperando aprobación
