# 📋 ALCANCE DEL PROYECTO — PerformAI

**Empresa:** Prevalentware (Desarrollo de software, Colombia)  
**Proyecto:** PerformAI  
**Versión:** 1.0 — Fase Inicial  
**Fecha:** 24 May 2026

---

## 🎯 PROPÓSITO

Plataforma web de **evaluación del desempeño 180° con IA generativa** que:

- ✅ Centraliza el proceso evaluativo de equipos
- ✅ Estandariza preguntas por tipo de trabajador
- ✅ Automatiza generación de reportes con Claude API
- ✅ Proporciona conversaciones 1:1 guiadas por IA

---

## 🔑 FEATURE PRINCIPAL: SEGMENTACIÓN DE PREGUNTAS

### El Concepto

Las preguntas de evaluación **NO son iguales para todos** los colaboradores.

El sistema segmenta preguntas según el **tipo de trabajador** del evaluado:

```
Tipos de Trabajador
├── Fijos (no editables):
│   ├── Gerente
│   ├── Senior
│   ├── Junior
│   └── Pasante
└── Personalizables ("Otros"):
    ├── Practicante (crear)
    ├── Freelance (crear)
    ├── Consultor (crear)
    └── Etc... (CRUD completo)
```

### Lógica de Preguntas

**Preguntas Base (aplican a TODOS):**

- Definidas por Admin RRHH
- Ejemplo: "Cumplimiento de plazos", "Comunicación efectiva"
- No pueden ser eliminadas por líderes

**Preguntas Específicas por Tipo:**

- Banco propio por tipo
- Gerente tiene: "Gestión del equipo", "Delegación"
- Junior tiene: "Curva de aprendizaje", "Implementación de feedback"

**Evaluación Real:**

```
Formulario = [Preguntas Base] + [Preguntas del Tipo específico]

Ejemplo para Gerente:
├── Base (6 preguntas)
└── Específicas Gerente (4 preguntas)
= Total: 10 preguntas
```

---

## 💼 FLUJO DE EVALUACIÓN 180°

### 7 Pasos

1. **Líder selecciona** colaborador + tipo de trabajador
2. **Sistema carga** preguntas (base + tipo específico)
3. **Líder evalúa** en escala 1-5 con justificaciones opcionales
4. **Colaborador notificado** — Completa su autoevaluación (mismas preguntas)
5. **Sistema consolida** ambas evaluaciones
6. **Claude API genera reporte** narrativo automático:
   - Fortalezas identificadas
   - Áreas de mejora
   - Recomendaciones concretas
   - Guía de conversación 1:1
7. **Líder + Colaborador** acceden al reporte

**Estados de una Evaluación:**

```
pending_leader → pending_collaborator → completed
```

---

## 👥 ROLES DE USUARIO (3 ROLES)

### Admin RRHH

**Permisos:**

- ✅ CRUD de tipos de trabajador (especialmente "Otros")
- ✅ Configurar banco de preguntas por tipo
- ✅ Definir preguntas base
- ✅ Dashboard ejecutivo (todos los equipos)
- ✅ Configurar ciclos evaluativos (mensual, trimestral, semestral)

**Restricciones:**

- ❌ No puede eliminar tipo si tiene evaluaciones activas
- ❌ No puede editar respuestas de evaluaciones completas

### Líder de Equipo

**Permisos:**

- ✅ Iniciar evaluación de sus colaboradores
- ✅ Completar su evaluación del colaborador
- ✅ Ver estado del equipo (pendiente/en proceso/completado)
- ✅ Acceder a reportes generados por IA
- ✅ Descargar guía de conversación 1:1

**Restricciones:**

- ❌ No puede editar tipos de trabajador
- ❌ No puede modificar banco de preguntas
- ❌ No puede ver reportes de otros equipos

### Colaborador

**Permisos:**

- ✅ Completar autoevaluación (cuando el líder la inicia)
- ✅ Ver su propio reporte final
- ✅ Ver historial de evaluaciones previas
- ✅ Descargar su reporte

**Restricciones:**

- ❌ No puede ver respuestas del líder hasta completar su autoevaluación
- ❌ No puede editar evaluaciones después de enviadas

---

## 📊 ESCALA DE EVALUACIÓN

Todas las preguntas usan escala **1-5 con etiquetas literales:**

```
1 = Nunca
2 = Casi nunca
3 = A veces
4 = Casi siempre
5 = Siempre

+ Opción "No aplica" (con justificación de texto libre)
```

---

## 🔐 RESTRICCIONES CRÍTICAS

### Técnicas

- [ ] ANTHROPIC_API_KEY SIEMPRE en `.env`, NUNCA hardcodeada
- [ ] Llamadas a Claude API SOLO desde Firebase Cloud Functions
- [ ] Validación en servidor (NO solo frontend)
- [ ] HTTPS obligatorio en producción

### Negocio

- [ ] Colaborador NO ve respuestas del líder antes de completar su autoevaluación
- [ ] Tipo de trabajador NO se puede eliminar si tiene evaluaciones asociadas
- [ ] Preguntas base NO se pueden eliminar por líderes
- [ ] Evaluaciones completadas NO se pueden editar

---

## 📅 CICLOS DE EVALUACIÓN

Admin RRHH configura ciclos recurrentes:

```
Ciclos disponibles:
├── Mensual
├── Trimestral
└── Semestral

Ejemplo:
"Evaluación Q1 2026": 01 Ene - 31 Mar
"Evaluación Q2 2026": 01 Abr - 30 Jun
```

---

## 🎨 ESTILO & UX

- **Corporativo:** Colores: Púrpura `#6C3E99`, Azul `#003A70`, Blanco
- **Mobile-first:** Responsive en tablet y móvil
- **Limpio:** Sin elementos innecesarios
- **Accesible:** WCAG AA mínimo

---

## ❌ FUERA DE ALCANCE (v1.0)

- ❌ Integración con sistemas RRHH externos (ADP, Workday)
- ❌ Reportes avanzados (exportar a Excel, BI)
- ❌ Calibración de equipos (sesiones grupales)
- ❌ Análisis de tendencias anuales (v2.0)
- ❌ Integración Slack/Teams (notificaciones)

---

## ✅ CRITERIOS DE ÉXITO

- ✅ Admin crea tipo "Otros" personalizado en < 2 min
- ✅ Líder inicia evaluación 180° en < 3 min
- ✅ Colaborador completa autoevaluación en < 10 min
- ✅ Reporte IA generado en < 5 segundos
- ✅ App responsive en móvil (iPhone 12)
- ✅ Seguridad: Pasa auditoría de Firebase Rules

---

**Estado:** 🔴 Esperando aprobación  
**Próximo:** Sistemas de diseño (02-sistema-de-diseno.md)
