import { useState } from 'react';
import sortHistory from '../../../utils/sortHistory';

export default function useClassDetail() {
  const [isUpdate, setIsUpdate] = useState(false);
  const handleUpdateButtonClick = () => setIsUpdate(!isUpdate);
  const sortedHistory = (histories) => sortHistory(histories);

  return {
    isUpdate,
    handleUpdateButtonClick,
    sortedHistory,
  };
}
