# 🎨 FASE 1 DETALLADA — Maquetación HTML/CSS

**Versión:** 1.0  
**Fecha inicio:** 24 Mayo 2026  
**Duración:** 4 semanas  
**Entregable:** 8 vistas HTML + CSS puro, responsive mobile-first

---

## 📋 SUBFASES

### 1.1 Sistema de Diseño (Semana 1-2) — 🟡 ACTUAL

**Objetivo:** Validar colores, tipografía, espaciado. Crear componentes base reutilizables.

**Tareas:**

```
□ Validar contraste WCAG AA
  ├─ Púrpura #6C3E99 sobre blanco #FFFFFF
  ├─ Azul #003A70 sobre blanco #FFFFFF
  ├─ Verde #4CAF50 sobre blanco
  └─ Todas las combinaciones críticas

□ Definir tipografía
  ├─ Font: Inter (sans-serif)
  ├─ H1: 32px, bold, #003A70
  ├─ H2: 24px, bold, #003A70
  ├─ H3: 20px, semibold, #003A70
  ├─ Body: 16px, regular, #000000
  ├─ Small: 14px, regular, #9E9E9E
  └─ Micro: 12px, regular, #9E9E9E

□ Definir espaciado (grid 8px)
  ├─ xs: 4px
  ├─ sm: 8px
  ├─ md: 16px
  ├─ lg: 24px
  ├─ xl: 32px
  └─ 2xl: 48px

□ Crear componentes base en HTML/CSS
  ├─ Button (primario, secundario, success)
  ├─ Card
  ├─ Input (text, email, textarea)
  ├─ Badge
  ├─ Modal
  ├─ Table
  ├─ Slider (1-5)
  ├─ Select/Dropdown
  ├─ ProgressBar
  ├─ Alert
  └─ Navbar

□ Validar responsive
  ├─ iPhone 12 (390px)
  ├─ iPad (768px)
  ├─ Desktop (1280px)
  └─ Sin scroll horizontal

□ Documentar componentes
  └─ HTML snippets + CSS classes para cada componente
```

**Criterios de aceptación:**

- ✅ Todos los colores validan WCAG AA (ratio ≥ 4.5:1)
- ✅ Componentes base HTML sin JavaScript
- ✅ CSS puro (0 frameworks, salvo Tailwind si aplica)
- ✅ Responsive en 3 devices mínimo
- ✅ Performance: First Paint < 1s

**Deliverable:** `src/components/base/` con 10+ componentes HTML/CSS

---

### 1.2 Maquetación Login (Semana 1-2)

**Vistas:**

```
1. Login
   ├─ Logo Prevalentware
   ├─ Input email
   ├─ Input password
   ├─ Checkbox "Recuérdame"
   ├─ Button "Iniciar sesión"
   ├─ Link "¿Olvidó contraseña?"
   └─ Responsive mobile-first
```

**HTML estructura:**

```html
<div class="login-container">
  <div class="login-card">
    <img src="logo.svg" alt="PerformAI" class="logo" />

    <form class="login-form">
      <h1>Iniciar Sesión</h1>

      <input
        type="email"
        placeholder="correo@empresa.com"
        class="input input-lg"
      />

      <input type="password" placeholder="Contraseña" class="input input-lg" />

      <label class="checkbox"> <input type="checkbox" /> Recuérdame </label>

      <button class="button button-primary button-lg">Iniciar sesión</button>

      <a href="#" class="link">¿Olvidó su contraseña?</a>
    </form>
  </div>
</div>
```

**Validaciones:**

- [ ] Contraste email input
- [ ] Input width 100% móvil, máx 400px desktop
- [ ] Button 100% width móvil
- [ ] Logo visible > 150px

---

### 1.3 Maquetación Dashboards (Semana 2)

**Vistas (3 roles):**

```
2. Dashboard Admin RRHH
   ├─ Header (logo + user menu + logout)
   ├─ Stats (evaluaciones completadas, tipos, ciclos)
   ├─ Botones CTA (Configurar tipos, Editar preguntas, Ver ciclos)
   ├─ Tabla: Última actividad
   └─ Chart placeholder (para IA futura)

3. Dashboard Líder
   ├─ Header + sidebar
   ├─ Card "Evaluaciones pendientes"
   ├─ Tabla: Mi equipo + estado
   ├─ Botón "Iniciar evaluación"
   └─ Cards de rápido acceso (mis reportes)

4. Dashboard Colaborador
   ├─ Header
   ├─ Alert: "Tienes 1 evaluación pendiente"
   ├─ Card: "Autoevaluar por Juan (Líder)"
   ├─ Botón "Comenzar autoevaluación"
   ├─ Tab: "Mis reportes"
   └─ Tab: "Historial"
```

---

### 1.4 Maquetación Flujos Clave (Semana 2-3)

**Vistas (5):**

