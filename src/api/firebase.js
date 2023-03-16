import { initializeApp } from 'firebase/app';
import {
  getAuth,
  getRedirectResult,
  signInWithPopup,
  signInWithRedirect,
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
  updateDoc,
  arrayUnion,
  arrayRemove,
  writeBatch,
} from 'firebase/firestore';
import generateCode from '../utils/generateCode';
import isMobile from '../utils/isMobile';

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
  if (isMobile()) {
    signInWithRedirect(auth, provider);
  } else {
    signInWithPopup(auth, provider)
      .then((result) => {
        const { uid, isAnonymous } = result.user;
        isMember(uid, isAnonymous);
      })
      .catch(console.error);
  }
}

export function googleRedirectResult() {
  if (isMobile()) {
    getRedirectResult(auth)
      .then((result) => {
        if (!result) return;
        const { uid, isAnonymous } = result.user;
        isMember(uid, isAnonymous);
      })
      .catch(console.error);
  }
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

  if (!title || !bank || !number) {
    throw new Error('정보가 누락되었습니다.');
  }

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

  if (!code) {
    throw new Error('정보가 누락되었습니다.');
  }

  const docRef = doc(db, 'classes', code);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error('코드가 잘못되었습니다.');
  }

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

export async function updateClassHeader(code, info) {
  const { title, bank, number, total } = info;
  const amount = parseInt(total, 10);

  if (
    title.trim().length === 0 ||
    bank.trim().length === 0 ||
    number.trim().length === 0
  ) {
    throw new Error('정보가 누락되었습니다.');
  }

  if (Number.isNaN(amount)) {
    throw new Error('숫자가 아닙니다.');
  }

  const classRef = doc(db, 'classes', code);

  await updateDoc(classRef, {
    account: { bank, number },
    title,
    total: amount,
  });
}

export async function leaveClass(code, user, members) {
  const { uid } = user;
  const leaveMember = members.find((member) => member.uid === uid);

  if (!leaveMember) {
    throw new Error('존재하지 않는 멤버입니다.');
  }

  const batch = writeBatch(db);

  const codeRef = doc(db, 'classes', code);
  batch.update(codeRef, {
    members: arrayRemove(leaveMember),
  });

  const uidRef = doc(db, 'members', uid);
  batch.update(uidRef, {
    myClasses: arrayRemove(code),
  });

  await batch.commit();
}
