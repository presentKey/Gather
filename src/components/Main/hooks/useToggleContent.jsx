import { useState } from 'react';

export default function useToggleContent(initial) {
  const [content, setContent] = useState(initial);

  const handleContent = (e) => {
    const { type } = e.target.dataset;

    setContent((prev) => ({
      ...initial,
      [type]: !prev[type],
    }));
  };

  const handleClose = () => {
    setContent(initial);
  };

  return [content, handleContent, handleClose];
}
