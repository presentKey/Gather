import { useState } from 'react';
import sortHistory from '../../../utils/sortHistory';

export default function useClassDetail() {
  const [openAddForm, setOpenAddForm] = useState(false);
  const [isModification, setIsModification] = useState(false);
  const handleToggleAddForm = () => setOpenAddForm((prev) => !prev);
  const handleModifyBtnClick = () => setIsModification(!isModification);
  const sortedHistory = (histories) => sortHistory(histories);

  return {
    openAddForm,
    isModification,
    handleToggleAddForm,
    handleModifyBtnClick,
    sortedHistory,
  };
}
