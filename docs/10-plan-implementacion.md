# 📋 PLAN DE IMPLEMENTACIÓN — PerformAI

**Versión:** 1.0  
**Fecha:** 24 May 2026  
**Duración total:** 12-16 semanas

---

## 🎯 OBJETIVO GENERAL

Desarrollar plataforma web de evaluación 180° con IA generativa siguiendo metodología **DDD** (Document Driven Development), garantizando seguridad, escalabilidad y UX mobile-first.

---

## 📅 TIMELINE DETALLADO

### SEMANA 1-2: Sistema de Diseño + Maquetación Inicial

**Deliverables:**

- [x] Sistema de diseño documentado (`02-sistema-de-diseno.md`)
- [x] Paleta colores validada (#6C3E99, #003A70, #FFFFFF)
- [ ] 4 vistas maquetadas (Login, Dashboard 3x, Configuración)
- [ ] HTML estático, responsive

**Tareas diarias:**

```
D1-2: Bocetar wireframes en papel
D3-4: Codificar HTML semántico
D5-6: Tailwind CSS + validar colores
D7-8: Mobile responsive (390px)
D9-10: Testing visual en devices reales
```

**KPIs:**

- ✅ 4 vistas completadas (100%)
- ✅ Responsive sin scroll horizontal
- ✅ Contraste WCAG AA validado

---

### SEMANA 3-4: Maquetación Completa

**Deliverables:**

- [ ] 8 vistas totales maquetadas
- [ ] Componentes base documentados
- [ ] Testing responsive en 4 devices

**Vistas:**

```
1. Login ✅
2. Dashboard Admin ✅
3. Dashboard Líder ✅
4. Dashboard Colaborador ✅
5. Configuración Tipos → 50%
6. Editor Preguntas
7. Formulario Evaluación 180°
8. Reporte IA
```

**KPIs:**

- ✅ 8/8 vistas completadas
- ✅ Performance: First Paint < 2s

---

### SEMANA 5: Setup React + TypeScript + Routing

**Deliverables:**

- [ ] Proyecto Vite + React 18 setup
- [ ] TypeScript stricto habilitado
- [ ] React Router configurado
- [ ] Carpeta structure creada

**Tareas:**

```
D1: npm create vite@latest performai -- --template react-ts
D2: Instalar dependencias (react-router, tailwind)
D3: Configurar tsconfig.json (strict: true)
D4: Crear carpeta structure
D5: Setup tests (Vitest + React Testing Library)
```

**Validación:**

- [ ] `npm run type-check` pasa sin errores
- [ ] `npm run dev` corre en localhost:5173

---

### SEMANA 6: Componentes React

**Deliverables:**

- [ ] 15-20 componentes React
- [ ] Props tipadas con TypeScript
- [ ] Storybook (opcional)

**Componentes:**

```
Common (10):
├─ Button
├─ Card
├─ Input
├─ Badge
├─ Modal
├─ Table
├─ Slider
├─ Select
├─ ProgressBar
└─ Navbar

Features (5-10):
├─ LoginForm
├─ EvaluationForm
├─ ReportView
├─ WorkerTypeManager
└─ QuestionEditor
```

**Criterio:**

- ✅ 0 errores TypeScript
- ✅ Props JSDoc documentadas

---

### SEMANA 7: State Management + Hooks

**Deliverables:**

- [ ] Context API setup (Auth, Notifications)
- [ ] Custom hooks (useAuth, useEvaluation, etc.)
- [ ] Mocks de datos

**Tareas:**

```
D1-2: Crear AuthContext + useAuth hook
D3-4: Crear EvaluationContext + useEvaluation
D5-6: Crear mocks (mockUsers, mockEvaluations)
D7: Integrar mocks en componentes
```

**KPIs:**

- ✅ Flujo login/logout funciona
- ✅ Flujo crear evaluación funciona (mock)

---

### SEMANA 8: Tests + Refinamiento Fase 2

**Deliverables:**

- [ ] Tests de componentes clave (80%+ cobertura)
- [ ] Tests de hooks
- [ ] Bug fixes

**Tests a escribir:**

```
components/__tests__/:
├─ Button.test.tsx
├─ Card.test.tsx
└─ EvaluationForm.test.tsx

hooks/__tests__/:
├─ useAuth.test.ts
└─ useEvaluation.test.ts
```

**Criterio:**

- ✅ `npm run test` pasa 100%
- ✅ Coverage > 80% funciones críticas

---

### SEMANA 9: Firebase Setup + Firestore

**Deliverables:**

- [ ] Proyecto Firebase creado
- [ ] Firestore database creado
- [ ] Colecciones implementadas
- [ ] Indexes creados

**Tareas:**

```
D1: Crear proyecto en Firebase Console
D2: Habilitar Firestore
D3: Habilitar Firebase Auth
D4: Crear estructura colecciones (users, questions, evaluations, etc.)
D5: Crear índices Firestore
D6: Setup Firebase Emulator local
```

**Validación:**

- [ ] `firebase emulators:start` funciona
- [ ] Puedo insertar documento en cada colección

---

### SEMANA 10: Integración Datos Reales

**Deliverables:**

- [ ] Reemplazar mocks con Firestore
- [ ] Real-time listeners (onSnapshot)
- [ ] CRUD completo

**Tareas:**

```
D1-2: useAuth con Firebase Auth real
D3-4: useEvaluation con Firestore queries
D5-6: Real-time listeners en dashboards
D7: Manejo de errores
```

**Criterio:**

- ✅ Puedo login con email real
- ✅ Puedo crear evaluación y se guarda en Firestore
- ✅ Datos aparecen en tiempo real

---

### SEMANA 11: Cloud Functions + Claude API

**Deliverables:**

- [ ] Cloud Function `generateReport` creada
- [ ] Anthropic client configurado
- [ ] Reportes generando automáticamente

**Tareas:**

```
D1-2: Scaffolding Cloud Functions
D3: Setup Anthropic client
D4: Escribir prompt para Claude
D5: Implementar generateReport trigger
D6: Testing: crear eval → generar reporte
D7: Optimizaciones
```

**Criterio:**

- ✅ Evaluación se marca completed
- ✅ Cloud Function se ejecuta automáticamente
- ✅ Reporte con 4 secciones (strengths, improvements, recommendations, guide)

---

### SEMANA 12: Auditoría Seguridad + Beta

**Deliverables:**

- [ ] Auditoría de seguridad pasada
- [ ] App lista para beta
- [ ] Documentación final

**Tareas:**

```
D1: Revisar Firestore Security Rules
D2: Validar ANTHROPIC_API_KEY no en frontend
D3: Gitleaks: gitleaks detect --source .
D4: Test: Intentar acceso no autorizado (debe fallar)
D5: Performance audit (Lighthouse)
D6: Bug fixes finales
D7: Documentación actualizada
```

**Checklist Final:**

- [ ] ✅ 0 secretos en código
- [ ] ✅ Security Rules pasan auditoría
- [ ] ✅ Performance: Lighthouse > 90
- [ ] ✅ Ningún dato filtrado

---

## 🔀 DEPENDENCIAS ENTRE TAREAS

```
Fase 1 (Semanas 1-4)
    ↓
Fase 2 (Semanas 5-8)
    ├─ Requiere: Fase 1 completada
    ├─ Desbloquea: Pruebas automáticas
    └─ Output: App funcional con mocks

Fase 3 (Semanas 9-12)
    ├─ Requiere: Fase 2 completada
    ├─ Requiere: Firestore setup (Semana 9)
    └─ Output: App lista para beta
```

---

## 👥 EQUIPO Y ROLES

| Rol                      | Semanas | Tareas                      |
| ------------------------ | ------- | --------------------------- |
| **Front-end** (HTML/CSS) | 1-4     | Maquetación + validación    |
| **Front-end** (React/TS) | 5-8     | Componentes + hooks + tests |
| **Full-stack**           | 9-12    | Firebase + Cloud Fns + IA   |

**Si solo 1 dev:** Secuencial completo (12-16 semanas)  
**Si 2 devs:** Paralelo desde Semana 5 (10-12 semanas)  
**Si 3 devs:** Paralelo completo (8-10 semanas)

---

## 📊 CRITERIOS DE ACEPTACIÓN POR FASE

### FASE 1 Completada ✅

```
Entregable: 8 vistas HTML + CSS puro
├─ [ ] Login funcional (sin JavaScript)
├─ [ ] Dashboard 3x funcional
├─ [ ] Formulario evaluación interactive (CSS only)
├─ [ ] Responsive en 4 devices
├─ [ ] Contraste WCAG AA
├─ [ ] Performance: < 2s First Paint
└─ [ ] Documentación: sistema de diseño completado
```

### FASE 2 Completada ✅

```
Entregable: App React funcional (sin Firebase)
├─ [ ] Componentes React (15-20)
├─ [ ] Routing funcional
├─ [ ] Mocks de datos trabajando
├─ [ ] Flujo 180° completo (mock)
├─ [ ] Tests: 80%+ cobertura
├─ [ ] 0 errores TypeScript
└─ [ ] Performance: Lighthouse > 85
```

### FASE 3 Completada ✅

```
Entregable: App completa lista para beta
├─ [ ] Firebase + Firestore integrados
├─ [ ] Authentication funcional
├─ [ ] CRUD completo con datos reales
├─ [ ] Cloud Functions + Claude API
├─ [ ] Reportes generando automáticamente
├─ [ ] Auditoría de seguridad pasada
├─ [ ] Performance: Lighthouse > 90
└─ [ ] 0 secrets en código (gitleaks OK)
```

---

## ⚠️ RIESGOS Y MITIGACIÓN

| Riesgo                | Probabilidad | Impacto  | Mitigación                    |
| --------------------- | ------------ | -------- | ----------------------------- |
| Delays en maquetación | Media        | Alto     | Wireframes antes de codificar |
| Scope creep           | Alta         | Medio    | Mantener alcance de v1.0      |
| Issues con Firebase   | Baja         | Muy alto | Testing local con Emulator    |
| API key expuesta      | Baja         | Crítico  | Code review + gitleaks        |
| Performance lenta     | Media        | Medio    | Profiling desde Semana 8      |

---

## 📞 COMUNICACIÓN Y CHECKPOINT

**Reuniones obligatorias:**

```
Inicio Semana: Planificación (30 min)
Fin Semana: Demo + retrospectiva (45 min)
Decisiones bloqueantes: ASAP
```

**Canales:**

- 📋 Documentación: `/docs` en GitHub
- 💬 Decisiones: GitHub Issues/Discussions
- 🆘 Bloqueantes: Email + reunión urgente

---

## 🎯 MÉTRICAS DE ÉXITO

| Métrica                  | v1.0 Target   |
| ------------------------ | ------------- |
| Tiempo desarrollo        | 12-16 semanas |
| Cobertura tests          | 80%+          |
| Performance (Lighthouse) | > 90          |
| Security audit           | ✅ Pasada     |
| Bugs críticos            | 0             |
| Usuarios beta            | 10-20         |

---

**Estado:** 🔴 Esperando aprobación  
**Próximo:** Comenzar Semana 1 (Maquetación)
