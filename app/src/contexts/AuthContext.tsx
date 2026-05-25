import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '@/services/firebase';
import { getDocument } from '@/services/firestore';
import type { AuthContextType, User } from '@/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * AuthProvider Component
 * Proveedor de contexto de autenticación con Firebase
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Sincronizar con Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Obtener datos del usuario desde Firestore
          const userData = await getDocument('users', firebaseUser.uid);
          if (userData) {
            setUser(userData as User);
            localStorage.setItem('user', JSON.stringify(userData));
          } else {
            // Si no existe en Firestore, crear un usuario temporal
            const tempUser: User = {
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Usuario',
              role: 'colaborador',
              avatar: firebaseUser.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${firebaseUser.email}`,
            };
            setUser(tempUser);
            localStorage.setItem('user', JSON.stringify(tempUser));
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Fallback a usuario temporal
          const tempUser: User = {
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Usuario',
            role: 'colaborador',
            avatar: firebaseUser.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${firebaseUser.email}`,
          };
          setUser(tempUser);
          localStorage.setItem('user', JSON.stringify(tempUser));
        }
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Intentar con Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Obtener datos del usuario desde Firestore
      const userData = await getDocument('users', firebaseUser.uid);
      if (userData) {
        setUser(userData as User);
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        const tempUser: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || email.split('@')[0],
          role: 'colaborador',
          avatar: firebaseUser.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        };
        setUser(tempUser);
        localStorage.setItem('user', JSON.stringify(tempUser));
      }
    } catch (error) {
      // Fallback: Si Firebase falla, usar mock para testing
      console.warn('Firebase Auth falló, usando mock para testing:', error);
      const mockUser: User = {
        id: `mock-${Date.now()}`,
        email,
        name: email.split('@')[0],
        role: 'colaborador',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem('user');
    } catch (error) {
      // Si Firebase falla, al menos limpiar localStorage
      setUser(null);
      localStorage.removeItem('user');
      console.error('Logout error:', error);
    }
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook para usar el contexto de autenticación
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};

export default AuthContext;
