import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '@/services/firebase';
import { getDocument } from '@/services/firestore';
import type { AuthContextType, User } from '@/types';

import { AuthContext } from './auth-context';

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
  const sessionRevision = useRef(0);

  // Sincronizar con Firebase Auth + localStorage
  useEffect(() => {
    // Firebase es la autoridad de sesion; localStorage no autentica usuarios.
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      const revision = ++sessionRevision.current;
      const isCurrentSession = () => sessionRevision.current === revision &&
        auth.currentUser?.uid === firebaseUser?.uid;
      if (firebaseUser) {
        setUser(null);
        localStorage.removeItem('user');
        setIsLoading(true);
        try {
          // Obtener datos del usuario desde Firestore
          const userData = await getDocument('users', firebaseUser.uid);
          if (!isCurrentSession()) return;
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
          if (!isCurrentSession()) return;
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
      if (isCurrentSession()) setIsLoading(false);
    });

    return () => {
      sessionRevision.current++;
      unsubscribe();
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    let revision = sessionRevision.current;
    try {
      // Intentar con Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      revision = sessionRevision.current;

      // Obtener datos del usuario desde Firestore
      const userData = await getDocument('users', firebaseUser.uid);
      if (sessionRevision.current !== revision || auth.currentUser?.uid !== firebaseUser.uid) return;
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
      if (sessionRevision.current === revision) {
        setUser(null);
        localStorage.removeItem('user');
      }
      throw error;
    } finally {
      if (sessionRevision.current === revision) setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    sessionRevision.current++;
    setUser(null);
    localStorage.removeItem('user');
    setIsLoading(false);
    try {
      await signOut(auth);
    } catch (error) {
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
