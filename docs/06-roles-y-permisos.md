# 👥 ROLES Y PERMISOS — PerformAI

**Versión:** 1.0  
**Fecha:** 24 May 2026  
**Método de Autenticación:** Firebase Auth (email/password)

---

## 🎯 3 ROLES DEFINIDOS

### 1️⃣ ADMIN RRHH

**Descripción:** Administrador del sistema, gestor del banco de preguntas y tipos de trabajador.

#### Permisos por Feature

| Feature               | Ver | Crear | Editar | Eliminar | Aprobar |
| --------------------- | --- | ----- | ------ | -------- | ------- |
| Tipos de trabajador   | ✅  | ✅    | ✅     | ✅\*     | —       |
| Preguntas base        | ✅  | ✅    | ✅     | ✅       | —       |
| Preguntas por tipo    | ✅  | ✅    | ✅     | ✅       | —       |
| Ciclos evaluativos    | ✅  | ✅    | ✅     | ✅       | —       |
| Evaluaciones (todas)  | ✅  | —     | —      | —        | —       |
| Reportes (todas)      | ✅  | —     | —      | —        | —       |
| Dashboard ejecutivo   | ✅  | —     | —      | —        | —       |
| Configuración sistema | ✅  | ✅    | ✅     | —        | —       |

**\* Restricción importante:**

- No puede eliminar tipo si tiene evaluaciones asociadas (activas o históricas)
- Puede desactivar tipo (soft delete)

#### Casos de Uso

1. **Crear tipo "Otros" personalizado**

   ```
   Admin → Configuración → Tipos trabajador → Nuevo
   Ingresa: "Practicante"
   El tipo hereda preguntas base + puede tener preguntas específicas
   ```

2. **Editar banco de preguntas por tipo**

   ```
   Admin → Preguntas → Selecciona tipo "Gerente"
   Modifica/añade preguntas específicas
   Cambios se aplican a evaluaciones futuras (no retroactivo)
   ```

3. **Configurar ciclo evaluativo**
   ```
   Admin → Ciclos → Nuevo ciclo
   "Q2 2026": 01 Abr - 30 Jun, Trimestral
   ```

---

### 2️⃣ LÍDER DE EQUIPO

**Descripción:** Gerente/supervisor que evalúa a sus colaboradores.

#### Permisos por Feature

| Feature                    | Ver               | Crear | Editar   | Eliminar |
| -------------------------- | ----------------- | ----- | -------- | -------- |
| Mis colaboradores          | ✅                | —     | —        | —        |
| Iniciar evaluación         | ✅                | ✅    | ❌       | ✅\*\*   |
| Completar mi evaluación    | ✅                | ✅    | ✅\*\*\* | ❌       |
| Estado evaluaciones equipo | ✅                | —     | —        | —        |
| Ver reporte IA             | ✅                | —     | ❌       | —        |
| Descargar guía 1:1         | ✅                | —     | —        | —        |
| Ver tipos de trabajador    | ✅ (solo lectura) | ❌    | ❌       | ❌       |
| Ver banco de preguntas     | ✅ (solo lectura) | ❌    | ❌       | ❌       |

**\*\* Restricción:** Solo si evaluación está en estado `pending_leader`  
**\*\*\* Restricción:** Solo antes de enviar (mientras está en borrador)

#### Casos de Uso

1. **Iniciar evaluación 180°**

   ```
   Líder → Equipo → Colaborador (ej: María)
   Selecciona tipo: "Senior"
   Sistema carga preguntas (base + Senior)
   Líder completa y envía
   → Sistema notifica a María
   ```

2. **Ver estado del equipo**

   ```
   Líder → Dashboard equipo
   Tabla: Colaborador | Tipo | Estado | Fecha inicio
   "María (Senior)" | pending_collaborator | 22 May
   "Juan (Junior)" | completed | 20 May
   ```

3. **Acceder al reporte generado**
   ```
   Líder → Evaluaciones → María (completed)
   Ve:
   - Fortalezas (texto narrativo generado por Claude)
   - Áreas de mejora
   - Recomendaciones concretas
   - Guía de conversación 1:1
   ```

---

### 3️⃣ COLABORADOR

**Descripción:** Empleado que se autoevalúa y recibe feedback.

#### Permisos por Feature

| Feature                     | Ver        | Crear | Editar   | Eliminar |
| --------------------------- | ---------- | ----- | -------- | -------- |
| Mis evaluaciones pendientes | ✅         | —     | —        | —        |
| Completar autoevaluación    | ✅         | ✅    | ✅\*\*\* | ❌       |
| Ver mi reporte              | ✅         | —     | ❌       | —        |
| Descargar mi reporte        | ✅         | —     | —        | —        |
| Ver historial evaluaciones  | ✅         | —     | —        | —        |
| Ver respuestas líder        | ✅\*\*\*\* | —     | —        | —        |

**\*\*\* Restricción:** Solo antes de enviar (borrador)  
**\*\*\*\* Restricción CRÍTICA:** Solo DESPUÉS de completar su autoevaluación

#### Casos de Uso

