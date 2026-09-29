'use client';

import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { firebaseConfig } from '@/firebase/config';

export type FirebaseClient = {
  firebaseApp: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
};

export function initializeFirebase(): FirebaseClient {
  const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp),
  };
}
