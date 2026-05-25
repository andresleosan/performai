# 📚 ÍNDICE MAESTRO DE DOCUMENTACIÓN — PerformAI

**Proyecto:** PerformAI para Prevalentware  
**Metodología:** DDD (Document Driven Development)  
**Última actualización:** 24 May 2026  
**Estado:** 🔵 En construcción (Fase 1.1)

---

## 📖 ESTRUCTURA GENERAL

Toda la documentación sigue metodología **DDD**: Documento aprobado → Implementación → Testing.

```
docs/
├── INDICE.md                              [← Estás aquí]
├── CONTINUIDAD.md                         [Estado actual + próximos pasos]
│
├── 01-alcance-del-proyecto.md             [Visión, objetivos, restricciones]
├── 02-sistema-de-diseno.md                [Colores, tipografía, componentes UI]
├── 03-tech-stack.md                       [Frontend, backend, BD, IA, deployment]
├── 04-arquitectura-del-proyecto.md        [Estructura carpetas, patrones, flujo datos]
│
├── 05-modelo-de-datos.md                  [Colecciones Firestore, relaciones, esquema]
├── 06-roles-y-permisos.md                 [3 roles: Admin RRHH, Líder, Colaborador]
├── 07-segmentacion-preguntas.md           [Lógica tipos trabajador, herencia]
├── 08-flujo-evaluacion.md                 [Paso a paso 180°, diagrama UML]
│
├── 09-fases-del-proyecto.md               [Fase 1, 2, 3 con hitos]
├── 10-plan-implementacion.md              [Timeline, dependencias, testing]
│
├── referencias/
│   ├── reglas-seguridad-firebase.md       [✅ Extraído: Checklist, reglas, casos reales]
│   ├── paleta-colores.md                  [✅ Extraído: Hex, Tailwind, aplicación]
│   └── restricciones-api-claude.md        [🔲 TODO: .env, rate limits, prompts]
│
└── FASES_DETALLADAS/
    ├── FASE_1_maquetacion.md              [🔲 TODO: Componentes, vistas, wireframes]
    ├── FASE_2_react_typescript.md         [🔲 TODO: Componentes tipados, routing]
    └── FASE_3_firebase_ia.md              [🔲 TODO: Integración, pruebas, auditoría]
```

---

## 📄 DOCUMENTOS MAESTROS

### 1️⃣ **01-alcance-del-proyecto.md**

- **Qué es:** Definición del proyecto, objetivos, restricciones
- **Contiene:** Nombre, empresa, propósito, feature principal (segmentación)
- **Auditor:** Tú (usuario)
- **Estado:** 🔲 POR CREAR

### 2️⃣ **02-sistema-de-diseno.md**

- **Qué es:** Guía visual: colores, tipografía, grid, componentes básicos
- **Contiene:** Paleta `#6C3E99 #003A70 #FFFFFF`, familia tipográfica, espaciado
- **Auditor:** Tú
- **Dependencias:** Paleta extraída (`referencias/paleta-colores.md`) ✅
- **Estado:** 🔲 POR CREAR

### 3️⃣ **03-tech-stack.md**

- **Qué es:** Decisiones tecnológicas justificadas
- **Contiene:** React 18, TypeScript, Tailwind, Firebase (Firestore + Auth + Storage), Claude API, Vite
- **Auditor:** Tú
- **Estado:** 🔲 POR CREAR

### 4️⃣ **04-arquitectura-del-proyecto.md**

- **Qué es:** Estructura de carpetas y patrones de código
- **Contiene:** Carpetas por feature, patrón de componentes, flujo de datos (props/context)
- **Auditor:** Tú
- **Estado:** 🔲 POR CREAR

### 5️⃣ **05-modelo-de-datos.md** ⭐ CRÍTICO

- **Qué es:** Colecciones Firestore, campos, relaciones, reglas de negocio
- **Contiene:** `/workerTypes`, `/questions`, `/evaluations`, `/users`, `/evaluationCycles`
- **Auditor:** Tú + Seguridad
- **Dependencias:** `referencias/reglas-seguridad-firebase.md` ✅
- **Estado:** 🔲 POR CREAR

### 6️⃣ **06-roles-y-permisos.md** ⭐ CRÍTICO

- **Qué es:** Matriz de permisos por rol y feature
- **Contiene:**
  - Admin RRHH: CRUD tipos, configurar preguntas, dashboard ejecutivo
  - Líder: evaluar, ver reportes del equipo
  - Colaborador: autoevaluar, ver su reporte
- **Auditor:** Tú + Seguridad
- **Estado:** 🔲 POR CREAR

