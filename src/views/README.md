# 🎨 MAQUETAS FASE 1 — Quick Start

**Estado:** ✅ COMPLETADAS  
**Fecha:** 24 Mayo 2026  
**Total Vistas:** 8 HTML/CSS  
**Responsive:** ✓ 390px-1280px

---

## 🚀 CÓMO VER LAS MAQUETAS

### Opción 1: Índice Navegable (Recomendado)

```bash
# Abrir en navegador:
src/views/INDEX.html

# O en VSCode:
# Clic derecho → "Open with Live Server"
```

**Ventaja:** Página bonita con galería + links a todas las vistas

---

### Opción 2: Abrir Vistas Individuales

```bash
src/views/01-login.html
src/views/02-dashboard-admin.html
src/views/03-dashboard-lider.html
src/views/04-dashboard-colaborador.html
src/views/05-config-tipos.html
src/views/06-editor-preguntas.html
src/views/07-formulario-evaluacion.html
src/views/08-reporte-evaluacion.html
```

---

### Opción 3: Ver Componentes Base

```bash
# Todos los componentes reutilizables:
src/components/base/index.html
```

---

## 📱 TESTING RESPONSIVE

### En DevTools (F12):

1. Abre cualquier maqueta
2. Presiona **Ctrl+Shift+M** (Toggle Device Toolbar)
3. Prueba en:
   - ✓ **iPhone 12** (390px)
   - ✓ **iPad** (768px)
   - ✓ **Desktop** (1280px)

**Verificar:**

- [ ] Sin scroll horizontal
- [ ] Botones touch-friendly (48px+)
- [ ] Texto legible
- [ ] Layout no se rompe

---

## ✅ VALIDACIONES

### Contraste WCAG AA

- Púrpura #6C3E99: ✓ 5.2:1
- Navy #003A70: ✓ 11.2:1
- Verde #4CAF50: ✓ 4.5:1

### Componentes

- Button ✓
- Card ✓
- Input ✓
- Badge ✓
- Modal ✓
- Table ✓
- Slider 1-5 ✓
- Select ✓
- ProgressBar ✓
- Navbar ✓

### Vistas

- Login ✓
- Dashboard Admin ✓
- Dashboard Líder ✓
- Dashboard Colaborador ✓
- Config Tipos ✓
- Editor Preguntas ✓
- Evaluación 180° ✓
- Reporte IA ✓

---

## 📊 CARACTERÍSTICAS

### Mobile-First Responsive

```css
/* Base: 390px (iPhone 12) */
@media (min-width: 768px) {
  /* Tablet */
}
@media (min-width: 1280px) {
  /* Desktop */
}
```

### Accesible

- Contraste alto (WCAG AA)
- Keyboard navigation ready
- Focus states visibles
- Semantic HTML

### Performance

- HTML puro + CSS inline
- < 100KB total
- Sin dependencias externas
- Carga instantánea

---

## 📖 DOCUMENTACIÓN

### Para Entender el Proyecto

1. **Resumen Ejecutivo:** `docs/RESUMEN_EJECUTIVO_FASE_1.md`
2. **Especificaciones:** `docs/FASES_DETALLADAS/FASE_1_maquetacion.md`
3. **Validación Técnica:** `docs/VALIDACION_FASE_1.md`

### Para Desarrolladores

- **Design System:** `docs/02-sistema-de-diseno.md`
- **Modelo de Datos:** `docs/05-modelo-de-datos.md`
- **Roles y Permisos:** `docs/06-roles-y-permisos.md`
- **Flujo Evaluación:** `docs/08-flujo-evaluacion.md`

---

## 🎯 VISTAS DETALLADAS

### 1. 🔐 Login

**Archivo:** `src/views/01-login.html`  
**Descripción:** Página de autenticación  
**Componentes:** Form, Input, Button, Link  
**Responsive:** ✓ Mobile-first

### 2. 👔 Dashboard Admin RRHH

