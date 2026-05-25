# 📊 MODELO DE DATOS — PerformAI

**Versión:** 1.0  
**Fecha:** 24 May 2026  
**Base de datos:** Firestore (NoSQL)  
**Tipo de documento:** Subcollections

---

## 🗂️ COLECCIONES FIRESTORE

### 1️⃣ `/users` — Perfiles de Usuarios

```javascript
/users/{userId}
├─ email: string (unique, indexed)
├─ displayName: string
├─ role: "admin_rrhh" | "leader" | "collaborator" (custom claim)
├─ photoURL: string (optional)
├─ department: string (ej: "Ingeniería")
├─ managedTeamIds: string[] (array de IDs que lidera, solo si role=leader)
├─ createdAt: timestamp
├─ updatedAt: timestamp
├─ isActive: boolean
└─ lastLoginAt: timestamp
```

**Indexes:**

```
- email (unique)
- role
- department
- isActive
```

**Ejemplo:**

```json
{
  "email": "maria@prevalentware.com",
  "displayName": "María García",
  "role": "collaborator",
  "department": "Ingeniería",
  "managedTeamIds": [],
  "createdAt": 1621468800000,
  "isActive": true,
  "lastLoginAt": 1621902000000
}
```

---

### 2️⃣ `/workerTypes` — Tipos de Trabajador

```javascript
/workerTypes/{typeId}
├─ name: string (ej: "Senior", "Freelance")
├─ isFixed: boolean (true = Gerente/Senior/Junior/Pasante; false = custom)
├─ description: string (optional)
├─ order: number (para ordenar en UI)
├─ createdBy: string (userId del Admin que lo creó)
├─ createdAt: timestamp
├─ isActive: boolean (soft delete)
└─ evaluationCount: number (denormalized, para validaciones)
```

**Datos iniciales (fijos):**

```json
[
  {
    "typeId": "type_manager",
    "name": "Gerente",
    "isFixed": true,
    "order": 1,
    "createdAt": 1621468800000
  },
  {
    "typeId": "type_senior",
    "name": "Senior",
    "isFixed": true,
    "order": 2,
    "createdAt": 1621468800000
  },
  {
    "typeId": "type_junior",
    "name": "Junior",
    "isFixed": true,
    "order": 3,
    "createdAt": 1621468800000
  },
  {
    "typeId": "type_trainee",
    "name": "Pasante",
    "isFixed": true,
    "order": 4,
    "createdAt": 1621468800000
  }
]
```

**Ejemplo (custom "Otros"):**

```json
{
  "typeId": "type_custom_freelance",
  "name": "Freelance",
  "isFixed": false,
  "description": "Contratista externo",
  "order": 5,
  "createdBy": "admin_rrhh_001",
  "createdAt": 1621468800000,
  "isActive": true,
  "evaluationCount": 3
}
```

---

### 3️⃣ `/questions` — Banco de Preguntas

```javascript
/questions/{questionId}
├─ text: string (enunciado de la pregunta)
├─ workerTypeId: string ("ALL" = base; "Senior", "type_custom_freelance", etc)
├─ category: "technical" | "soft" | "management" | "general"
├─ order: number (para ordenamiento)
├─ isActive: boolean (soft delete)
├─ createdBy: string (userId del Admin)
├─ createdAt: timestamp
├─ updatedAt: timestamp
└─ archivedAt: timestamp (opcional, cuando se archiva)
```

**Indexes:**

```
- workerTypeId
- category
- isActive
- order
```

**Ejemplo (Pregunta Base):**

```json
{
  "questionId": "q_base_001",
  "text": "¿Cumples con los plazos establecidos?",
  "workerTypeId": "ALL",
  "category": "general",
  "order": 1,
  "isActive": true,
  "createdBy": "admin_rrhh_001",
  "createdAt": 1621468800000
}
```

**Ejemplo (Pregunta específica Senior):**

```json
{
  "questionId": "q_senior_003",
  "text": "¿Proporcionas mentoría efectiva a otros?",
  "workerTypeId": "type_senior",
  "category": "soft",
  "order": 3,
  "isActive": true,
  "createdBy": "admin_rrhh_001",
  "createdAt": 1621468800000
}
```

---

### 4️⃣ `/evaluations` — Evaluaciones 180°

**Estructura principal:**