### 7️⃣ **07-segmentacion-preguntas.md** ⭐ CORE FEATURE

- **Qué es:** Reglas de negocio de segmentación por tipo de trabajador
- **Contiene:**
  - 4 tipos fijos (Gerente, Senior, Junior, Pasante)
  - "Otros" personalizable (CRUD para admin)
  - Preguntas base + específicas por tipo
  - Lógica de herencia
- **Auditor:** Tú (UX/negocio)
- **Estado:** 🔲 POR CREAR

### 8️⃣ **08-flujo-evaluacion.md** ⭐ CORE FEATURE

- **Qué es:** Paso a paso del flujo 180°, diagramas UML
- **Contiene:**
  - Paso 1-7: Líder evalúa → Claude genera reporte
  - Estados de evaluación: `pending_leader`, `pending_collaborator`, `completed`
  - Notificaciones
- **Auditor:** Tú (UX)
- **Estado:** 🔲 POR CREAR

### 9️⃣ **09-fases-del-proyecto.md**

- **Qué es:** División del proyecto en 3 fases grandes con hitos
- **Contiene:** Fase 1 (maquetación), Fase 2 (React), Fase 3 (Firebase + IA)
- **Auditor:** Tú (planning)
- **Estado:** 🔲 POR CREAR

### 🔟 **10-plan-implementacion.md**

- **Qué es:** Timeline, dependencias, testing strategy
- **Contiene:** Semanas estimadas, orden de ejecución, criterios de aceptación
- **Auditor:** Tú
- **Estado:** 🔲 POR CREAR

---

## 🔗 DOCUMENTOS DE REFERENCIA

### ✅ **referencias/reglas-seguridad-firebase.md**

- **Status:** EXTRAÍDO Y LISTO
- **Contiene:** Checklist pre-lanzamiento, niveles de seguridad, casos reales
- **Aplicable:** Fase 3 (integración Firebase)

### ✅ **referencias/paleta-colores.md**

- **Status:** EXTRAÍDO Y LISTO
- **Contiene:** Hex codes, Tailwind config, aplicación en componentes
- **Aplicable:** Fase 1 (maquetación)

### 🔲 **referencias/restricciones-api-claude.md**

- **Status:** POR CREAR
- **Qué contiene:** .env setup, rate limits, temperatura, token limits
- **Aplicable:** Fase 3

---

## 📝 DOCUMENTOS DE FASE

### 🔲 **FASES_DETALLADAS/FASE_1_maquetacion.md**

- **Objetivo:** Todas las vistas en HTML + CSS puro, sin React
- **Vistas:** Login, Dashboard (3 roles), Configuración tipos, Editor preguntas, Formulario 180°, Reporte, Panel admin
- **Entregable:** HTML estático responsive mobile-first

### 🔲 **FASES_DETALLADAS/FASE_2_react_typescript.md**

- **Objetivo:** Componentes React tipados, routing, estado local (mocks)
- **Entregable:** App funcional, sin Firebase

### 🔲 **FASES_DETALLADAS/FASE_3_firebase_ia.md**

- **Objetivo:** Integración total, seguridad, reportes IA
- **Entregable:** App lista para beta

---

## 🧭 ORDEN DE LECTURA RECOMENDADO

Para entender **PerformAI rápidamente:**

1. **01-alcance-del-proyecto.md** — ¿Qué es?
2. **06-roles-y-permisos.md** — ¿Quiénes usan qué?
3. **07-segmentacion-preguntas.md** — ¿Cómo funcionan las preguntas?
4. **08-flujo-evaluacion.md** — ¿Cuál es el workflow?
5. **05-modelo-de-datos.md** — ¿Cómo se guardan los datos?

---

## ✅ CHECKLIST DE APROBACIÓN

**Antes de pasar a Fase 1.1:**

- [ ] Apruebas alcance (01)
- [ ] Apruebas sistema de diseño (02)
- [ ] Apruebas tech stack (03)
- [ ] Entiendes arquitectura (04)
- [ ] Confirmas modelo de datos (05)
- [ ] Confirmas matriz de roles (06)
- [ ] Validas segmentación (07)
- [ ] Validas flujo 180° (08)
- [ ] Aprueban fases (09-10)

---

## 🔄 CONTINUIDAD

**Documento relacionado:** [CONTINUIDAD.md](CONTINUIDAD.md)

Contiene:

- Estado actual del proyecto
- Historial de sesiones
- Próximos pasos

---

**Generado:** 24 May 2026 | **Metodología:** DDD | **Estado:** 🔴 Esperando aprobación
