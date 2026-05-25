# 🎨 SISTEMA DE DISEÑO — PerformAI

**Versión:** 1.0  
**Fecha:** 24 May 2026  
**Basado en:** Imágenes de referencia del proyecto  
**Aplicable a:** Fase 1 (Maquetación HTML/CSS)

---

## 🎯 PRINCIPIOS DE DISEÑO

1. **Corporativo:** Profesional y confiable
2. **Mobile-first:** Diseño pensado para móvil primero
3. **Limpio:** Menos es más, blanco positivo
4. **Accesible:** Contraste WCAG AA mínimo
5. **Consistente:** Repetición de componentes

---

## 🌈 PALETA DE COLORES

### Colores Primarios

```css
--color-primary: #6c3e99; /* Púrpura — Botones, acentos */
--color-secondary: #003a70; /* Azul Marina — Headers, nav */
--color-white: #ffffff; /* Blanco — Fondos principales */
```

### Colores Secundarios

```css
--color-success: #4caf50; /* Verde — Estados positivos */
--color-gray-light: #f5f5f5; /* Gris claro — Fondos alternos */
--color-gray-medium: #9e9e9e; /* Gris medio — Textos secundarios */
--color-purple-light: #e8d5f2; /* Púrpura claro — Highlights suaves */
```

### Aplicación por Elemento

| Elemento                   | Color Primario | Color Secundario |
| -------------------------- | -------------- | ---------------- |
| Botón CTA (Call-to-Action) | `#6C3E99`      | —                |
| Header/Navbar              | `#003A70`      | —                |
| Sidebar                    | `#003A70`      | —                |
| Fondo principal            | `#FFFFFF`      | —                |
| Fondo alterno              | `#F5F5F5`      | —                |
| Texto primario             | `#000000`      | —                |
| Texto secundario           | `#9E9E9E`      | —                |

---

## 📏 TIPOGRAFÍA

### Familias Recomendadas

**Títulos & Headers:** `Inter` o `Segoe UI`  
**Cuerpo & Párrafos:** `Inter` o `Roboto`  
**Monoespaciado (si aplica):** `Monaco` o `Courier New`

### Escala de Tamaños

```css
--font-h1: 32px; /* Títulos principales */
--font-h2: 24px; /* Subtítulos */
--font-h3: 20px; /* Secciones */
--font-body: 16px; /* Texto normal */
--font-small: 14px; /* Labels, helpers */
--font-xs: 12px; /* Microtexto */
```

### Pesos

```css
--font-weight-light: 300;
--font-weight-regular: 400; /* Default */
--font-weight-medium: 500; /* Highlights */
--font-weight-bold: 700; /* Títulos, acciones */
```

---

## 📐 ESPACIADO (GRID 8px)

```css
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;
```

**Aplicación:**

- Padding botones: `8px 16px` (sm, md)
- Margin entre tarjetas: `16px` (md)
- Padding contenedor: `24px` o `32px` (lg, xl)

---

## 🔘 COMPONENTES BASE

### Botones

#### Primario (CTA)

```
Fondo: #6C3E99 (Púrpura)
Texto: Blanco
Padding: 12px 24px
Border-radius: 8px
Font-weight: bold
```

#### Secundario

```
Fondo: #F5F5F5 (Gris claro)
Texto: #003A70 (Azul)
Padding: 12px 24px
Border: 1px #003A70
Border-radius: 8px
```

#### Success

```
Fondo: #4CAF50 (Verde)
Texto: Blanco
```

### Tarjetas (Cards)

```
Fondo: Blanco
Border: 1px #F5F5F5 o sin borde
Border-radius: 12px
Padding: 24px
Box-shadow: 0 2px 8px rgba(0,0,0,0.1)
Transición hover: +4px shadow
```

### Badges & Pills

```
Alto: 24px
Padding: 4px 12px
Border-radius: 12px
Font-size: 12px
Font-weight: 500
```

**Variantes:**

- Púrpura: `#6C3E99`
- Verde: `#4CAF50`
- Gris: `#9E9E9E`

### Input Fields

```
Border: 1px #E0E0E0
Border-radius: 6px
Padding: 12px 16px
Font-size: 16px (móvil: 16px para evitar zoom)
Focus: Border #6C3E99, shadow suave
```

### Progress Bars

```
Alto: 8px
Background: #E0E0E0
Foreground: #6C3E99 → #4CAF50 (gradiente)
Border-radius: 4px
```

---

## 📱 RESPONSIVE BREAKPOINTS

```css
--breakpoint-xs: 320px; /* Móvil pequeño */
--breakpoint-sm: 640px; /* Móvil */
--breakpoint-md: 768px; /* Tablet */
--breakpoint-lg: 1024px; /* Desktop pequeño */
--breakpoint-xl: 1280px; /* Desktop grande */
```

**Mobile-first:** Estilos base para móvil, luego media queries para > 768px

---

## 🔲 ICONES

**Set recomendado:** Heroicons, Feather Icons o Font Awesome  
**Tamaños estándar:** 16px, 20px, 24px, 32px  
**Color:** Heredar del texto (adaptativo)

---

## 🎬 TRANSICIONES & ANIMACIONES

```css
--transition-fast: 150ms ease-in-out;
--transition-normal: 300ms ease-in-out;
--transition-slow: 500ms ease-in-out;
```

**Aplicaciones:**

- Hover botones: 150ms
- Toggle modales: 300ms
- Entrada de página: 500ms

---

## 🌓 MODO OSCURO (Futuro)

Si en v2.0 se necesita modo oscuro:

```css
/* Base */
--bg-primary-dark: #1a1a1a;
--bg-secondary-dark: #2d2d2d;
--text-dark: #e0e0e0;

/* Mantener colores primarios */
--color-primary-dark: #8b5bbf; /* Púrpura más claro */
--color-secondary-dark: #0052cc; /* Azul más claro */
```

---

## ✅ TAILWIND CSS CONFIG

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    colors: {
      // PerformAI
      "performai-purple": "#6C3E99",
      "performai-navy": "#003A70",
      "performai-green": "#4CAF50",
      "performai-gray-light": "#F5F5F5",
      "performai-gray-medium": "#9E9E9E",
      "performai-purple-light": "#E8D5F2",
      white: "#FFFFFF",
      black: "#000000",
      transparent: "transparent",
    },
    spacing: {
      xs: "4px",
      sm: "8px",
      md: "16px",
      lg: "24px",
      xl: "32px",
      "2xl": "48px",
    },
    fontSize: {
      xs: "12px",
      sm: "14px",
      base: "16px",
      lg: "20px",
      xl: "24px",
      "2xl": "32px",
    },
    borderRadius: {
      none: "0",
      sm: "4px",
      md: "8px",
      lg: "12px",
      xl: "16px",
      full: "9999px",
    },
  },
};
```

---

## 🖼️ COMPONENTES VISUALES A MAQUETAR

**Fase 1.2 requiere HTML/CSS puro para:**

1. **Login** — Entrada de email + password
2. **Dashboard por rol** — 3 versiones (Admin, Líder, Colaborador)
3. **Configuración de tipos** — CRUD "Otros" con tabla
4. **Editor de preguntas** — Formulario + lista
5. **Formulario evaluación 180°** — Preguntas + escala 1-5
6. **Vista autoevaluación** — Colaborador completa
7. **Reporte generado** — Narrativa + métricas
8. **Panel admin RRHH** — Dashboard ejecutivo

---

**Estado:** 🔴 Esperando aprobación  
**Dependencias:** ✅ Paleta colores extraída  
**Próximo:** Validar colores en cada componente
