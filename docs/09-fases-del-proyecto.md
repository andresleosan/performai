# 📅 FASES DEL PROYECTO — PerformAI

**Versión:** 1.0  
**Fecha:** 24 May 2026  
**Duración estimada:** 12-16 semanas

---

## 🎯 OVERVIEW

```
FASE 1: DOCUMENTACIÓN Y MAQUETACIÓN (Semanas 1-4)
   └─ Entregable: HTML/CSS estático, responsive, sin React

FASE 2: INTEGRACIÓN CON REACT + TYPESCRIPT (Semanas 5-8)
   └─ Entregable: App funcional con mocks, sin Firebase

FASE 3: INTEGRACIÓN CON FIREBASE E IA (Semanas 9-12)
   └─ Entregable: App lista para beta, con IA
```

---

## FASE 1️⃣ — DOCUMENTACIÓN Y MAQUETACIÓN

**Duración:** 4 semanas  
**Equipo:** 1 Front-end (HTML/CSS)  
**Dependencias:** Documentación aprobada

### 1.1 Definir Sistema de Diseño ✅

**Tareas:**

- [x] Extraer paleta de colores (ya hecho)
- [x] Validar contraste WCAG AA
- [x] Definir tipografía (Inter, tamaños 12-32px)
- [x] Definir espaciado (grid 8px)
- [x] Componentes base (Button, Card, Input, Badge)

**Entregable:** `02-sistema-de-diseno.md` + HTML components

**Criterio de éxito:**

- ✅ Color picker funcional
- ✅ Todos los componentes usan paleta
- ✅ Responsive en móvil

---

### 1.2 Maquetar Vistas (HTML + CSS Puro)

**Vistas obligatorias:**

```
1. Login / Registro
   - Input email, password
   - Botón submit
   - Link "¿Olvidó contraseña?"
   - Responsive mobile-first

2. Dashboard por Rol (3 versiones)
   - Admin RRHH: Stats, tabla tipos/preguntas/ciclos
   - Líder: Tabla equipo, estado evaluaciones
   - Colaborador: Mis evaluaciones, mis reportes

3. Configuración de Tipos de Trabajador
   - Tabla con tipos fijos (read-only)
   - Tabla con tipos "Otros" + CRUD
   - Modal crear/editar tipo
   - Validaciones

4. Editor de Preguntas
   - Seleccionar tipo en dropdown
   - Tabla de preguntas actuales
   - Formulario crear/editar pregunta
   - Drag to reorder

5. Formulario Evaluación 180°
   - Carrusel de preguntas (11 total)
   - Escala 1-5 con slider
   - Checkbox "No aplica"
   - Campo justificación
   - Progress bar
   - Botones anterior/siguiente/enviar

6. Autoevaluación del Colaborador
   - Similar al formulario líder
   - Instrucción: "Evalúate honestamente"
   - Botón "Enviar" al final

7. Reporte Generado por IA
   - Métricas (promedio líder, promedio María, coincidencia)
   - Sección Fortalezas (párrafos)
   - Sección Áreas de Mejora
   - Sección Recomendaciones
   - Guía de conversación 1:1
   - Botón Descargar PDF

8. Panel Admin RRHH
   - Dashboard ejecutivo (stats)
   - Tabla evaluaciones (filtrable)
   - Botón "Configurar ciclo"
   - Botón "Editar preguntas"
```

**Tareas por vista:**

```
Para cada vista:
├─ [ ] Boceto en papel (10 min)
├─ [ ] HTML semántico (30 min)
├─ [ ] Tailwind CSS (20 min)
├─ [ ] Mobile responsive (15 min)
├─ [ ] Testing en navegador (10 min)
└─ [ ] Validar contraste colores (5 min)
```

**Criterio de éxito:**

- ✅ Todas las vistas en HTML
- ✅ Sin JavaScript (solo HTML/CSS)
- ✅ Responsive en iPhone 12 (390px ancho)
- ✅ Contraste WCAG AA
- ✅ Tiempo carga < 2s

---

### 1.3 Validar Responsive Mobile en CADA Vista

