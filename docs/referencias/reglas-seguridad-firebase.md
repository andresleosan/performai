# 🔐 Reglas de Seguridad Firebase — Guía Definitiva

**Referencia:** Extraída de `Guia-Firebase-security-rules-vibe-coding.md`  
**Fecha:** Abril 2026  
**Estado:** CRÍTICO — Debe aplicarse antes de cualquier integración con Firebase

---

## 📌 RESUMEN EJECUTIVO

**Causa raíz de 95% de hackeos en Firebase/Supabase:**  
Reglas de seguridad mal configuradas o ausentes.

**Regla de oro:**

```
Cada vez que veas "allow read, write: if true" → ES UN SECURITY BREACH
```

**El error más común de la IA:**

```javascript
// ❌ MORTAL — Abre TODO a internet
allow read, write: if true;

// ✅ CORRECTO — Solo usuarios autenticados
allow read, write: if request.auth != null;
```

---

## 🎯 NIVELES DE SEGURIDAD

### Nivel 1: Solo Usuarios Autenticados (MÍNIMO)

```
match /{document=**} {
  allow read, write: if request.auth != null;
}
```

⚠️ **Limitación:** Cualquier usuario autenticado accede a TODO.

### Nivel 2: Propiedad del Documento (RECOMENDADO)

```
match /users/{userId} {
  // Solo el dueño puede leer/escribir su documento
  allow read, update, delete:
    if request.auth != null
    && request.auth.uid == userId;

  // Al crear, el userId debe coincidir con el auth
  allow create:
    if request.auth != null
    && request.resource.data.userId == request.auth.uid;
}
```

### Nivel 3: Granular por Colección (PRODUCCIÓN)

```
// Perfiles: solo el dueño
match /users/{userId} {
  allow read, write: if request.auth != null
    && request.auth.uid == userId;
}

// Posts públicos: cualquiera lee, solo el autor escribe
match /posts/{postId} {
  allow read: if true;
  allow create: if request.auth != null
    && request.resource.data.authorId == request.auth.uid;
  allow update, delete: if request.auth != null
    && resource.data.authorId == request.auth.uid;
}

// Órdenes: dueño + admins
match /orders/{orderId} {
  allow read, update: if request.auth != null
    && (resource.data.userId == request.auth.uid
        || request.auth.token.admin == true);
  allow create: if request.auth != null
    && request.resource.data.userId == request.auth.uid;
  allow delete: if request.auth != null
    && request.auth.token.admin == true;
}

// Datos sensibles: NADIE desde el cliente
match /internal/{docId} {
  allow read, write: if false;
}
```

### Nivel 4: Validación de Datos (ROBUSTO)

```
match /posts/{postId} {
  allow create: if request.auth != null
    && request.resource.data.authorId == request.auth.uid
    // Validar que el título existe y es string
    && request.resource.data.title is string
    && request.resource.data.title.size() > 0
    && request.resource.data.title.size() <= 200
    // Validar contenido
    && request.resource.data.content is string
    && request.resource.data.content.size() <= 10000
    // Timestamp del servidor
    && request.resource.data.createdAt == request.time;
}
```

---

## 📦 FIREBASE STORAGE RULES

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Fotos de perfil: dueño sube, cualquiera ve
    match /users/{userId}/profile/{fileName} {
      allow read: if true;
      allow write: if request.auth != null
        && request.auth.uid == userId
        && request.resource.contentType.matches('image/.*')
        && request.resource.size < 5 * 1024 * 1024;  // 5MB max
    }

    // Docs privados: solo el dueño
    match /users/{userId}/documents/{fileName} {
      allow read, write: if request.auth != null
        && request.auth.uid == userId;
    }

    // Bloquear todo lo demás
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

---

## ✅ CHECKLIST PRE-LANZAMIENTO

- [ ] **Firestore:** Reglas configuradas por colección (NO `if true` global)
- [ ] **Supabase:** RLS habilitado en TODAS las tablas
- [ ] **Storage:** Valida autenticación, tipo de archivo y tamaño
- [ ] **API Keys:** Todas en `.env`, NUNCA en frontend
- [ ] **Supabase:** `service_role` key NUNCA en cliente
- [ ] **Gitleaks:** Corriste `gitleaks detect --source .`
- [ ] **Auth:** Contraseñas > 6 caracteres, anon deshabilitado
- [ ] **HTTPS:** App servida sobre HTTPS
- [ ] **Headers:** CSP, X-Frame-Options, Strict-Transport-Security
- [ ] **CORS:** Solo tus dominios (NO `*`)
- [ ] **Validación:** Inputs validados en servidor (NO solo frontend)
- [ ] **Errores:** NO exponen stack traces ni detalles DB

---

## 🛠️ HERRAMIENTAS

| Herramienta              | Propósito                     | Uso                          |
| ------------------------ | ----------------------------- | ---------------------------- |
| Firebase Rules Simulator | Simula requests contra reglas | Oficial, gratuito            |
| Firebase Emulator Suite  | Testing local completo        | `firebase emulators:start`   |
| Gitleaks                 | Detecta secrets en Git        | `gitleaks detect --source .` |

---

## 🚨 CASOS REALES DE HACKEOS (2025-2026)

### Tea App — 72,000 imágenes filtradas

- **Causa:** Firebase Storage sin autenticación
- **Resultado:** 13,000 fotos de IDs gubernamentales públicas

### Lovable CVE-2025-48757 — 170+ apps comprometidas

- **Causa:** RLS de Supabase deshabilitado
- **Resultado:** Nombres, emails, registros financieros, API keys

### Moltbook — 1.5M tokens API filtrados

- **Causa:** Clave anon sin RLS habilitado = backdoor admin
- **Resultado:** 35,000 emails, mensajes privados

---

## 🎓 LA LECCIÓN FINAL

> **"Nadie los hackeó. Simplemente no configuraron la seguridad."**

Diferencia entre app funcional y app segura en producción: **30 minutos**.  
Costo promedio de un data breach: **$4.88 millones** (IBM 2024).

---

**Estado:** ✅ APROBADO PARA PERFORMAI  
**Aplicación:** OBLIGATORIA antes de Fase 3 (Firebase + Claude API)