```
5. Configuración Tipos de Trabajador
   ├─ Tabla tipos fijos (read-only)
   ├─ Tabla tipos "Otros" (con CRUD)
   ├─ Modal crear tipo
   ├─ Modal editar tipo
   └─ Confirmación eliminar

6. Editor de Preguntas
   ├─ Select tipo de trabajador
   ├─ Tabla preguntas actuales (con orden)
   ├─ Formulario crear pregunta
   ├─ Botón editar / eliminar
   └─ Drag to reorder (sin JS, solo UI)

7. Formulario Evaluación 180°
   ├─ Carrusel preguntas (11 total)
   ├─ Pregunta actual (número/total)
   ├─ Enunciado
   ├─ Slider 1-5 (radio buttons)
   ├─ Checkbox "No aplica"
   ├─ Textarea justificación
   ├─ Botones anterior/siguiente/enviar
   ├─ Progress bar (27% completado)
   └─ Barra de navegación preguntas (1-11)

8. Autoevaluación del Colaborador
   ├─ Igual a formulario evaluación
   └─ Instrucción: "Evalúate honestamente"

9. Reporte Generado por IA
   ├─ Métricas (promedio líder, promedio María, coincidencia)
   ├─ Sección Fortalezas (párrafos + emoji/icono)
   ├─ Sección Áreas de Mejora
   ├─ Sección Recomendaciones
   ├─ Sección Guía 1:1
   ├─ Botón Descargar PDF
   └─ Botón Compartir
```

---

## 🎨 COMPONENTES HTML BASE

### Botón

```html
<!-- Primario -->
<button class="btn btn-primary">Guardar</button>

<!-- Secundario -->
<button class="btn btn-secondary">Cancelar</button>

<!-- Success -->
<button class="btn btn-success">Confirmar</button>

<!-- Estados -->
<button class="btn btn-primary" disabled>Deshabilitado</button>
<button class="btn btn-primary is-loading">Cargando...</button>
```

### Card

```html
<div class="card">
  <div class="card-header">
    <h3>Título Card</h3>
  </div>
  <div class="card-body">Contenido aquí</div>
  <div class="card-footer">
    <button class="btn">Acción</button>
  </div>
</div>
```

### Input

```html
<div class="form-group">
  <label for="email">Email</label>
  <input type="email" id="email" class="input" placeholder="tu@email.com" />
</div>

<div class="form-group">
  <label for="message">Mensaje</label>
  <textarea id="message" class="input input-textarea" rows="4"></textarea>
</div>
```

### Badge

```html
<span class="badge badge-purple">Muy Alto</span>
<span class="badge badge-green">Aprobado</span>
<span class="badge badge-gray">Pendiente</span>
```

### Slider (1-5)

```html
<div class="slider-container">
  <label>¿Cumples plazos?</label>
  <div class="slider">
    <input type="radio" name="score" value="1" /> 1
    <input type="radio" name="score" value="2" /> 2
    <input type="radio" name="score" value="3" /> 3
    <input type="radio" name="score" value="4" /> 4
    <input type="radio" name="score" value="5" /> 5
  </div>
  <div class="slider-labels">
    <span>Nunca</span>
    <span>Siempre</span>
  </div>
</div>
```

### Table

```html
<table class="table">
  <thead>
    <tr>
      <th>Colaborador</th>
      <th>Tipo</th>
      <th>Estado</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>María García</td>
      <td>Senior</td>
      <td><span class="badge badge-yellow">Pendiente</span></td>
      <td>
        <button class="btn btn-sm">Ver</button>
      </td>
    </tr>
  </tbody>
</table>
```

---

## 📊 CSS VARIABLES (Tailwind)

```css
/* Colors */
--performai-purple: #6c3e99;
--performai-navy: #003a70;
--performai-green: #4caf50;
--performai-gray-light: #f5f5f5;
--performai-gray-medium: #9e9e9e;

/* Typography */
--font-primary: "Inter", sans-serif;
--font-h1: 32px;
--font-h2: 24px;
--font-body: 16px;
--font-small: 14px;

/* Spacing */
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;

/* Radius */
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;

/* Shadows */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
```

---

## ✅ CHECKLIST FASE 1.1

**Validación de Colores:**

- [ ] Púrpura #6C3E99 contraste ≥ 4.5:1
- [ ] Azul #003A70 contraste ≥ 4.5:1
- [ ] Verde #4CAF50 contraste ≥ 4.5:1
- [ ] WCAG AA calculator valida todas

**Componentes HTML:**

- [ ] Button (3 variantes)
- [ ] Card (con header/body/footer)
- [ ] Input (text, email, textarea)
- [ ] Badge (4 colores)
- [ ] Modal (abrir/cerrar)
- [ ] Table (con headers)
- [ ] Slider 1-5 (radio buttons)
- [ ] Alert
- [ ] Navbar
- [ ] Footer

**Responsive:**

- [ ] 390px (iPhone 12): Sin scroll H, touch targets > 48px
- [ ] 768px (iPad): Layout 2-col donde aplique
- [ ] 1280px (Desktop): Layout full

**Performance:**

- [ ] First Paint < 1s
- [ ] No images > 100KB (sin optimizar)
- [ ] CSS < 50KB

---

**Estado:** 🟡 EN PROGRESO (Fase 1.1)  
**Próximo:** Validar colores WCAG AA + crear componentes base

---

## 📝 INSTRUCCIONES PARA CONTINUAR

1. **Valida colores:**
   - WebAIM Contrast Checker
   - Plug-in Chrome: "Accessibility Checker"

2. **Crea carpeta src/components/base:**
   - index.html (sandbox con todos los componentes)
   - styles.css (variables CSS)
   - button.css, card.css, input.css, etc.

3. **Testing responsive:**
   - DevTools: Device Emulation
   - Real devices si tienes

4. **Pushea a GitHub:**
   ```bash
   git add src/components/
   git commit -m "Fase 1.1: Componentes base HTML/CSS"
   git push origin main
   ```