**Devices a validar:**

```
- iPhone 12 (390px)
- iPhone 14 Pro Max (430px)
- iPad (768px)
- Desktop (1280px)
```

**Criterios:**

- [ ] Sin scroll horizontal
- [ ] Touch targets > 48px
- [ ] Texto legible (16px mínimo)
- [ ] Imágenes escaladas correctamente

---

### 1.4 Documentar Estructura de Componentes

**Archivo:** `FASES_DETALLADAS/FASE_1_maquetacion.md`

```
├─ Componentes identificados
│  ├─ Button (primario, secundario, success)
│  ├─ Card
│  ├─ Input (text, email, textarea)
│  ├─ Badge
│  ├─ Modal
│  ├─ Table
│  ├─ Slider (1-5)
│  ├─ Select/Dropdown
│  ├─ Progress Bar
│  └─ Navbar/Sidebar
│
├─ Props esperados
├─ Estados (hover, focus, disabled)
└─ Ejemplos de uso
```

---

## FASE 2️⃣ — INTEGRACIÓN CON REACT + TYPESCRIPT

**Duración:** 4 semanas  
**Equipo:** 1 Front-end (React/TS)  
**Dependencias:** Fase 1 completada

### 2.1 Convertir Maquetas a Componentes React

**Tareas:**

- [ ] Crear componentes `src/components/common/*`
- [ ] Props tipadas con TypeScript
- [ ] Estados locales (useState)
- [ ] Validaciones en componentes

**Criterio de éxito:**

- ✅ 0 errores TypeScript (`npm run type-check`)
- ✅ Componentes reutilizables
- ✅ Props bien documentadas

---

### 2.2 Implementar Navegación y Routing

**Tareas:**

- [ ] React Router setup
- [ ] Rutas por rol (PrivateRoute component)
- [ ] Lazy loading de páginas
- [ ] Breadcrumbs

**Rutas:**

```
/login → LoginPage
/dashboard → DashboardPage (diferente por rol)
/evaluations → EvaluationsPage
/evaluations/:id → EvaluationDetailPage
/reports/:id → ReportPage
/settings → SettingsPage
/admin/questions → AdminQuestionsPage
/admin/workers → AdminWorkersPage
```

---

### 2.3 Conectar Lógica de Negocio (Mocks)

**Tareas:**

- [ ] Crear archivos mock en `src/mocks/*`
- [ ] Implementar hooks (useAuth, useEvaluation, etc.)
- [ ] Context API para estado global
- [ ] Flujo completo 180° (sin Firebase)

**Mocks a crear:**

```
- mockUsers.ts
- mockEvaluations.ts
- mockQuestions.ts
- mockWorkerTypes.ts
```

**Criterio de éxito:**

- ✅ Puedo crear evaluación mock
- ✅ Puedo completar autoevaluación
- ✅ Se genera "reporte" simulado
- ✅ Flujo completo funciona

---

### 2.4 Tests de Componentes Clave

**Tareas:**

- [ ] Configurar Vitest + React Testing Library
- [ ] Tests para EvaluationForm
- [ ] Tests para ReportView
- [ ] Tests para Auth flow (login/logout)

**Cobertura objetivo:** 80% funciones críticas

---

## FASE 3️⃣ — INTEGRACIÓN CON FIREBASE E IA

**Duración:** 4 semanas  
**Equipo:** 1 Full-stack (React + Node.js)  
**Dependencias:** Fase 2 completada

### 3.1 Revisar Reglas de Seguridad

**Tareas:**

- [ ] Leer `referencias/reglas-seguridad-firebase.md` completo
- [ ] Auditoría previa: ¿Qué datos son sensibles?
- [ ] Diseñar Security Rules por colección

**Checklist:**

- [ ] ✅ Acceso autenticado obligatorio
- [ ] ✅ Propiedad de documentos (userId)
- [ ] ✅ Datos sensibles bloqueados (`if false`)
- [ ] ✅ Validación de datos en rules

---

### 3.2 Configurar Firestore, Auth y Storage

**Tareas:**