1. **Completar autoevaluación**

   ```
   Colaborador → Evaluaciones pendientes → María (Te falta autoevaluar)
   Lee instrucción: "Evalúate en las mismas competencias que tu líder"
   Completa formulario (preguntas base + tipo específico)
   Envía
   ```

2. **Ver su reporte**

   ```
   Colaborador → Mis reportes
   Ve narrativa generada por Claude:
   - Fortalezas identificadas
   - Áreas de mejora propuestas
   - Recomendaciones personalizadas
   - Puede descargar en PDF
   ```

3. **Ver historial**
   ```
   Colaborador → Historial
   Lista: Q1 2026 | Promedio 4.2 | Descargar
          Q4 2025 | Promedio 4.0 | Descargar
   ```

---

## 🔐 RESTRICCIONES DE SEGURIDAD CRÍTICAS

### 1. Segmentación de Datos

```
Admin RRHH: Ve TODAS las evaluaciones de TODA la empresa
Líder: Ve SOLO evaluaciones de su equipo directo
Colaborador: Ve SOLO sus propias evaluaciones
```

**Implementación:** Firebase Security Rules + userId en Firestore

### 2. El Secreto de la Autoevaluación

**REGLA DE ORO:**

```
Colaborador NO puede ver respuestas del Líder
HASTA que haya completado su propia autoevaluación
```

**Flujo:**

1. Líder completa evaluación (estado: `pending_collaborator`)
2. Colaborador notificado
3. Colaborador accede → Ve SOLO su formulario vacío
4. Colaborador envía (estado: `completed`)
5. Recién ahora → Colaborador puede ver respuestas del Líder

**Razón:** Evitar que el colaborador se influencie con las respuestas del líder.

### 3. No Editar Evaluaciones Completadas

```
Líder NO puede editar si Colaborador ya respondió
Colaborador NO puede editar si ya envió
```

### 4. No Eliminar Tipo si Tiene Evaluaciones

```
Admin intenta eliminar tipo "Senior"
Sistema verifica: ¿Tiene evaluaciones?
Si: "No se puede eliminar. Evaluaciones activas: 5"
Si: Permite eliminar (con confirmación)
```

### 5. API Key Protegida

```
ANTHROPIC_API_KEY en .env de Cloud Functions
NO está en código React
NO está versionada en Git
Claude API solo se llama desde servidor
```

---

## 🔄 MATRIZ DE TRANSICIONES DE EVALUACIÓN

### Estado: `pending_leader`

- **Quién puede ver:** Líder
- **Quién puede editar:** Líder
- **Acciones disponibles:** Completar, cancelar
- **Colaborador ve:** Notificación (no accede a formulario aún)

### Estado: `pending_collaborator`

- **Quién puede ver:** Líder, Colaborador
- **Quién puede editar:** Solo Colaborador
- **Acciones disponibles (Colaborador):** Completar, rechazar
- **Restricción:** Colaborador NO ve respuestas del Líder

### Estado: `completed`

- **Quién puede ver:** Líder, Colaborador, Admin RRHH
- **Quién puede editar:** NADIE
- **Qué se genera:** Reporte narrativo por Claude
- **Acciones:** Descargar, compartir, ver reporte

---

## 🎯 PERMISOS EN FIRESTORE RULES

### Collection `/evaluations/{evalId}`

```
rule ADMIN_RRHH:
  allow read: if request.auth.token.role == "admin_rrhh"

rule LIDER_READ:
  allow read: if request.auth.token.role == "leader"
    && resource.data.leaderId == request.auth.uid

rule COLABORADOR_READ:
  allow read: if request.auth.token.role == "collaborator"
    && resource.data.collaboratorId == request.auth.uid
    && resource.data.status == "completed"

rule COLABORADOR_READ_PENDING:
  allow read: if request.auth.token.role == "collaborator"
    && resource.data.collaboratorId == request.auth.uid
    && resource.data.status == "pending_collaborator"
    && !("leaderResponses" in resource.data)  // No ver aún
```

---

## 📊 CASOS DE BORDE

### Caso 1: ¿Qué pasa si el Líder intenta ver la evaluación del Colaborador?

```
Búsqueda de Maria (Colaborador) en evaluaciones
Líder NO la ve en lista
Intenta acceder directo por URL → Acceso denegado por Firebase Rules
```

### Caso 2: ¿Admin puede ver contraseñas de usuarios?

```
NO. Las contraseñas nunca se guardan en Firestore.
Firebase Auth las maneja encriptadas.
```

### Caso 3: ¿Puede haber múltiples líderes para un Colaborador?

```
v1.0: NO. Un colaborador pertenece a un Líder.
v2.0: Considerar matriz de competencias.
```

### Caso 4: ¿El Colaborador puede ser Líder a la vez?

```
SÍ, es común.
Firestore distingue roles por evaluación:
- Como Líder: evalúa su equipo
- Como Colaborador: se autoevalúa ante su Líder
```

---

**Estado:** 🔴 Esperando aprobación  
**Próximo:** Segmentación de preguntas (07-segmentacion-preguntas.md)
