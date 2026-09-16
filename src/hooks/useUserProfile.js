import { useEffect, useState, useCallback } from 'react';
import { doc, onSnapshot, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { database } from '../config/firebase';

export function useUserProfile(uid) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) {
      setProfile(null);
      setLoading(false);
      return;
    }
    const ref = doc(database, 'usuarios', uid);
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      setProfile(snapshot.exists() ? snapshot.data() : null);
      setLoading(false);
    });
    return unsubscribe;
  }, [uid]);

  const crearPerfil = useCallback(async (uidDestino, datos) => {
    const ref = doc(database, 'usuarios', uidDestino);
    await setDoc(ref, {
      ...datos,
      creadoEn: serverTimestamp(),
    });
  }, []);

  const actualizarPerfil = useCallback(async (uidDestino, datos) => {
    const ref = doc(database, 'usuarios', uidDestino);
    await updateDoc(ref, datos);
  }, []);

  return { profile, loading, crearPerfil, actualizarPerfil };
}
