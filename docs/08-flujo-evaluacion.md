# 🔄 FLUJO DE EVALUACIÓN 180° — PerformAI

**Versión:** 1.0  
**Fecha:** 24 May 2026  
**Criticidad:** ⭐⭐⭐ CORE FEATURE  
**Documentación:** UML Sequence Diagram incluido

---

## 🎯 OVERVIEW DEL FLUJO

```
Líder evalúa → Colaborador se autoevalúa → Claude genera reporte
   ↓                  ↓                          ↓
pending_leader    pending_collaborator       completed
```

---

## 7️⃣ PASOS DETALLADOS

### PASO 1: Líder selecciona Colaborador y Tipo de Trabajador

**Pantalla:** "Iniciar Evaluación"

```
Líder ve:
├─ Lista de colaboradores del equipo
└─ Filtra/busca: "María"

Líder selecciona María:
├─ Sistema obtiene perfil de María
├─ Muestra tipo actual: "Senior"
└─ Opción: "¿Cambiar tipo para esta evaluación?"
   (NO, usa Senior siempre a menos que Admin lo cambie)

Líder confirma → Siguiente
```

**Datos guardados:**

```
/evaluations/{evalId}
├─ leaderId: <uidLíder>
├─ collaboratorId: <uidMaría>
├─ workerTypeId: "Senior"
├─ status: "pending_leader"
├─ cycle: "Q2_2026"
├─ createdAt: <timestamp>
└─ leaderResponses: {} (vacío aún)
```

---

### PASO 2: Sistema carga Preguntas Automáticamente

**Acción:** Interna (no visible para usuario)

```
Sistema ejecuta:
1. GET /questions WHERE workerType = "ALL"
   → [q1_base, q2_base, q3_base, q4_base, q5_base, q6_base]

2. GET /questions WHERE workerType = "Senior"
   → [q7_senior, q8_senior, q9_senior, q10_senior, q11_senior]

3. Arma formulario:
   Preguntas: [q1...q6, q7...q11]
   Orden: Número

4. Snapshots de preguntas en evaluación:
   /evaluations/{evalId}/questionsSnapshot
   ├─ {questionId: "q1_base", text: "Cumplimiento...", order: 1}
   ├─ {questionId: "q2_base", text: "Comunicación...", order: 2}
   └─ ... (congeladas aquí)
```

**Razón del snapshot:**

- Si Admin edita pregunta q1 después, esta evaluación la ignora
- Cada evaluación tiene su propia versión de preguntas

---

### PASO 3: Líder Evalúa

**Pantalla:** "Evaluación de María — Paso 3 de 7"

```
Líder ve:

[Pregunta 1 de 11]
"¿Cumple plazos?"
Escala: [1] [2] [3] [4] [5]
         Nunca ← → Siempre

Selecciona: 5 ⭐⭐⭐⭐⭐

[Campo opcional]
Justificación: "Siempre entrega antes de la fecha límite"

[Botones]
← Anterior | Siguiente →

[Progress bar] 27% completado
```

**Cada pregunta contiene:**

```
├─ Enunciado
├─ Escala 1-5 (radio buttons o slider)
├─ Opción "No aplica" (con checkbox)
├─ Campo "Justificación" (text area, opcional)
└─ Validaciones:
   ├─ Debe seleccionar 1-5 O "No aplica"
   └─ Si "No aplica" → justificación es obligatoria
```

**UI Detail — Cómo lucen las respuestas:**

```
Estado guardado en Firestore:
/evaluations/{evalId}/leaderResponses
├─ q1_base: {score: 5, naApplies: false, comment: "Siempre..."}
├─ q2_base: {score: 4, naApplies: false, comment: ""}
├─ q3_base: {score: null, naApplies: true, comment: "No aplica a su rol"}
└─ ... (en tiempo real con Firestore listener)
```

**Acciones disponibles:**

- ✅ Anterior / Siguiente
- ✅ Guardar borrador (auto-save cada 5s)
- ✅ Enviar cuando está completo (validar todas respondidas)
- ✅ Cancelar evaluación (solo si pending_leader)

---

### PASO 4: Líder Envía Evaluación

**Acción:** "Enviar Evaluación"

```
Líder da click en "Enviar"
Sistema valida:
├─ ✅ Todas las preguntas respondidas
├─ ✅ Cada pregunta: score 1-5 O naApplies=true
├─ ✅ Si naApplies=true → tiene justificación

Si valida:
├─ Actualiza: status → "pending_collaborator"
├─ Genera: evaluationSentAt = <timestamp>
├─ Guarda: leaderResponses (congeladas)
└─ Envía notificación a María

Si NO valida:
└─ Muestra: "Responde todas las preguntas antes de enviar"
```

**Cambio de estado:**

