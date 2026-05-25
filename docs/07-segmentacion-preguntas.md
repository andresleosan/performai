# 🎯 SEGMENTACIÓN DE PREGUNTAS — PerformAI

**Versión:** 1.0  
**Fecha:** 24 May 2026  
**Criticidad:** ⭐⭐⭐ CORE FEATURE

---

## 🏷️ TIPOS DE TRABAJADOR

### Tipos Fijos (No editables)

Definidos a nivel de sistema, no pueden ser eliminados:

```
1. Gerente
   └─ Rol gerencial, responsabilidad de equipo
   └─ Preguntas específicas: Gestión, delegación, liderazgo

2. Senior
   └─ Rol de especialista con experiencia
   └─ Preguntas específicas: Mentoría, autonomía, innovación

3. Junior
   └─ Rol de aprendizaje y desarrollo
   └─ Preguntas específicas: Curva de aprendizaje, implementación

4. Pasante
   └─ Rol temporal de formación
   └─ Preguntas específicas: Adaptación, básicos
```

### Tipos Personalizables ("Otros")

Admin RRHH puede crear/editar/eliminar (con restricciones):

```
Ejemplos:
├── Practicante
├── Freelance
├── Consultor
├── Técnico especializado
├── Asistente administrativo
└── Etc...
```

**Permiso:** Solo Admin RRHH  
**Restricción:** No pueden eliminarse si tienen evaluaciones asociadas

---

## 📝 ESTRUCTURA DE PREGUNTAS

### Nivel 1: PREGUNTAS BASE (Todas)

Aplican a **TODOS los tipos de trabajador**.

```
Ejemplo (6 preguntas base):
1. Cumplimiento de plazos
   "¿Entrega el trabajo a tiempo?"

2. Comunicación efectiva
   "¿Se comunica claramente con el equipo?"

3. Colaboración
   "¿Trabaja bien en equipo?"

4. Iniciativa
   "¿Toma iniciativa para resolver problemas?"

5. Calidad de trabajo
   "¿El trabajo cumple estándares de calidad?"

6. Actitud hacia el feedback
   "¿Acepta feedback de manera constructiva?"
```

**Características:**

- ✅ Definidas por Admin RRHH (centralizadas)
- ✅ Aplicables a TODOS
- ✅ NO pueden ser eliminadas (parte del core)
- ❌ Líderes NO las pueden tocar
- ✅ Versión congelada por ciclo evaluativo

---

### Nivel 2: PREGUNTAS ESPECÍFICAS POR TIPO

Banco adicional para cada tipo de trabajador.

#### Tipo: GERENTE

```
Preguntas específicas (4-6 preguntas):

1. Gestión del equipo
   "¿Gestiona eficientemente su equipo?"

2. Delegación
   "¿Delega tareas apropiadamente?"

3. Desarrollo de talento
   "¿Invierte en el desarrollo de su equipo?"

4. Comunicación estratégica
   "¿Comunica objetivos estratégicos claramente?"

5. Toma de decisiones
   "¿Toma decisiones rápidas y bien fundamentadas?"
```

#### Tipo: SENIOR

```
Preguntas específicas (4-6 preguntas):

1. Mentoría
   "¿Mentoriza efectivamente a otros?"

2. Autonomía técnica
   "¿Resuelve problemas complejos independientemente?"

3. Innovación
   "¿Propone mejoras y nuevas soluciones?"

4. Documentación
   "¿Documenta su trabajo apropiadamente?"

5. Code review quality
   "¿Sus revisiones de código agregan valor?"
```

#### Tipo: JUNIOR

```
Preguntas específicas (3-5 preguntas):

1. Curva de aprendizaje
   "¿Aprende rápidamente nuevas tecnologías?"

2. Implementación de feedback
   "¿Implementa feedback recibido?"

3. Atención al detalle
   "¿Presta atención a los detalles?"

4. Proactividad
   "¿Es proactivo en buscar ayuda cuando la necesita?"
```

#### Tipo: PASANTE

```
Preguntas específicas (2-4 preguntas):

1. Adaptación
   "¿Se adapta bien al ambiente corporativo?"

2. Responsabilidad
   "¿Cumple con sus responsabilidades?"

3. Actitud de aprendizaje
   "¿Muestra genuino interés en aprender?"
```

#### Tipo: "Otros" (Personalizado, ej: PRACTICANTE)

```
Hereda:
├─ Preguntas Base (6)
└─ Puede tener preguntas específicas custom (2-4)

Admin RRHH define:
"Practicante"
├─ Basado en: "Pasante" (hereda lógica similar)
└─ Preguntas adicionales:
   - "¿Maneja el software requerido?"
   - "¿Cumple horario establecido?"
```

---

## 🔀 LÓGICA DE HERENCIA

### Fórmula General

```
Preguntas en Evaluación = [Base] + [Específicas del Tipo]

Ejemplo para Gerente (evaluación real):
├─ Preguntas Base: 6
│  (Cumplimiento, Comunicación, Colaboración, Iniciativa, Calidad, Feedback)
└─ Preguntas Gerente: 5
   (Gestión equipo, Delegación, Desarrollo talento, Comunicación estratégica, Decisiones)

Total: 11 preguntas en el formulario
```

### Cuando el Colaborador es Tipo "Otros" Personalizado

**Ejemplo: "Freelance"**

```
Admin RRHH define:
- "Freelance" hereda de "Senior" (base intelectual)
- Preguntas Base: 6
- Preguntas Senior: 5 (contextualizadas para freelance)
- Preguntas Freelance custom: 2
  * "¿Respeta deadlines de proyecto?"
  * "¿Comunica progresos regularmente?"

Total: 13 preguntas en evaluación de Freelance
```

