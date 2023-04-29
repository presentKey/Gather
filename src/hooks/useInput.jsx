import { useState } from 'react';

export default function useInput(initialValue = {}) {
  const [info, setInfo] = useState(initialValue);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setInfo((prev) => ({ ...prev, [name]: checked }));
      return;
    }

    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  const clearInput = () => setInfo(initialValue);

  return [info, handleChange, clearInput];
}
