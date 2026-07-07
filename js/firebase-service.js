import { FIREBASE_ENABLED, firebaseConfig } from './firebase-config.js';

let firebaseApp = null;
let firestoreDb = null;
let firestoreApi = null;

async function getFirebase() {
  if (!FIREBASE_ENABLED) {
    throw new Error('Firebase está desativado em js/firebase-config.js.');
  }

  if (firestoreDb && firestoreApi) {
    return { db: firestoreDb, api: firestoreApi };
  }

  const { initializeApp, getApps } = await import('https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js');
  const api = await import('https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js');

  firebaseApp = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  firestoreDb = api.getFirestore(firebaseApp);
  firestoreApi = api;
  return { db: firestoreDb, api };
}

export async function loadFirebaseAdventures() {
  if (!FIREBASE_ENABLED) return { enabled: false, adventures: [] };

  try {
    const { db, api } = await getFirebase();
    // Consulta simples para evitar exigência de índice composto no Firestore.
    // A ordenação é feita no navegador.
    const q = api.query(
      api.collection(db, 'aventuras'),
      api.where('published', '==', true)
    );
    const snapshot = await api.getDocs(q);
    const adventures = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .sort((a, b) => (Number(a.order ?? 9999) - Number(b.order ?? 9999)) || String(a.title || '').localeCompare(String(b.title || '')));
    return { enabled: true, adventures };
  } catch (error) {
    console.error('Erro ao carregar aventuras do Firebase:', error);
    return { enabled: true, adventures: [], error: error.message };
  }
}

export async function listAllFirebaseAdventures() {
  const { db, api } = await getFirebase();
  const snapshot = await api.getDocs(api.collection(db, 'aventuras'));
  return snapshot.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .sort((a, b) => (Number(a.order ?? 9999) - Number(b.order ?? 9999)) || String(a.title || '').localeCompare(String(b.title || '')));
}

export async function publishFirebaseAdventure(adventure) {
  const { db, api } = await getFirebase();
  validateAdventure(adventure);
  const id = adventure.id.trim();
  const payload = { ...adventure };
  delete payload.id;
  await api.setDoc(api.doc(db, 'aventuras', id), payload, { merge: true });
  return id;
}

export async function deleteFirebaseAdventure(id) {
  const { db, api } = await getFirebase();
  if (!id || !id.trim()) throw new Error('Informe o ID da aventura para excluir.');
  await api.deleteDoc(api.doc(db, 'aventuras', id.trim()));
}

export function validateAdventure(adventure) {
  if (!adventure || typeof adventure !== 'object') throw new Error('JSON inválido: precisa ser um objeto.');
  const requiredStrings = ['id', 'title', 'desc', 'start'];
  requiredStrings.forEach(field => {
    if (!adventure[field] || typeof adventure[field] !== 'string') {
      throw new Error(`Campo obrigatório ausente ou inválido: ${field}`);
    }
  });
  if (!/^[a-z0-9-]+$/.test(adventure.id)) {
    throw new Error('O id deve usar apenas letras minúsculas, números e hífen. Exemplo: floresta-sombria');
  }
  if (!adventure.chapters || typeof adventure.chapters !== 'object') {
    throw new Error('Campo obrigatório ausente ou inválido: chapters');
  }
  if (!adventure.chapters[adventure.start]) {
    throw new Error(`O capítulo inicial "${adventure.start}" não existe dentro de chapters.`);
  }
  Object.entries(adventure.chapters).forEach(([chapterId, chapter]) => {
    if (!chapter.title || !chapter.text) {
      throw new Error(`O capítulo "${chapterId}" precisa ter title e text.`);
    }
    if (!chapter.end && !chapter.enemy && !Array.isArray(chapter.choices)) {
      throw new Error(`O capítulo "${chapterId}" precisa ter choices, enemy ou end:true.`);
    }
  });
  return true;
}
