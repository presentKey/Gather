import { useState } from 'react';
import sortHistory from '../../../utils/sortHistory';

export default function useClassDetail() {
  const [isModification, setIsModification] = useState(false);
  const handleModifyBtnClick = () => setIsModification(!isModification);
  const sortedHistory = (histories) => sortHistory(histories);

  return {
    isModification,
    handleModifyBtnClick,
    sortedHistory,
  };
}
