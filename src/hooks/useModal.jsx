import { useState } from 'react';

export default function useModal() {
  const [toggleModal, setToggleModal] = useState(false);
  const handleToggleModal = () => setToggleModal((prev) => !prev);

  return [toggleModal, handleToggleModal];
}
