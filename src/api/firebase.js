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
import checkAccountNumberRegExp from '../utils/checkAccountNumberRegExp';

/**
 * firebase 문서
 * @desc 인증: https://firebase.google.com/docs/auth/web/start?hl=ko
 * @desc firestore: https://firebase.google.com/docs/firestore/quickstart?hl=ko
 * */

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};
const provider = new GoogleAuthProvider();
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

/**
 * 구글 로그인
 * @desc 모바일 인 경우 Redirect 방식 (Firefox 제외)
 * @desc 모바일이 아닌 경우 Popup 방식
 * */
export function googleLogin() {
  if (isMobile()) {
    signInWithRedirect(auth, provider);
    return;
  }

  signInWithPopup(auth, provider)
    .then((result) => {
      const { uid, isAnonymous } = result.user;
      isMember(uid, isAnonymous);
    })
    .catch(console.error);
}

/** Google Login Reirect 결과를 받아오는 함수 */
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

/** 게스트 로그인 */
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

/** 사용자의 로그인 상태가 변경될 때마다 호출 */
export function onUserStateChange(callback) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}

/**
 * 등록된 사용자인지 판별하는 함수
 * @param uid 사용자의 uid
 * @param isAnonymous 게스트 유저 구분
 */
async function isMember(uid, isAnonymous) {
  const docRef = doc(db, 'members', uid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    saveMemberInDB(uid, isAnonymous);
  }
}

/** 사용자 등록
 * @param uid 사용자의 uid
 * @param isAnonymous 게스트 유저 구분
 */
async function saveMemberInDB(uid, isAnonymous) {
  const docData = {
    uid,
    isAnonymous,
    myClasses: [],
  };
  const memberRef = doc(db, 'members', uid);

  await setDoc(memberRef, docData);
}

/**
 * 모임 만들기
 * @param user 사용자 정보
 * @param info 입력 정보
 */
export async function createClass(user, info) {
  const { uid, photoURL } = user;
  const { title, bank, number, allowAnonymouse } = info;

  if (!title || title.trim().length === 0)
    throw new Error('모임 이름을 입력해주세요.');

  if (number && !checkAccountNumberRegExp(number))
    throw new Error('계좌번호 숫자만 입력해주세요.');

  const code = generateCode();
  const batch = writeBatch(db);

  const codeRef = doc(db, 'classes', code);
  batch.set(codeRef, {
    title,
    account: { bank: bank ?? '', number: number ?? '' },
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

/**
 * 모임 참여하기
 * @param user 사용자 정보
 * @param info 입력 정보
 */
export async function AttendClass(user, info) {
  const { uid, photoURL, isAnonymous } = user;
  const { code } = info;

  if (!code) throw new Error('코드를 입력해주세요.');

  const docRef = doc(db, 'classes', code);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) throw new Error('코드를 다시 한 번 확인해주세요.');

  if (docSnap.data().allowAnonymouse === false && isAnonymous === true)
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

/**
 * 사용자의 모임 List를 가져오는 함수
 * @param uid 사용자의 uid
 */
export async function getClassList(uid) {
  const docRef = doc(db, 'members', uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }

  return null;
}

/**
 * 특정 모임의 상세 정보를 가져오는 함수
 * @param code 모임의 고유 코드
 */
export async function getClassDetail(code) {
  const docRef = doc(db, 'classes', code);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const sortedHistory = sortHistory(docSnap.data().history);
    return { ...docSnap.data(), history: sortedHistory };
  }

  return null;
}

/**
 * 모임의 정보를 업데이트 하는 함수
 * @param uid 사용자의 uid
 * @param code 모임의 고유 코드
 * @param info 입력 정보
 */
export async function updateClassHeader(uid, code, info) {
  const { title, bank, number, total, allowAnonymouse } = info;
  const amount = parseInt(total, 10);

  if (!title || title.trim().length === 0)
    throw new Error('모임 이름을 입력해주세요.');

  if (Number.isNaN(amount))
    throw new Error('총 금액을 다시 한 번 확인해주세요.');

  if (number && !checkAccountNumberRegExp(number))
    throw new Error('계좌번호 숫자만 입력해주세요.');

  const classRef = doc(db, 'classes', code);

  await runTransaction(db, async (transaction) => {
    const classDoc = await transaction.get(classRef);

    if (!classDoc.exists()) throw new Error('모임이 존재하지 않습니다.');

    const { history: histories, total: prevTotal } = classDoc.data();

    // 총 금액 변동이 없는 경우
    if (prevTotal === amount) {
      transaction.update(classRef, {
        account: { bank: bank ?? '', number: number ?? '' },
        title,
        allowAnonymouse,
      });

      return;
    }

    // 총 금액 변동이 있는 경우
    const undeletableHistories = histories.map((history) => ({
      ...history,
      deletable: false,
    }));

    transaction.update(classRef, { history: undeletableHistories });
    transaction.update(classRef, {
      account: { bank: bank ?? '', number: number ?? '' },
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
  });
}

/**
 * 모임에서 나가기
 * @param code 모임의 고유 코드
 * @param uid 사용자의 uid
 * @param members 모임의 현재 인원들
 */
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

/**
 * 입금 및 출금 내역 생성
 * @param code 모임의 고유 코드
 * @param uid 사용자의 uid
 * @param info 입력 정보
 * @param minDate 모임 정보 수정(updateClassHeader)을 통해 가장 최근 돈이 수정된 날짜
 * @param type 입금 또는 출금 tag
 */
export async function depositOrWithdraw(code, uid, info, minDate, type) {
  const { price, message: msg, date } = info;
  const message = msg ?? '';
  let amount = parseInt(price, 10);

  if (!checkDateRegExp(date)) throw new Error('날짜 형식이 맞지 않습니다.');

  if (minDate && minDate > date)
    throw new Error('최근 모임 수정 날짜보다 더 이른 날은 등록할 수 없습니다.');

  if (Number.isNaN(amount)) throw new Error('금액을 다시 한 번 확인해주세요.');

  if (message.length > 20)
    throw new Error('최대 20글자까지 입력할 수 있습니다.');

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

/**
 * 입출금 및 모임 수정 내역 삭제
 * @param code 모임의 고유 코드
 * @param uid 사용자의 uid
 * @param id 내역의 id
 */
export async function deleteHistory(code, uid, id) {
  const classRef = doc(db, 'classes', code);

  await runTransaction(db, async (transaction) => {
    const classDoc = await transaction.get(classRef);
    if (!classDoc.exists()) throw new Error('모임이 존재하지 않습니다.');

    const histories = classDoc.data().history;
    const removeHistory = histories.find(
      (history) => history.uid === uid && history.id === id
    );

    if (!removeHistory)
      throw new Error('작성자가 아니거나 존재하지 않는 내역입니다.');

    // 삭제 내역이 모임 수정 내역인 경우
    if (removeHistory.type === 'classModify') {
      const historyRange = setRangeOfDeletableHistory(histories, removeHistory);

      transaction.update(classRef, {
        history: historyRange,
      });
      transaction.update(classRef, {
        history: arrayRemove(removeHistory),
        total: calcTotalPrice(historyRange, id),
      });

      return;
    }

    // 일반 입출금 내역인 경우
    transaction.update(classRef, {
      history: arrayRemove(removeHistory),
      total: increment(removeHistory.price * -1),
    });
  });
}
