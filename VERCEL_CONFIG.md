# 🚀 Configurar Variables de Entorno en Vercel

## Error Inicial
```
Tras finalizar la compilación, no se encontró ningún directorio de salida llamado "dist"
```

**Causa:** Las variables de entorno de Firebase no se pasaron al build de Vite.

---

## Solución: Configurar Variables en Dashboard de Vercel

### 1️⃣ Ir al Dashboard de Vercel

```
https://vercel.com/dashboard
```

### 2️⃣ Seleccionar Proyecto: `performai`

### 3️⃣ Ir a Settings → Environment Variables

### 4️⃣ Agregar 6 Variables (copiar exactamente):

| Variable | Valor | Descripción |
|----------|-------|-----------|
| `VITE_FIREBASE_API_KEY` | `AIzaSyDOobkXd8ZSxny3DhdFlltuqbR8ebYfsK0` | API Key |
| `VITE_FIREBASE_AUTH_DOMAIN` | `performai-bb68f.firebaseapp.com` | Auth Domain |
| `VITE_FIREBASE_PROJECT_ID` | `performai-bb68f` | Project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | `performai-bb68f.firebasestorage.app` | Storage Bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `942106675923` | Messaging Sender ID |
| `VITE_FIREBASE_APP_ID` | `1:942106675923:web:5336f627de70294f3d2226` | App ID |

### 5️⃣ Para cada variable:
- Pegar el valor
- Seleccionar scopes: ✅ Production ✅ Preview ✅ Development
- Hacer clic en "Save"

### 6️⃣ Redeploy

Una vez configuradas todas las variables:
1. Ir a "Deployments"
2. Hacer clic en los "..." del último deployment
3. Seleccionar "Redeploy"

---

## Alternativa: Configurar via Vercel CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Loguear en Vercel
vercel login

# Cd al proyecto
cd /path/to/performai

# Crear archivo .env local
echo "VITE_FIREBASE_API_KEY=AIzaSyDOobkXd8ZSxny3DhdFlltuqbR8ebYfsK0" > .env.local
echo "VITE_FIREBASE_AUTH_DOMAIN=performai-bb68f.firebaseapp.com" >> .env.local
echo "VITE_FIREBASE_PROJECT_ID=performai-bb68f" >> .env.local
echo "VITE_FIREBASE_STORAGE_BUCKET=performai-bb68f.firebasestorage.app" >> .env.local
echo "VITE_FIREBASE_MESSAGING_SENDER_ID=942106675923" >> .env.local
echo "VITE_FIREBASE_APP_ID=1:942106675923:web:5336f627de70294f3d2226" >> .env.local

# Pullear variables a Vercel
vercel env pull

# Redeploy
vercel --prod
```

---

## ✅ Verificar que Funciona

Después de redeploy:

1. **Ir a la URL del sitio:** https://performai-[...].vercel.app/
2. **Abrir DevTools** (F12)
3. **Verificar console:**
   - NO debe haber errores de `undefined` en Firebase config
   - Debe cargar la página de login correctamente
4. **Ir a Networks tab:**
   - Debe haber un archivo `index-[hash].js` (bundle de Vite)
   - El archivo debe estar en la carpeta `_next` o `app`

---

## 🔍 Troubleshooting

### Error: "VITE_FIREBASE_API_KEY is undefined"

✅ **Solución:** Verificar que las variables están en el scope correcto (Production debe estar checked)

### Error: "dist not found"

✅ **Solución:** Vercel no ejecutó el build. Revisar logs detallados en Deployments → logs

### Error: "Cannot find module 'firebase'"

✅ **Solución:** Las dependencias no se instalaron. Ejecutar:
```bash
cd app && npm install
```

---

## 📝 Notas

- Las variables `VITE_` son públicas en el navegador (por diseño de Vite)
- Firebase API keys NO son secretos (están diseñadas para ser públicas)
- La seguridad depende de las Security Rules de Firestore
- Para secretos reales, usar Cloud Functions con environment variables privadas

---

**Una vez configurado, Vercel debería construir y desplegar correctamente.** ✅
