# 🎨 Paleta de Colores — Sistema de Diseño PerformAI

**Fuente:** Imágenes del proyecto  
**Extraído:** 24 May 2026  
**Aplicable:** Frontend React + Tailwind CSS

---

## 📋 COLORES PRIMARIOS

| Nombre                | Hex       | RGB             | Uso                                                |
| --------------------- | --------- | --------------- | -------------------------------------------------- |
| **Púrpura Principal** | `#6C3E99` | `108, 62, 153`  | Botones primarios, líneas, gráficos, badges "Alto" |
| **Azul Marina**       | `#003A70` | `0, 58, 112`    | Header, sidebars, navegación, fondos principales   |
| **Blanco**            | `#FFFFFF` | `255, 255, 255` | Fondos tarjetas, textos claros                     |

---

## 🎯 COLORES SECUNDARIOS & ACENTOS

| Nombre           | Hex       | Uso                                           |
| ---------------- | --------- | --------------------------------------------- |
| **Verde Alta**   | `#4CAF50` | Indicadores positivos, "Muy alto", checkmarks |
| **Verde Medio**  | `#8BC34A` | Estados "Alto" alternativos                   |
| **Gris Claro**   | `#F5F5F5` | Fondos suaves, dividers                       |
| **Gris Medio**   | `#9E9E9E` | Textos secundarios, iconos deshabilitados     |
| **Morado Claro** | `#E8D5F2` | Fondos de secciones, highlights suaves        |

---

## 🏷️ APLICACIÓN EN COMPONENTES

### Botones

- **Primario (CTA):** Púrpura `#6C3E99`
- **Secundario:** Azul Marina `#003A70`
- **Success:** Verde `#4CAF50`

### Badges & Indicadores

- **"Muy alto" / 4.5-5.0:** Púrpura + Verde
- **"Alto" / 4.0-4.4:** Púrpura puro
- **"Medio" / 3.0-3.9:** Gris o naranja suave
- **"Bajo" / 1.0-2.9:** Rojo suave

### Gráficos & Charts

- **Líneas principales:** Púrpura `#6C3E99`
- **Barras de progreso:** Púrpura a Verde degradado
- **Fill areas:** Púrpura claro con opacidad

### Fondos

- **Header/Nav:** Azul Marina `#003A70`
- **Sidebar:** Azul Marina `#003A70`
- **Contenido:** Blanco `#FFFFFF`
- **Secciones alternas:** Gris Claro `#F5F5F5`

---

## 📱 ESCALA DE EVALUACIÓN — COLORES

Según las imágenes (escala 1-5):

| Score   | Etiqueta | Color                          |
| ------- | -------- | ------------------------------ |
| 4.5+    | Muy alto | Púrpura + Verde                |
| 4.0-4.4 | Alto     | Verde `#4CAF50`                |
| 3.0-3.9 | Medio    | Gris `#9E9E9E` o Naranja suave |
| 2.0-2.9 | Bajo     | Rojo suave                     |
| 1.0-1.9 | Muy bajo | Rojo fuerte                    |

---

## 🎨 VARIABLES TAILWIND CSS

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    colors: {
      // Colores PerformAI
      "performai-purple": "#6C3E99",
      "performai-navy": "#003A70",
      "performai-green": "#4CAF50",
      "performai-gray-light": "#F5F5F5",
      "performai-gray-medium": "#9E9E9E",
      "performai-purple-light": "#E8D5F2",

      // Aliases estándar
      white: "#FFFFFF",
      black: "#000000",
    },
  },
};
```

---

## ✅ VERIFICACIÓN VISUAL

Todos los colores deben:

- ✅ Pasar test de contraste WCAG AA (ratio 4.5:1 mínimo)
- ✅ Verse similares en desktop, tablet, móvil
- ✅ Funcionar bien en modo claro y oscuro (si aplica)

---

**Estado:** ✅ APLICABLE  
**Próximo paso:** Definir tipografía y espaciado (Fase 1.1)
