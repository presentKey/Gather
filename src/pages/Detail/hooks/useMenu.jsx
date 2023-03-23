import { useEffect, useRef, useState } from 'react';

export default function useMenu() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const menuRef = useRef(null);
  const handleToggleMenu = () => setToggleMenu(!toggleMenu);

  useEffect(() => {
    if (!toggleMenu) return;

    const closeMenu = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setToggleMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [toggleMenu]);

  return { menuRef, toggleMenu, handleToggleMenu };
}
