import { useState } from 'react';

export default function useClassDetail() {
  const [openAddForm, setOpenAddForm] = useState(false);
  const [isModification, setIsModification] = useState(false);
  const handleToggleAddForm = () => setOpenAddForm((prev) => !prev);
  const handleModifyBtnClick = () => setIsModification(!isModification);
  const sortHistory = (histories) =>
    histories.sort((a, b) => new Date(b.date) - new Date(a.date));

  return {
    openAddForm,
    isModification,
    handleToggleAddForm,
    handleModifyBtnClick,
    sortHistory,
  };
}
