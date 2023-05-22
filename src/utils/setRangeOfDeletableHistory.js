import sortHistory from './sortHistory';

export default function setRangeOfDeletableHistory(histories, removeHistory) {
  const sortedHistories = sortHistory(histories);
  let flag = true; // 삭제 기준

  return sortedHistories.map((history) => {
    // 삭제하려는 내역과 일치하는 경우
    if (history === removeHistory) {
      return history;
    }

    // 일반 입출금 내역이면서, 삭제 기준이 true인 경우
    if (history.type !== 'classModify' && flag) {
      return { ...history, deletable: true };
    }

    // 변경 내역이면서, 삭제 기준이 true인 경우
    if (history.type === 'classModify' && flag) {
      flag = false;
      return { ...history, deletable: true };
    }

    return { ...history, deletable: flag };
  });
}
