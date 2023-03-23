import sortHistory from './sortHistory';

export default function setRangeOfDeletableHistory(histories, removeHistory) {
  const sortedHistory = sortHistory(histories);
  let deletable = true;

  return sortedHistory.map((history) => {
    if (history === removeHistory) {
      return history;
    }

    if (history.type === 'classModify') {
      deletable = false;
      return { ...history, deletable: true };
    }

    if (!deletable) {
      return { ...history, deletable: false };
    }

    return { ...history, deletable: true };
  });
}
