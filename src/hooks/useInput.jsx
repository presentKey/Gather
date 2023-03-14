import { useState } from 'react';

export default function useInput() {
  const [info, setInfo] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  return [info, handleChange];
}
