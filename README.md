# 📖 README — PerformAI

**Proyecto:** PerformAI para Prevalentware  
**Estado:** 🔵 Fase de Documentación (Pre-desarrollo)  
**Última actualización:** 24 de Mayo de 2026

---

## 🎯 VISIÓN

**PerformAI** es una plataforma web de **evaluación del desempeño 180° con IA generativa** que centraliza, estandariza y automatiza el proceso evaluativo en Prevalentware.

**Feature principal:** Segmentación de preguntas por tipo de trabajador, generación automática de reportes narrativos con Claude API.

---

## 🚀 INICIO RÁPIDO

### 1. Entender el Proyecto

**Lectura recomendada (15 minutos):**

1. [Alcance del Proyecto](docs/01-alcance-del-proyecto.md) — ¿Qué es PerformAI?
2. [Roles y Permisos](docs/06-roles-y-permisos.md) — ¿Quién usa qué?
3. [Flujo Evaluación 180°](docs/08-flujo-evaluacion.md) — ¿Cómo funciona?

**Lectura estratégica (30 minutos):**

4. [Segmentación de Preguntas](docs/07-segmentacion-preguntas.md) — La feature core
5. [Modelo de Datos](docs/05-modelo-de-datos.md) — Estructura Firestore

---

### 2. Ver Índice Maestro

Toda la documentación disponible en:

👉 **[ÍNDICE MAESTRO](docs/INDICE.md)** — Mapa de todos los documentos

---

### 3. Ver Estado Actual

Dónde estamos en el proyecto:

👉 **[CONTINUIDAD](docs/CONTINUIDAD.md)** — Estado actual + próximos pasos

---

## 📁 ESTRUCTURA DEL PROYECTO

```
performai/
├── docs/                    ← 📚 DOCUMENTACIÓN (LEE AQUÍ PRIMERO)
│   ├── INDICE.md           (Mapa maestro)
│   ├── CONTINUIDAD.md      (Estado actual)
│   ├── 01-alcance-del-proyecto.md
│   ├── 02-sistema-de-diseno.md
│   ├── ... (10 documentos base)
│   ├── referencias/
│   │   ├── reglas-seguridad-firebase.md  (✅ CRÍTICO)
│   │   ├── paleta-colores.md
│   │   └── restricciones-api-claude.md
│   └── FASES_DETALLADAS/
│       ├── FASE_1_maquetacion.md
│       ├── FASE_2_react_typescript.md
│       └── FASE_3_firebase_ia.md
│
├── src/                    ← 💻 CÓDIGO (FASE 2+)
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   ├── types/
│   ├── utils/
│   └── ...
│
├── functions/              ← ☁️ CLOUD FUNCTIONS (FASE 3)
│   └── src/
│
└── README.md              (este archivo)
```

---

## 🎨 PALETA DE COLORES

```
Púrpura Principal:    #6C3E99  (botones, acentos)
Azul Marina:          #003A70  (headers, navegación)
Blanco:               #FFFFFF  (fondos)
Verde:                #4CAF50  (success)
```

👉 [Ver paleta completa](docs/referencias/paleta-colores.md)

---

## 📅 FASES DEL PROYECTO

### FASE 1: Maquetación HTML/CSS (Semanas 1-4)

- [ ] Sistema de diseño aprobado
- [ ] 8 vistas maquetadas (sin React)
- [ ] Mobile-first responsive

**Entregable:** HTML/CSS estático

---

### FASE 2: React + TypeScript (Semanas 5-8)

- [ ] Componentes React tipados
- [ ] Routing configurado
- [ ] Mocks de datos

**Entregable:** App funcional sin Firebase

---

### FASE 3: Firebase + Claude IA (Semanas 9-12)

- [ ] Firestore integrado
- [ ] Authentication
- [ ] Cloud Functions + Claude API
- [ ] Reportes generando automáticamente

**Entregable:** App lista para beta

---

## 🔑 CONCEPTOS CLAVE

### 1. Segmentación de Preguntas

```
Tipos de Trabajador:
├─ Gerente    ├─ Preguntas base (6)
├─ Senior     ├─ Preguntas específicas (5)
├─ Junior     └─ Total: 11 preguntas
└─ Pasante       por evaluación

+ "Otros" personalizables (CRUD Admin RRHH)
```

👉 [Detalle completo](docs/07-segmentacion-preguntas.md)

### 2. Flujo 180°

```
Líder evalúa (pending_leader)
    ↓
Colaborador se autoevalúa (pending_collaborator)
    ↓
Claude genera reporte (completed)
```

