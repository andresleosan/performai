# Regresiones de autenticación

Ejecutar desde `app/` después de `npm ci`:

```sh
npx playwright install chromium
npm run test:security
```

El runner inicia y cierra Vite en un puerto local disponible. Bloquea todas las solicitudes externas y usa perfiles simulados para probar caché adulterada, login rechazado y perfiles que llegan después del cierre o cambio de sesión. No requiere credenciales ni modifica Firebase.