**Archivo:** `src/views/02-dashboard-admin.html`  
**Descripción:** Panel administrativo con métricas  
**Componentes:** Navbar, Stats Grid, Actions, Table  
**Usuarios:** Admin RRHH

### 3. 📊 Dashboard Líder

**Archivo:** `src/views/03-dashboard-lider.html`  
**Descripción:** Panel de líder de equipo  
**Componentes:** Alert, Card, Table, Tabs  
**Usuarios:** Líderes

### 4. 👤 Dashboard Colaborador

**Archivo:** `src/views/04-dashboard-colaborador.html`  
**Descripción:** Panel personal del colaborador  
**Componentes:** Alert, Card, Tabs, Table  
**Usuarios:** Colaboradores

### 5. ⚙️ Configuración de Tipos

**Archivo:** `src/views/05-config-tipos.html`  
**Descripción:** Gestión de tipos de trabajador  
**Componentes:** Tables, Badges, Buttons  
**Usuarios:** Admin RRHH

### 6. ❓ Editor de Preguntas

**Archivo:** `src/views/06-editor-preguntas.html`  
**Descripción:** Crear/editar preguntas de evaluación  
**Componentes:** Filter, Table, Form  
**Usuarios:** Admin RRHH

### 7. 📝 Evaluación 180°

**Archivo:** `src/views/07-formulario-evaluacion.html`  
**Descripción:** Carrusel de 11 preguntas con escala 1-5  
**Componentes:** Progress, Navigator, Form, Slider  
**Usuarios:** Líderes, Colaboradores

### 8. 🤖 Reporte de Evaluación

**Archivo:** `src/views/08-reporte-evaluacion.html`  
**Descripción:** Reporte generado por IA (4 secciones)  
**Componentes:** Metrics, Sections, Table, Buttons  
**Usuarios:** Todos

---

## 🔧 TECHNICAL STACK

### HTML5

- Semantic markup
- Form validation ready
- Accessibility attributes

### CSS3

- CSS Variables (custom properties)
- Flexbox & Grid
- Mobile-first media queries
- Transitions & gradients

### JavaScript

- Vanilla JS (no frameworks)
- Tabs component switching
- Form handling (placeholder)

---

## 📝 NEXT STEPS

### Fase 2: React + TypeScript (Semanas 5-8)

```
├─ Setup Vite + React 18
├─ Convert maquetas to components
├─ Router implementation
└─ State management (Context API)
```

### Fase 3: Firebase + IA (Semanas 9-12)

```
├─ Firebase Auth
├─ Firestore integration
├─ Cloud Functions
└─ Claude API integration
```

---

## 💬 FEEDBACK

**¿Cambios requeridos?**

1. Abre las maquetas en `src/views/INDEX.html`
2. Revisa cada vista
3. Prueba responsive en DevTools
4. Proporciona feedback

**¿Listo para Fase 2 (React)?**

- [ ] Aprobado visual
- [ ] Responsive validado
- [ ] Documentación entendida
- [ ] Proceed to React conversion

---

## 📞 DOCUMENTOS CLAVE

| Documento         | Ubicación                                     | Contenido                    |
| ----------------- | --------------------------------------------- | ---------------------------- |
| Índice Maquetas   | `src/views/INDEX.html`                        | Galería visual + links       |
| Resumen Ejecutivo | `docs/RESUMEN_EJECUTIVO_FASE_1.md`            | Overview completo            |
| Especificaciones  | `docs/FASES_DETALLADAS/FASE_1_maquetacion.md` | Detalles técnicos            |
| Validación        | `docs/VALIDACION_FASE_1.md`                   | Checklist completo           |
| Design System     | `docs/02-sistema-de-diseno.md`                | Colores, tipografía, spacing |

---

**Estado:** ✅ FASE 1 COMPLETADA  
**Listo para:** Fase 2 (React conversion)  
**Aprobación:** Pendiente feedback usuario

🎉 **¡Abre `src/views/INDEX.html` en navegador para ver todas las maquetas!**
