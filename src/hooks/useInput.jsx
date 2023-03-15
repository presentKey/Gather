import { useState } from 'react';

export default function useInput(initialValue = {}) {
  const [info, setInfo] = useState(initialValue);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  return [info, handleChange];
}