```javascript
/evaluations/{evaluationId}
├─ leaderId: string (userId del líder)
├─ collaboratorId: string (userId del colaborador)
├─ collaboratorName: string (denormalized para queries rápidas)
├─ workerTypeId: string (Senior, type_custom_freelance, etc)
├─ cycleId: string (ej: "cycle_q2_2026")
├─ status: "pending_leader" | "pending_collaborator" | "completed"
│
├─ leaderResponses: map
│  ├─ q_base_001: {
│  │   score: number (1-5),
│  │   naApplies: boolean,
│  │   comment: string (optional)
│  │ }
│  └─ ... (resto de respuestas)
│
├─ collaboratorResponses: map (vacío hasta que colaborador responda)
│  ├─ q_base_001: { score: 4, naApplies: false, comment: "" }
│  └─ ...
│
├─ questionsSnapshot: array (preguntas CONGELADAS del momento)
│  ├─ {
│  │   questionId: "q_base_001",
│  │   text: "¿Cumples plazos?",
│  │   workerTypeId: "ALL",
│  │   order: 1
│  │ }
│  └─ ...
│
├─ aiReport: map (generado por Claude, solo si status=completed)
│  ├─ strengths: string (narrativa)
│  ├─ improvements: string (narrativa)
│  ├─ recommendations: string (narrativa)
│  ├─ conversationGuide: string (guía 1:1 para líder)
│  └─ generatedAt: timestamp
│
├─ createdAt: timestamp
├─ leaderSentAt: timestamp (cuando líder envía)
├─ collaboratorSentAt: timestamp (cuando colaborador envía)
└─ completedAt: timestamp
```

**Indexes:**

```
- leaderId, createdAt
- collaboratorId, status
- cycleId, status
- workerTypeId
- status
```

**Ejemplo:**

```json
{
  "evaluationId": "eval_001_maria",
  "leaderId": "user_juan_leader",
  "collaboratorId": "user_maria",
  "collaboratorName": "María García",
  "workerTypeId": "type_senior",
  "cycleId": "cycle_q2_2026",
  "status": "completed",

  "leaderResponses": {
    "q_base_001": {
      "score": 5,
      "naApplies": false,
      "comment": "Siempre entrega antes"
    },
    "q_base_002": {
      "score": 4,
      "naApplies": false,
      "comment": ""
    },
    "q_senior_001": {
      "score": 0,
      "naApplies": true,
      "comment": "No aplica en este proyecto"
    }
  },

  "collaboratorResponses": {
    "q_base_001": { "score": 4, "naApplies": false, "comment": "" },
    "q_base_002": {
      "score": 5,
      "naApplies": false,
      "comment": "Me esfuerzo bastante"
    },
    "q_senior_001": { "score": 0, "naApplies": true, "comment": "No aplica" }
  },

  "questionsSnapshot": [
    {
      "questionId": "q_base_001",
      "text": "¿Cumples plazos?",
      "workerTypeId": "ALL",
      "order": 1
    },
    {
      "questionId": "q_senior_001",
      "text": "¿Proporcionas mentoría?",
      "workerTypeId": "type_senior",
      "order": 7
    }
  ],

  "aiReport": {
    "strengths": "María muestra fortalezas en...",
    "improvements": "Puede mejorar en...",
    "recommendations": "Le recomendamos...",
    "conversationGuide": "Para la reunión 1:1...",
    "generatedAt": 1621986000000
  },

  "createdAt": 1621468800000,
  "leaderSentAt": 1621554000000,
  "collaboratorSentAt": 1621640000000,
  "completedAt": 1621640000000
}
```

---

### 5️⃣ `/evaluationCycles` — Ciclos de Evaluación

```javascript
/evaluationCycles/{cycleId}
├─ name: string (ej: "Q2 2026")
├─ period: "monthly" | "quarterly" | "biannual"
├─ startDate: timestamp
├─ endDate: timestamp
├─ status: "draft" | "active" | "closed"
├─ createdBy: string (userId del Admin)
├─ createdAt: timestamp
├─ description: string (optional)
└─ evaluationCount: number (denormalized)
```

**Ejemplo:**

```json
{
  "cycleId": "cycle_q2_2026",
  "name": "Q2 2026 — Evaluación Trimestral",
  "period": "quarterly",
  "startDate": 1617235200000, // 1 Abr 2026
  "endDate": 1625011200000, // 30 Jun 2026
  "status": "active",
  "createdBy": "admin_rrhh_001",
  "createdAt": 1617235200000,
  "description": "Evaluación del segundo trimestre 2026",
  "evaluationCount": 45
}
```