```
ANTES:
/evaluations/{evalId}
├─ status: "pending_leader"
└─ leaderResponses: {q1: 5, q2: 4, ...}

DESPUÉS:
/evaluations/{evalId}
├─ status: "pending_collaborator"
├─ leaderResponses: {q1: 5, q2: 4, ...} (congeladas)
├─ leaderSentAt: <timestamp>
└─ collaboratorResponses: {} (vacío aún)
```

---

### PASO 5: Colaborador Completa Autoevaluación

**Pantalla:** "Mis Evaluaciones Pendientes"

```
María ve:
┌──────────────────────────────────┐
│ ⚠️ Tienes 1 evaluación pendiente │
├──────────────────────────────────┤
│ Evaluación por: Juan (Líder)     │
│ Tipo trabajador: Senior          │
│ Período: Q2 2026 (Abr - Jun)     │
│ Estado: Completar autoevaluación │
│                                  │
│ [Comenzar autoevaluación] →      │
└──────────────────────────────────┘
```

**Restricción crítica:**

```
María accede a: /evaluations/{evalId}/autoevaluacion
Sistema verifica:
├─ ¿status = pending_collaborator? SÍ
├─ ¿collaboratorId = María? SÍ
├─ ¿Ya respondió? NO
└─ ✅ Acceso permitido

Sistema OCULTA:
├─ leaderResponses (no se muestran)
├─ leaderComments (no se muestran)
└─ Solo muestra:
   ├─ Las 11 preguntas (en blanco)
   └─ Instrucción: "Evalúate honestamente"
```

**Flujo de María:**

```
"Completar Autoevaluación"

[Pregunta 1 de 11]
"¿Cumples plazos?"

María responde según SU perspectiva:
→ 4 (casi siempre) vs. Líder dijo: 5

[Pregunta 3 de 11]
"¿Colaboras en equipo?"

María responde: 3 (a veces) vs. Líder: 4

(Luego se ven las diferencias en el reporte)
```

**Resultado guardado:**

```
/evaluations/{evalId}
├─ leaderResponses: {q1: 5, q2: 4, q3: 4, ...} (congeladas)
├─ collaboratorResponses: {q1: 4, q2: 5, q3: 3, ...} (nuevas)
├─ collaboratorSentAt: <timestamp>
└─ status: "completed"
```

---

### PASO 6: Sistema Consolida y Claude Genera Reporte

**Acción:** Automática (Firestore Trigger → Cloud Function)

```
Trigger: evaluations/{evalId} status = "completed"

Cloud Function ejecuta:

1. Consolida respuestas:
   Evaluación María (Senior):

   Pregunta 1: Líder=5, María=4 → Diferencia -1
   Pregunta 2: Líder=4, María=5 → Diferencia +1
   Pregunta 3: Líder=4, María=3 → Diferencia -1
   (Análisis de self-perception gap)

2. Prepara contexto para Claude:
   {
     "colaborador": "María",
     "tipo": "Senior",
     "liderRating": {...},
     "selfRating": {...},
     "differences": {...},
     "strengths": "Áreas donde líder y María coinciden alto",
     "gaps": "Áreas de discrepancia"
   }

3. Llama Claude API:
   POST /v1/messages
   {
     "model": "claude-sonnet-4-5",
     "max_tokens": 2000,
     "system": "Eres experto en evaluaciones de desempeño...",
     "messages": [{
       "role": "user",
       "content": "Genera reporte narrativo basado en: ..."
     }]
   }

4. Claude retorna:
   {
     "strengths": "María muestra fortalezas en...",
     "improvements": "Áreas donde puede mejorar...",
     "recommendations": "Le recomendamos...",
     "conversationGuide": "Para la reunión 1:1, considera..."
   }

5. Guarda en Firestore:
   /evaluations/{evalId}
   └─ aiReport: {
      strengths: "<texto>",
      improvements: "<texto>",
      recommendations: "<texto>",
      conversationGuide: "<texto>",
      generatedAt: <timestamp>
     }
```

**Restricción de seguridad:**

```
✅ ANTHROPIC_API_KEY SOLO en Cloud Function .env
❌ NUNCA expuesta en React
❌ NUNCA en frontend
```

---

### PASO 7: Líder y Colaborador Acceden al Reporte

**Para Líder:**

