import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  signInAnonymously,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  arrayUnion,
  writeBatch,
} from 'firebase/firestore';
import generateCode from '../utils/generateCode';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_I,
};
const provider = new GoogleAuthProvider();
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export function googleLogin() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const { uid, isAnonymous } = result.user;
      isMember(uid, isAnonymous);
    })
    .catch(console.error);
}

export function anonymouseLogin() {
  signInAnonymously(auth)
    .then((result) => {
      const { uid, isAnonymous } = result.user;
      isMember(uid, isAnonymous);
    })
    .catch(console.error);
}

export function logout() {
  signOut(auth).catch(console.error);
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}

async function isMember(uid, isAnonymous) {
  const docRef = doc(db, 'members', uid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    saveMemberInDB(uid, isAnonymous);
  }
}

async function saveMemberInDB(uid, isAnonymous) {
  const docData = {
    uid,
    isAnonymous,
    myClasses: [],
  };
  const memberRef = doc(db, 'members', uid);

  await setDoc(memberRef, docData);
}

export async function createClass(user, info) {
  const { uid, photoURL } = user;
  const { title, bank, number } = info;
  const code = generateCode();
  const batch = writeBatch(db);

  const codeRef = doc(db, 'classes', code);
  batch.set(codeRef, {
    title,
    account: { bank, number },
    members: [{ uid, photoURL }],
    total: 0,
  });

  const uidRef = doc(db, 'members', uid);
  batch.update(uidRef, {
    myClasses: arrayUnion(code),
  });

  await batch.commit();
}

export async function participationClass(user, info) {
  const { uid, photoURL } = user;
  const { code } = info;
  const docRef = doc(db, 'classes', code);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) throw new Error('코드가 잘못되었습니다.');

  const batch = writeBatch(db);
  const codeRef = doc(db, 'classes', code);
  batch.update(codeRef, {
    members: arrayUnion({ uid, photoURL }),
  });

  const uidRef = doc(db, 'members', uid);
  batch.update(uidRef, {
    myClasses: arrayUnion(code),
  });

  await batch.commit();
}

export async function getClassList(uid) {
  const docRef = doc(db, 'members', uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }

  return null;
}

export async function getClassDetail(code) {
  const docRef = doc(db, 'classes', code);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }

  return null;
}