- [ ] Crear proyecto Firebase
- [ ] Habilitar Firebase Auth (email/password)
- [ ] Crear Firestore database
- [ ] Crear Firebase Storage buckets
- [ ] Configurar custom claims (role)

**Validación:**

- [ ] `firebase emulators:start` funciona

---

### 3.3 Implementar Colecciones según Modelo

**Tareas:**

- [ ] Crear estructura `/users`
- [ ] Crear estructura `/workerTypes`
- [ ] Crear estructura `/questions`
- [ ] Crear estructura `/evaluations`
- [ ] Crear estructura `/evaluationCycles`
- [ ] Crear índices Firestore

**Validación:**

- [ ] Puedo insertar documento en cada colección
- [ ] Queries tienen índices (sin warnings)

---

### 3.4 Reemplazar Mocks por Datos Reales

**Tareas:**

- [ ] Reemplazar `useAuth()` mock con Firebase Auth
- [ ] Reemplazar `useEvaluation()` mock con Firestore queries
- [ ] Real-time listeners (onSnapshot)
- [ ] Guardar respuestas en Firestore

**Criterio de éxito:**

- [ ] Puedo login con email real
- [ ] Puedo crear evaluación real
- [ ] Datos persisten en Firestore
- [ ] Real-time updates funcionan

---

### 3.5 Integrar Claude API para Reportes

**Tareas:**

- [ ] Crear Cloud Function `generateReport`
- [ ] Configurar Anthropic client
- [ ] Escribir prompt para Claude (contextualizado)
- [ ] Guardar resultado en Firestore
- [ ] Trigger automático al completar evaluación

**Validación:**

- [ ] Puedo completar evaluación
- [ ] Reporte se genera en < 10 segundos
- [ ] Reporte tiene: fortalezas, mejoras, recomendaciones, guía 1:1

---

### 3.6 Pruebas de Integración y Auditoría de Seguridad

**Tareas:**

- [ ] Flujo end-to-end: login → evaluar → reporte
- [ ] Intentar acceder a datos sin autorización (debe fallar)
- [ ] Verificar ANTHROPIC_API_KEY no está en frontend
- [ ] Verificar Firestore Rules funcionan
- [ ] Gitleaks: `gitleaks detect --source .`

**Checklist Final:**

- [ ] ✅ Ningún dato filtrado a usuarios no autorizados
- [ ] ✅ API key protegida
- [ ] ✅ Evaluación congelada (no editable post-completar)
- [ ] ✅ Colaborador no ve respuestas del líder antes de su respuesta

---

## 📊 HITOS Y TIMELINE

| Semana | Fase | Hito                                         |
| ------ | ---- | -------------------------------------------- |
| 1-2    | 1    | Sistema de diseño + 4 vistas maquetadas      |
| 3-4    | 1    | 8 vistas maquetadas, responsive validado     |
| 5      | 2    | Componentes React creados, routing funcional |
| 6      | 2    | Mocks integrados, lógica local funciona      |
| 7      | 2    | 80% tests, fase 2 lista para integración     |
| 8      | 2    | Ajustes UX, preparación para Firebase        |
| 9      | 3    | Firebase configurado, colecciones creadas    |
| 10     | 3    | Datos reales fluyen, real-time listeners     |
| 11     | 3    | Claude API integrada, reportes generan       |
| 12     | 3    | Auditoría seguridad, bug fixes, beta ready   |

---

## 📋 ARTEFACTOS POR FASE

### Fase 1

- [x] HTML estático (8 vistas)
- [x] Tailwind CSS
- [x] Validación responsive
- [x] Sistema de diseño documentado

### Fase 2

- [ ] Componentes React (15-20)
- [ ] Routing configurado
- [ ] Mocks de datos
- [ ] Tests de componentes
- [ ] Hooks personalizados

### Fase 3

- [ ] Firestore configurado
- [ ] Cloud Functions
- [ ] Claude API integrada
- [ ] Reportes generando
- [ ] Auditoría de seguridad pasada

---

**Estado:** 🔴 Esperando aprobación  
**Próximo:** Plan de implementación (10-plan-implementacion.md)
