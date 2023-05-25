import sortHistory from './sortHistory';

/**
 * 삭제할 수 있는 내역의 범위를 재설정하는 함수
 * @param histories 모임의 내역들
 * @param removeHistory  삭제할 내역
 */
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

    // 모임 수정 내역이면서, 삭제 기준이 true인 경우
    if (history.type === 'classModify' && flag) {
      flag = false; // 이후 내역들은 삭제할 수 없는 상태로 변경
      return { ...history, deletable: true };
    }

    return { ...history, deletable: flag };
  });
}
