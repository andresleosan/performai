import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { createServer } from 'vite';

const server = await createServer({
  root: fileURLToPath(new URL('..', import.meta.url)),
  server: { host: '127.0.0.1', port: 0 },
});
await server.listen();
const origin = server.resolvedUrls.local[0].replace(/\/$/, '');
let browser;

async function localContext() {
  const context = await browser.newContext();
  // Every request remains local; the regression never authenticates real users.
  await context.route('**/*', route => new URL(route.request().url()).origin === origin
    ? route.continue() : route.abort());
  return context;
}

async function authProbe() {
  const context = await localContext();
  await context.addInitScript(() => {
    window.authFixture = {
      auth: { currentUser: null }, listeners: new Set(), profiles: {},
      emit(user) {
        this.auth.currentUser = user;
        this.pending = Promise.all([...this.listeners].map(listener => listener(user)));
      },
    };
  });
  await context.route('**/src/services/firebase.ts', route => route.fulfill({
    contentType: 'text/javascript', body: 'export const auth=window.authFixture.auth; export const db={};',
  }));
  await context.route('**/node_modules/.vite/deps/firebase_auth.js*', route => route.fulfill({
    contentType: 'text/javascript', body: `
      export function onAuthStateChanged(auth, callback) {
        window.authFixture.listeners.add(callback);
        queueMicrotask(() => callback(auth.currentUser));
        return () => window.authFixture.listeners.delete(callback);
      }
      export async function signOut() { window.authFixture.emit(null); }
      export async function signInWithEmailAndPassword() { throw new Error('Fixture login rejected'); }
    `,
  }));
  await context.route('**/src/services/firestore.ts', route => route.fulfill({
    contentType: 'text/javascript', body: `
      export function getDocument(collection, id) {
        return new Promise(resolve => { window.authFixture.profiles[id] = resolve; });
      }
    `,
  }));
  await context.route(origin + '/', route => route.fulfill({
    contentType: 'text/html', body: `<div id="probe"></div><script type="module">
      import RefreshRuntime from '/@react-refresh';
      RefreshRuntime.injectIntoGlobalHook(window);
      window.$RefreshReg$ = () => {};
      window.$RefreshSig$ = () => type => type;
      window.__vite_plugin_react_preamble_installed__ = true;
    </script>`,
  }));
  const page = await context.newPage();
  await page.goto(origin + '/');
  await page.waitForFunction(() => window.__vite_plugin_react_preamble_installed__);
  await page.evaluate(async () => {
    const { default: React } = await import('/node_modules/.vite/deps/react.js');
    const { default: { createRoot } } = await import('/node_modules/.vite/deps/react-dom_client.js');
    const { AuthProvider } = await import('/src/contexts/AuthContext.tsx');
    const { useAuth } = await import('/src/contexts/auth-context.ts');
    function Probe() {
      const state = useAuth();
      window.authState = state;
      return React.createElement('output', { id: 'session-state' }, state.isLoading ? 'loading' : state.user?.id ?? 'signed-out');
    }
    createRoot(document.getElementById('probe')).render(React.createElement(AuthProvider, null, React.createElement(Probe)));
  });
  await page.locator('#session-state').filter({ hasText: 'signed-out' }).waitFor();
  return { context, page };
}

try {
  browser = await chromium.launch({ headless: true });
  const forged = await localContext();
  await forged.addInitScript(() => localStorage.setItem('user', JSON.stringify({ id: 'forged', role: 'admin', name: 'Forged' })));
  const protectedPage = await forged.newPage();
  await protectedPage.goto(origin + '/dashboard/admin');
  await protectedPage.waitForURL('**/login');
  assert.equal(await protectedPage.evaluate(() => localStorage.getItem('user')), null);
  await forged.close();
  console.log('PASS: localStorage cannot authorize a protected route');

  const login = await localContext();
  const loginPage = await login.newPage();
  await loginPage.goto(origin + '/login');
  await loginPage.locator('input[type=checkbox]').check();
  await loginPage.getByRole('button').click();
  await loginPage.locator('input[type=email]').fill('invalid@example.invalid');
  await loginPage.locator('input[type=password]').fill('invalid-password');
  await loginPage.locator('button[type=submit]').click();
  await loginPage.getByText('Error al iniciar sesión. Verifica tus credenciales.').waitFor();
  assert.match(loginPage.url(), /\/login$/);
  assert.equal(await loginPage.evaluate(() => localStorage.getItem('user')), null);
  await login.close();
  console.log('PASS: failed Firebase login never creates a mock session');

  const logout = await authProbe();
  await logout.page.evaluate(() => window.authFixture.emit({ uid: 'old-user', email: 'old@example.invalid' }));
  await logout.page.waitForFunction(() => !!window.authFixture.profiles['old-user']);
  await logout.page.evaluate(async () => {
    const oldCallback = window.authFixture.pending;
    await window.authState.logout();
    window.authFixture.profiles['old-user']({ id: 'old-user', role: 'admin' });
    await oldCallback;
  });
  await logout.page.waitForTimeout(50);
  assert.equal(await logout.page.locator('#session-state').textContent(), 'signed-out', 'A delayed profile must not restore a logged-out session');
  assert.equal(await logout.page.evaluate(() => localStorage.getItem('user')), null);
  await logout.context.close();
  console.log('PASS: delayed profile completion cannot undo logout');

  const switchUser = await authProbe();
  await switchUser.page.evaluate(() => {
    window.authFixture.emit({ uid: 'old-user', email: 'old@example.invalid' });
    window.authFixture.oldCallback = window.authFixture.pending;
    window.authFixture.emit({ uid: 'new-user', email: 'new@example.invalid' });
  });
  await switchUser.page.waitForFunction(() => !!window.authFixture.profiles['new-user']);
  await switchUser.page.evaluate(async () => {
    window.authFixture.profiles['new-user']({ id: 'new-user', role: 'colaborador' });
    await window.authFixture.pending;
    window.authFixture.profiles['old-user']({ id: 'old-user', role: 'admin' });
    await window.authFixture.oldCallback;
  });
  await switchUser.page.waitForTimeout(50);
  assert.equal(await switchUser.page.locator('#session-state').textContent(), 'new-user', 'A delayed profile must not replace a newer Firebase session');
  assert.equal(await switchUser.page.evaluate(() => JSON.parse(localStorage.getItem('user')).id), 'new-user');
  await switchUser.page.evaluate(() => window.authFixture.emit({ uid: 'next-user', email: 'next@example.invalid' }));
  await switchUser.page.locator('#session-state').filter({ hasText: 'loading' }).waitFor();
  assert.equal(await switchUser.page.evaluate(() => window.authState.isAuthenticated), false, 'A new Firebase session cannot inherit the previous profile while loading');
  assert.equal(await switchUser.page.evaluate(() => localStorage.getItem('user')), null);
  await switchUser.context.close();
  console.log('PASS: delayed profile completion cannot replace a newer session');
} finally {
  await browser?.close();
  await server.close();
}
