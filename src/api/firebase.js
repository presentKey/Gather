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
  increment,
  runTransaction,
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import calcTotalPrice from '../utils/calcTotalPrice';
import checkDateRegExp from '../utils/checkDateRegExp';
import generateCode from '../utils/generateCode';
import getTodayDate from '../utils/getTodayDate';
import isMobile from '../utils/isMobile';
import setRangeOfDeletableHistory from '../utils/setRangeOfDeletableHistory';
import { WITHDRAW } from '../constants/bottomSheetTag';
import sortHistory from '../utils/sortHistory';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
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
  const { title, bank, number, allowAnonymouse } = info;
  const accountNumber = parseInt(number, 10);

  if (!title || !bank || !number) throw new Error('모든 정보를 입력해주세요.');
  if (Number.isNaN(accountNumber)) throw new Error('계좌번호를 다시 한 번 확인해주세요.');

  const code = generateCode();
  const batch = writeBatch(db);

  const codeRef = doc(db, 'classes', code);
  batch.set(codeRef, {
    title,
    account: { bank, number: accountNumber },
    members: [{ uid, photoURL }],
    history: [],
    total: 0,
    allowAnonymouse: allowAnonymouse || false,
  });

  const uidRef = doc(db, 'members', uid);
  batch.update(uidRef, {
    myClasses: arrayUnion(code),
  });

  await batch.commit();
}

export async function AttendClass(user, info) {
  const { uid, photoURL } = user;
  const { code } = info;

  if (!code) throw new Error('코드를 입력해주세요.');

  const docRef = doc(db, 'classes', code);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) throw new Error('코드를 다시 한 번 확인해주세요.');
  if (!docSnap.data().allowAnonymouse)
    throw new Error('게스트 유저는 해당 모임에 참여할 수 없습니다.');

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
    const sortedHistory = sortHistory(docSnap.data().history);
    return { ...docSnap.data(), history: sortedHistory };
  }

  return null;
}

export async function updateClassHeader(uid, code, info) {
  const { title, bank, number, total, allowAnonymouse } = info;
  const amount = parseInt(total, 10);
  const accountNumber = parseInt(number, 10);

  if (title.trim().length === 0 || bank.trim().length === 0)
    throw new Error('모임이름 또는 은행 정보를 입력해주세요.');
  if (Number.isNaN(amount)) throw new Error('총 금액을 다시 한 번 확인해주세요.');
  if (Number.isNaN(accountNumber)) throw new Error('계좌번호를 다시 한 번 확인해주세요.');

  const classRef = doc(db, 'classes', code);

  await runTransaction(db, async (transaction) => {
    const classDoc = await transaction.get(classRef);
    if (!classDoc.exists()) throw new Error('모임이 존재하지 않습니다.');

    const { history: histories, total: prevTotal } = classDoc.data();

    if (prevTotal === amount) {
      transaction.update(classRef, {
        account: { bank, number: accountNumber },
        title,
        allowAnonymouse,
      });
    } else {
      const undeletableHistories = histories.map((history) => ({
        ...history,
        deletable: false,
      }));

      transaction.update(classRef, { history: undeletableHistories });
      transaction.update(classRef, {
        account: { bank, number: accountNumber },
        title,
        total: amount,
        allowAnonymouse,
        history: arrayUnion({
          id: uuidv4(),
          uid,
          price: amount,
          date: getTodayDate(),
          timestamp: new Date(),
          type: 'classModify',
          deletable: true,
        }),
      });
    }
  });
}

export async function leaveClass(code, uid, members) {
  const leaveMember = members.find((member) => member.uid === uid);

  if (!leaveMember) throw new Error('존재하지 않는 멤버입니다.');

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

export async function depositOrWithdraw(code, uid, info, minDate, type) {
  const { price, message: msg, date } = info;
  const message = msg ?? '';
  let amount = parseInt(price, 10);

  if (!checkDateRegExp(date)) throw new Error('날짜 형식이 맞지 않습니다.');
  if (minDate && minDate > date)
    throw new Error('최근 모임 수정 날짜보다 더 이른 날은 등록할 수 없습니다.');
  if (Number.isNaN(amount)) throw new Error('금액을 다시 한 번 확인해주세요.');
  if (message.length > 20) throw new Error('최대 20글자까지 입력할 수 있습니다.');

  if (type === WITHDRAW && amount >= 0) {
    amount = amount * -1;
  }

  const classRef = doc(db, 'classes', code);
  await updateDoc(classRef, {
    history: arrayUnion({
      id: uuidv4(),
      uid,
      price: amount,
      message,
      date,
      timestamp: new Date(),
      type,
      deletable: true,
    }),
    total: increment(amount),
  });
}

export async function deleteHistory(code, uid, id) {
  const classRef = doc(db, 'classes', code);

  await runTransaction(db, async (transaction) => {
    const classDoc = await transaction.get(classRef);
    if (!classDoc.exists()) throw new Error('모임이 존재하지 않습니다.');

    const histories = classDoc.data().history;
    const removeHistory = histories.find((history) => history.uid === uid && history.id === id);

    if (!removeHistory) throw new Error('작성자가 아니거나 존재하지 않는 내역입니다.');

    if (removeHistory.type === 'classModify') {
      const historyRange = setRangeOfDeletableHistory(histories, removeHistory);

      transaction.update(classRef, {
        history: historyRange,
      });
      transaction.update(classRef, {
        history: arrayRemove(removeHistory),
        total: calcTotalPrice(historyRange, id),
      });
    } else {
      transaction.update(classRef, {
        history: arrayRemove(removeHistory),
        total: increment(removeHistory.price * -1),
      });
    }
  });
}