👉 [Flujo paso a paso](docs/08-flujo-evaluacion.md)

### 3. Seguridad Firebase

```
⚠️ REGLA CRÍTICA:
"Cada vez que veas 'allow read, write: if true'
→ ES UN SECURITY BREACH"

✅ Checklista previa: docs/referencias/reglas-seguridad-firebase.md
```

👉 [Leer guía completa](docs/referencias/reglas-seguridad-firebase.md)

---

## 👥 ROLES DE USUARIO (3)

| Rol             | Permisos Clave                               |
| --------------- | -------------------------------------------- |
| **Admin RRHH**  | CRUD tipos + preguntas + dashboard ejecutivo |
| **Líder**       | Evalúa sus colaboradores + ve reportes       |
| **Colaborador** | Se autoevalúa + ve su reporte                |

👉 [Matriz completa de permisos](docs/06-roles-y-permisos.md)

---

## 🛠️ TECH STACK

```
Frontend:     React 18 + TypeScript + Tailwind
Backend:      Firebase Cloud Functions
Base datos:   Firestore (NoSQL)
Autenticación: Firebase Auth
IA:           Anthropic Claude API (claude-sonnet-4-5)
Hosting:      Firebase Hosting
```

👉 [Justificaciones técnicas](docs/03-tech-stack.md)

---

## ✅ DECISIONES IMPORTANTES

### Metodología: DDD (Document Driven Development)

```
REGLA CRÍTICA:
Documento aprobado → Implementación → Testing

❌ NO: Código primero
✅ SÍ: Documentación primero
```

### REGLA: API Key Protegida

```
❌ NUNCA en React:
const openai = new OpenAI({ apiKey: 'sk-...' })

✅ SIEMPRE en Cloud Functions:
functions/src/.env → ANTHROPIC_API_KEY
Acceso desde backend solo
```

---

## 🔐 CHECKLIST PRE-LANZAMIENTO

Antes de deploy a producción:

- [ ] Firestore Security Rules auditadas
- [ ] ANTHROPIC_API_KEY NO en frontend
- [ ] `gitleaks detect --source .` pasa
- [ ] Performance: Lighthouse > 90
- [ ] Firebase Storage rules configuradas
- [ ] CORS solo para dominios autorizados
- [ ] Inputs validados en servidor
- [ ] Errores NO exponen detalles internos

👉 [Checklist completo](docs/referencias/reglas-seguridad-firebase.md)

---

## 📊 ESTADO ACTUAL

**Fase:** 🔵 Pre-desarrollo (Documentación)  
**Completado:**

- ✅ 14 documentos base
- ✅ Referencias extraídas (seguridad, colores)
- ✅ Estructura DDD establecida

**Pendiente:**

- 🔲 Aprobación usuario
- 🔲 Fase 1: Maquetación HTML/CSS

👉 [Ver estado detallado](docs/CONTINUIDAD.md)

---

## 🚀 PRÓXIMOS PASOS

### Para Comenzar Desarrollo

1. **Lee documentación clave** (45 minutos)
   - INDICE.md
   - 01-alcance-del-proyecto.md
   - 08-flujo-evaluacion.md

2. **Aprueba o sugiere cambios** (email)

3. **Fase 1.1 comienza** (Maquetación HTML/CSS)

---

## 📞 CONTACTO

| Aspecto       | Contacto             |
| ------------- | -------------------- |
| Documentación | Ver `/docs`          |
| Decisiones    | GitHub Issues        |
| Cambios scope | Comunicación directa |
| Emergencias   | Email urgente        |

---

## 📝 REFERENCIAS EXTERNAS

- [Firebase Docs](https://firebase.google.com/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Anthropic Claude API](https://www.anthropic.com/api)

---

## 📜 VERSIONADO

| Versión | Fecha       | Cambios                        |
| ------- | ----------- | ------------------------------ |
| 1.0     | 24 May 2026 | Documentación inicial completa |

---

## 🎓 CÓMO USAR ESTE REPO

```bash
# 1. Clonar
git clone <repo-url>
cd performai

# 2. Leer documentación (primero)
open docs/INDICE.md

# 3. Instalar dependencias (Fase 2+)
npm install

# 4. Iniciar desarrollo (Fase 2+)
npm run dev

# 5. Testing (Fase 2+)
npm run test

# 6. Build (Fase 3)
npm run build
```

---

## ⚖️ LICENCIA

Proyecto propietario de Prevalentware.

---

**Generated:** 24 de Mayo de 2026  
**Última revisión:** 24 May 2026  
**Status:** 🟢 Documentación Completa — Esperando Aprobación