```
Pantalla: "Evaluaciones Completadas"

Tabla:
Colaborador | Tipo   | Enviado | Estado
María       | Senior | 22 May  | ✅ Completed

Líder click en María:

┌─────────────────────────────────────────┐
│ RESULTADOS DE DESEMPEÑO — María        │
│ Período: Q2 2026                       │
├─────────────────────────────────────────┤
│ 📊 Métricas                            │
│ Promedio Líder: 4.3/5                 │
│ Promedio María: 4.1/5                 │
│ Coincidencia: 82%                     │
│                                       │
│ 💪 FORTALEZAS                         │
│ • María muestra excelente autonomía   │
│ • Propone soluciones innovadoras      │
│ • Mentoriza a otros de forma natural  │
│                                       │
│ 📈 ÁREAS DE MEJORA                    │
│ • Comunicación de progreso             │
│ • Delegación de tareas                │
│                                       │
│ 🎯 RECOMENDACIONES                    │
│ • Establecer check-ins bisemanales    │
│ • Crear plan de mentoría formal       │
│                                       │
│ 💬 GUÍA PARA CONVERSACIÓN 1:1         │
│ 1. Reconocer fortalezas identificadas│
│ 2. Explorar percepciones diferentes   │
│ 3. Co-crear plan de acción            │
│                                       │
│ [Descargar PDF] [Compartir]           │
└─────────────────────────────────────────┘
```

**Para Colaborador:**

```
Pantalla: "Mi Reporte de Evaluación"

(Mismo reporte anterior)
+ Opción de descargar
- NO puede editar nada
```

---

## 📊 DIAGRAMA UML SEQUENCE

```
Líder         Sistema        Firestore      María       Claude API
  |              |               |            |             |
  |---Inicia--→  |               |            |             |
  |         evaluación           |            |             |
  |              |─→ Carga preguntas ←┤     |             |
  |              |    (snapshot)      |      |             |
  |← Formulario ←|               |            |             |
  |              |               |            |             |
  |---Completa→  |               |            |             |
  |  y envía     |─→ Guarda respuestas →│    |             |
  |              |               |            |             |
  |              |←─ Status=pending_coll ──→ María |         |
  |              |          (notificación)   |             |
  |              |               |            |             |
  |              |               |   ←─ Autoevalúa ←|      |
  |              |               |← Guarda respuestas        |
  |              |               |            |             |
  |              |─→ Trigger: Status=completed            |
  |              |     → Cloud Function      |             |
  |              |                           |             |
  |              |     Consolida respuestas  |             |
  |              |                           |             |
  |              |───────────────────────→ Claude API     |
  |              |     Genera reporte       |← Response ─|
  |              |←────────────────────────| (narrativa)  |
  |              |    Guarda aiReport       |             |
  |              |               |            |             |
  |← Reporte ←───|               |            |             |
  |              |               |            |             |
  |                              |            |← Reporte ←|
```

---

## 🔐 RESTRICCIONES DE DATOS

### Seguridad de Respuestas del Líder

```
ESTADO: pending_collaborator

✅ Colaborador PUEDE ver:
   ├─ Las preguntas
   ├─ Campo para responder (vacío)
   └─ Instrucción: "Evalúate honestamente"

❌ Colaborador NO PUEDE ver:
   ├─ leaderResponses (las respuestas del líder)
   ├─ leaderComments (justificaciones)
   ├─ Ningún indicador de progreso del líder
   └─ "Pistas" de qué respondió el líder
```

**Implementación en Firebase Rules:**

```
match /evaluations/{evalId} {
  match /leaderResponses/{doc=**} {
    allow read: if request.auth.uid == getEvaluation().leaderId;
  }

  match /collaboratorResponses/{doc=**} {
    allow read: if request.auth.uid == getEvaluation().collaboratorId
      && getEvaluation().status == "completed";
  }
}
```

---

## 📧 NOTIFICACIONES

### Notificación 1: Evaluación Iniciada

```
Para: Colaborador
Asunto: "Tu líder ha iniciado tu evaluación de desempeño"
Cuerpo: "Completa tu autoevaluación en los próximos 5 días"
Acción: [Comenzar autoevaluación]
```

### Notificación 2: Reporte Generado

```
Para: Líder + Colaborador
Asunto: "Tu reporte 180° está listo"
Cuerpo: "Accede a tu evaluación completada"
Acción: [Ver reporte]
```

---

## ⏰ TIEMPOS

| Acción                    | Tiempo estimado |
| ------------------------- | --------------- |
| Líder completa evaluación | 15-20 min       |
| Colaborador autoevalúa    | 15-20 min       |
| Claude genera reporte     | 5-10 seg        |
| Total ciclo               | 30-40 min       |

---

## 🚨 CASOS DE BORDE

### Caso 1: ¿Qué si María no responde en 5 días?

```
Opción v1.0: Notificaciones de recordatorio (email)
Opción v2.0: Evaluación se marca como "overdue"
           → Admin puede "completar por default"
```

### Caso 2: ¿Líder quiere editar después de enviar?

```
NO PERMITIDO. Una vez enviado (pending_collaborator):
- Líder NO puede editar
- Líder NO puede cancelar

Opción: Crear nueva evaluación
```

### Caso 3: ¿Colaborador quiere cambiar respuestas después?

```
Si status == "pending_collaborator": SÍ puede editar
Si status == "completed": NO puede editar (congelado)
```

---

**Estado:** 🔴 Esperando aprobación  
**Próximo:** Modelo de datos (05-modelo-de-datos.md)
