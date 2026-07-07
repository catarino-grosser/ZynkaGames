import { FIREBASE_ENABLED, firebaseConfig } from './firebase-config.js';

export async function loadFirebaseAdventures() {
  if (!FIREBASE_ENABLED) return { enabled: false, adventures: [] };

  try {
    const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js');
    const { getFirestore, collection, getDocs, query, where, orderBy } = await import('https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js');

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const q = query(collection(db, 'aventuras'), where('published', '==', true), orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    const adventures = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { enabled: true, adventures };
  } catch (error) {
    console.error('Erro ao carregar aventuras do Firebase:', error);
    return { enabled: true, adventures: [], error: error.message };
  }
}
