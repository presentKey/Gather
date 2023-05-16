import { useState } from 'react';

export default function useClassDetail() {
  const [isUpdate, setIsUpdate] = useState(false);
  const handleUpdateButtonClick = () => setIsUpdate(!isUpdate);

  return {
    isUpdate,
    handleUpdateButtonClick,
  };
}