---

## 🔄 FLUJO DE CREACIÓN DE EVALUACIÓN

### Paso 1: Líder selecciona Colaborador

```
Líder → "Iniciar evaluación"
Busca/selecciona: "María"
```

### Paso 2: Sistema solicita Tipo de Trabajador

```
"¿Qué tipo es María?"
Dropdown:
├─ Gerente
├─ Senior
├─ Junior
├─ Pasante
├─ Practicante (custom "Otros")
└─ [Otros types creados por Admin]
```

### Paso 3: Sistema carga Preguntas Automáticamente

```
Selecciona: "Senior"

Sistema consulta Firestore:
1. GET /questions WHERE type = "ALL"
   → Carga 6 preguntas base

2. GET /questions WHERE type = "Senior"
   → Carga 5 preguntas específicas

3. Construye formulario en orden:
   ├─ Preguntas Base (1-6)
   ├─ Preguntas Senior (7-11)
   └─ Cada pregunta con:
      ├─ Escala 1-5 (slider)
      ├─ Opción "No aplica"
      └─ Campo justificación (opcional)
```

### Paso 4: Líder Completa y Envía

```
Líder califica cada pregunta 1-5
Estado cambia: pending_leader → pending_collaborator

Colaborador recibe notificación
Vuelve y completa con MISMAS preguntas
```

---

## 📊 CONFIGURACIÓN DEL BANCO DE PREGUNTAS

### Por Admin RRHH

**Acceso:** Configuración > Preguntas

**Operaciones:**

```
┌─ Preguntas Base
│  ├─ Ver todas
│  ├─ Editar contenido
│  ├─ Cambiar orden
│  └─ NO eliminar
│
└─ Preguntas por Tipo
   ├─ Selecciona tipo: [Dropdown]
   ├─ Ver preguntas actuales
   ├─ Crear nueva pregunta
   ├─ Editar pregunta
   ├─ Cambiar orden
   ├─ Archivar pregunta (soft delete)
   └─ NO eliminar definitivamente
```

**Cambios:**

- Efectivos para evaluaciones **futuras**
- NO afectan evaluaciones **completadas**
- Si tipo tiene 5 preguntas y Admin agrega 1:
  - Evaluaciones nuevas = 6 preguntas
  - Evaluaciones viejas = 5 preguntas (congeladas)

---

## 🚨 RESTRICCIONES CRÍTICAS

### Restricción 1: Un tipo NO puede eliminarse si tiene evaluaciones

```
Admin intenta eliminar "Senior"
Sistema verifica: ¿Existe evaluación con type="Senior"?

Si SÍ:
❌ "No puede eliminar. Evaluaciones activas: 3"

Si NO:
✅ "Seguro de eliminar 'Senior'?" [Confirmar]
```

### Restricción 2: Cambiar tipo de trabajador post-evaluación

```
Evaluación creada con María = Senior
¿Admin puede cambiar a Gerente después?

NO. El tipo está congelado en la evaluación.

Si quiere cambiar: Crear nueva evaluación.
```

### Restricción 3: Las preguntas base NO pueden eliminarse

```
Admin intenta eliminar "Cumplimiento de plazos"
❌ "Pregunta base. No se puede eliminar."
```

### Restricción 4: Cada evaluación tiene snapshot de preguntas

```
Evaluación de María (created: 20 May)
├─ workerType: "Senior" (congelado)
├─ questionsSnapshot: [
│  {id: q1, text: "Cumplimiento...", order: 1},
│  {id: q2, text: "Comunicación...", order: 2},
│  ...
│  ]
└─ Si Admin edita pregunta q1 → No afecta esta evaluación
```

---

## 📈 ESCALABILIDAD

### ¿Qué pasa si hay 50 tipos "Otros"?

```
Performance considerations:
- Dropdown en interfaz: OK (buscable)
- Queries Firestore: OK (indexed por tipo)
- Bulk operations: Admin UI optimizada
```

### ¿Qué pasa si hay 100 preguntas por tipo?

```
UX considerations:
- Límite recomendado: 15 preguntas/tipo máximo
- Si tiene más: Considerar sub-categorías
- Paginación en formulario de evaluación
```

---

## 🎓 EJEMPLOS DE EVALUACIÓN REAL

### Escenario 1: Evaluar Gerente

```
Tipo: Gerente
Preguntas totales: 11

Evaluación de Jefe de Proyecto:

[Base - 6 preguntas]
1. ¿Cumple plazos? → 5 ⭐⭐⭐⭐⭐
2. ¿Comunica efectivamente? → 4 ⭐⭐⭐⭐
3. ¿Colabora en equipo? → 4
4. ¿Toma iniciativa? → 5
5. ¿Calidad de trabajo? → 5
6. ¿Acepta feedback? → 4

[Específicas Gerente - 5 preguntas]
7. ¿Gestiona equipo? → 4
8. ¿Delega bien? → 3 (con justificación: "A veces mantiene tareas que podría delegar")
9. ¿Desarrolla talento? → 4
10. ¿Comunica estrategia? → 4
11. ¿Toma decisiones? → 5
```

### Escenario 2: Evaluar Junior

```
Tipo: Junior
Preguntas totales: 9

[Base - 6 preguntas]
1-6: Preguntas base...

[Específicas Junior - 3 preguntas]
7. ¿Curva de aprendizaje? → 5 (muy rápido aprendiendo React)
8. ¿Implementa feedback? → 4
9. ¿Atención al detalle? → 3 (no aplica - justifica: "Aún está en fase de aprendizaje")
```

---

**Estado:** 🔴 Esperando aprobación  
**Próximo:** Flujo de evaluación 180° (08-flujo-evaluacion.md)
