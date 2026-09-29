'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Auth, User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import { initializeFirebase, type FirebaseClient } from '@/firebase/client';

type FirebaseContextState = {
  auth: Auth | null;
  firestore: Firestore | null;
  user: User | null;
  isUserLoading: boolean;
};

const FirebaseContext = createContext<FirebaseContextState | undefined>(undefined);

export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<FirebaseClient | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    let unsub: (() => void) | undefined;
    try {
      const next = initializeFirebase();
      setServices(next);
      unsub = onAuthStateChanged(
        next.auth,
        (firebaseUser) => {
          setUser(firebaseUser);
          setIsUserLoading(false);
        },
        (error) => {
          console.error('Firebase Auth:', error);
          setIsUserLoading(false);
        },
      );
    } catch (error) {
      console.error('Firebase init:', error);
      setIsUserLoading(false);
    }

    const timeout = window.setTimeout(() => setIsUserLoading(false), 8000);
    return () => {
      unsub?.();
      window.clearTimeout(timeout);
    };
  }, []);

  const value = useMemo(
    (): FirebaseContextState => ({
      auth: services?.auth ?? null,
      firestore: services?.firestore ?? null,
      user,
      isUserLoading,
    }),
    [services, user, isUserLoading],
  );

  return <FirebaseContext.Provider value={value}>{children}</FirebaseContext.Provider>;
}

function useFirebase(): FirebaseContextState {
  const ctx = useContext(FirebaseContext);
  if (!ctx) throw new Error('useFirebase debe usarse dentro de FirebaseClientProvider.');
  return ctx;
}

export function useAuth(): Auth | null {
  return useFirebase().auth;
}

export function useFirestore(): Firestore | null {
  return useFirebase().firestore;
}

export function useUser(): { user: User | null; isUserLoading: boolean } {
  const { user, isUserLoading } = useFirebase();
  return { user, isUserLoading };
}
