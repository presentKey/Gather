import { useState } from 'react';

export default function useToggleContent() {
  const [content, setContent] = useState({
    create: false,
    participation: false,
  });

  const handleContent = (e) => {
    const { type } = e.target.dataset;

    if (type === 'create') {
      setContent((prev) => ({
        ...prev,
        create: !prev[type],
        participation: false,
      }));
    }

    if (type === 'participation') {
      setContent((prev) => ({
        ...prev,
        create: false,
        participation: !prev[type],
      }));
    }
  };

  const handleClose = () => {
    setContent({ create: false, participation: false });
  };

  return [content, handleContent, handleClose];
}