---

### 6️⃣ `/notifications` — Notificaciones (Opcional v1.0)

```javascript
/notifications/{notificationId}
├─ recipientId: string (userId)
├─ type: "evaluation_initiated" | "evaluation_ready" | "report_ready"
├─ title: string
├─ body: string
├─ actionUrl: string (link a la evaluación)
├─ read: boolean
├─ createdAt: timestamp
└─ expiresAt: timestamp
```

---

## 📐 RELACIONES & INTEGRIDAD

### Relación 1: User → WorkerType

```
Usuario María (collaborator):
  ├─ currentWorkerTypeId: "type_senior"
  └─ Cuando se evalúa:
     → El Líder selecciona tipo (puede ser diferente)
     → Se crea /evaluations/eval_001
        └─ workerTypeId: type_senior (snapshot del momento)
```

### Relación 2: WorkerType → Questions

```
workerTypeId = "type_senior"
├─ Preguntas base (workerTypeId = "ALL"): 6
├─ Preguntas Senior (workerTypeId = "type_senior"): 5
└─ Total en evaluación: 11 (combinadas automáticamente)
```

### Relación 3: Evaluation → Questions (Snapshot)

```
Evaluación creada: 20 May 2026
├─ questionIds referenciadas en questionsSnapshot
├─ Si Admin edita pregunta después (21 May)
│  → Esta evaluación ignora el cambio
└─ Nueva evaluación (22 May)
   → Usa preguntas editadas (versión actual)
```

---

## 🔒 DENORMALIZACIÓN & PERFORMANCE

### Denormalizaciones Justificadas

| Campo                             | Razón                          | Actualización          |
| --------------------------------- | ------------------------------ | ---------------------- |
| `users.displayName` en evaluación | Mostrar nombre en lista rápido | Cuando se crea eval    |
| `workerTypes.evaluationCount`     | Validar eliminación            | Trigger Cloud Function |
| `questions.snapshot` en eval      | Congelar preguntas             | Cuando se crea eval    |
| `evaluations.collaboratorName`    | Queries por nombre             | Cuando se crea eval    |

### Queries Frecuentes (Optimizadas con Índices)

```
1. "Mostrar evaluaciones de María"
   db.collection('evaluations')
     .where('collaboratorId', '==', 'user_maria')
     .where('status', '==', 'completed')
     .orderBy('completedAt', 'desc')

2. "Evaluaciones pendientes de Juan (líder)"
   db.collection('evaluations')
     .where('leaderId', '==', 'user_juan')
     .where('status', '==', 'pending_collaborator')

3. "Todas las evaluaciones del ciclo Q2"
   db.collection('evaluations')
     .where('cycleId', '==', 'cycle_q2_2026')
     .where('status', '==', 'completed')
```

---

## 🔐 FIRESTORE SECURITY RULES (Summary)

```
// /users/{userId}
allow read, write: if request.auth.uid == userId

// /workerTypes/{typeId}
allow read: if true (pública)
allow write: if request.auth.token.role == "admin_rrhh"

// /questions/{questionId}
allow read: if true (pública)
allow write: if request.auth.token.role == "admin_rrhh"

// /evaluations/{evalId}
allow read: if
  request.auth.uid == resource.data.leaderId OR
  request.auth.uid == resource.data.collaboratorId OR
  request.auth.token.role == "admin_rrhh"
allow write: if
  (request.auth.uid == resource.data.leaderId AND status=="pending_leader") OR
  (request.auth.uid == resource.data.collaboratorId AND status=="pending_collaborator")
```

---

## 📈 ESCALABILIDAD

### Límites Firestore

- ✅ **Máximo documentos:** Ilimitado
- ✅ **Máximo por query:** 1 millón recomendado
- ✅ **Tamaño documento:** 1 MB máximo

### Estrategia para Escalar

```
Si evaluations > 1M:
├─ Particionar por año: evaluations_2026, evaluations_2027
├─ Particionar por mes: evaluations_2026_05, evaluations_2026_06
└─ Usar Firestore Datastore (escalabilidad infinita)
```

---

**Estado:** 🔴 Esperando aprobación  
**Próximo:** Arquitectura del proyecto (04-arquitectura-del-proyecto.md)
