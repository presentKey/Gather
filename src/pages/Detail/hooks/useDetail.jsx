import { useState } from 'react';

export default function useDetail() {
  const [isUpdate, setIsUpdate] = useState(false);
  const handleUpdateButtonClick = () => setIsUpdate(!isUpdate);

  return {
    isUpdate,
    handleUpdateButtonClick,
  };
}
