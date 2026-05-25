# 🔐 Guía: Desplegar Firebase Security Rules

## Requisitos Previos

1. **Firebase CLI instalado:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Autenticarse en Firebase:**
   ```bash
   firebase login
   ```

3. **Inicializar Firebase en el proyecto (primera vez):**
   ```bash
   firebase init
   ```
   Seleccionar: Firestore, Storage (si aplica), y confirmAr que el projectId es `performai-bb68f`

## Estructura de Archivos

```
performai/
├── firestore.rules          # Reglas de Firestore (este archivo)
├── storage.rules            # Reglas de Storage (crear si se usa)
├── firebase.json            # Configuración de Firebase (auto-generado)
└── app/
    └── .env.local           # Credenciales (NO versionar)
```

## Desplegar Reglas

### Opción 1: Desde CLI (Recomendado)

```bash
# Desde la raíz del proyecto
firebase deploy --only firestore:rules
```

### Opción 2: Desde Firebase Console

1. Ir a: https://console.firebase.google.com/u/0/project/performai-bb68f/firestore/rules
2. Copiar el contenido de `firestore.rules`
3. Pegar en el editor de la consola
4. Hacer clic en "Publicar"

## Validar Reglas

### Testing Local

```bash
firebase emulators:start
```

Esto inicia emuladores locales para probar reglas antes de desplegar.

### Testing en Consola

1. Firebase Console → Firestore → Pestaña "Rules"
2. Hacer clic en "Simular"
3. Simular reads/writes con diferentes usuarios/datos

## Security Rules Explicadas

### 📖 Colecciones Protegidas

| Colección | Lectura | Escritura | Notas |
|-----------|---------|-----------|-------|
| **users** | Solo el dueño | Solo el dueño | Perfil del usuario |
| **evaluations** | Dueño + admin | Dueño + admin | Evaluaciones 360 |
| **questions** | Todos autenticados | Solo admin | Preguntas de evaluación |
| **evaluationTypes** | Todos autenticados | Solo admin | Tipos de evaluación |
| **reports** | Dueño + admin | Solo admin | Reportes finales |
| **audit_logs** | Solo admin | Todos autenticados | Registro de auditoría |

### 🔑 Conceptos Clave

- **request.auth.uid**: ID del usuario autenticado
- **request.auth.token.admin**: Flag personalizado de admin (se asigna en backend)
- **resource.data**: Datos existentes en el documento
- **request.resource.data**: Datos entrantes a crear/actualizar

### ⚠️ Notas de Seguridad

1. ✅ **Autenticación requerida** para todo acceso
2. ✅ **Validación de propietario** en datos sensibles
3. ✅ **Admin bypass** controlado solo para operaciones administrativas
4. ✅ **Acceso denegado por defecto** para colecciones no especificadas
5. ✅ **Datos del servidor** (audit_logs, reports) protegidos

## Crear Nuevas Colecciones

Cuando agregues nuevas colecciones:

```
match /nueva_coleccion/{docId} {
  allow read:
    if request.auth != null
    && (resource.data.userId == request.auth.uid
        || request.auth.token.admin == true);
  
  allow write:
    if request.auth != null
    && request.auth.token.admin == true;
}
```

Luego desplegar:
```bash
firebase deploy --only firestore:rules
```

## Troubleshooting

### ❌ Error: "Permission Denied"

**Causa típica:** Las reglas están muy restrictivas
- Verificar que `request.auth != null` (usuario autenticado)
- Verificar que el `userId` en el documento coincide con `request.auth.uid`

### ❌ Error: "No se puede desplegar"

```bash
# Verificar credenciales
firebase auth:export creds.json

# Usar proyecto específico
firebase deploy --project performai-bb68f --only firestore:rules
```

### ❌ La app no puede leer datos

1. Verificar que el usuario está autenticado (no anónimo)
2. Verificar que los datos tienen el `userId` correcto
3. Revisar los logs de Firebase: Console → Firestore → Reglas → Pestaña "Prueba"

## Links Útiles

- 📚 [Firebase Security Rules Docs](https://firebase.google.com/docs/firestore/security/start)
- 🧪 [Firebase Emulator Suite](https://firebase.google.com/docs/emulator-suite)
- 🔒 [Security Rules Playground](https://firebase.google.com/docs/firestore/security/rules-query)
- 📖 [Guía Original - Vibe Coding Security](./Guia-Firebase-security-rules-vibe-coding.md)

## Checklist de Seguridad Pre-Lanzamiento

Antes de hacer deploy a producción:

- [ ] Todas las colecciones tienen `allow read, write: if false` como fallback
- [ ] Usuarios no autenticados no tienen acceso a datos sensibles
- [ ] Validación de propietario en documentos personales
- [ ] Datos del servidor (audit_logs) bloqueados del cliente
- [ ] Admin flag solo asignado a usuarios administrativos
- [ ] Reglas testeadas en emulador local
- [ ] No hay `allow read, write: if true` global
- [ ] .env.local NO está versionado en Git

---

**Próximo paso:** Después de desplegar reglas, crear Cloud Functions para lógica del servidor que no puede exponerse al cliente.
