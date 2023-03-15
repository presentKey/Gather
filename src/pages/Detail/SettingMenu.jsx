import React from 'react';
import { IoMdSettings } from 'react-icons/io';
import useMenu from './hooks/useMenu';
import styles from './SettingMenu.module.css';

export default function SettingMenu({ onModifyBtnClick }) {
  const { menuRef, toggleMenu, handleToggleMenu } = useMenu();

  return (
    <div ref={menuRef} className={styles['setting-menu-group']}>
      <button onClick={handleToggleMenu} className={styles['setting-btn']}>
        <IoMdSettings className={styles['setting-icon']} />
      </button>
      <div className={`${styles.menu} ${toggleMenu && styles['is-open']}`}>
        <ul className={styles['menu-list']}>
          <li className={styles['menu-item']}>
            <button type="button" onClick={onModifyBtnClick}>
              수정
            </button>
          </li>
          <li className={styles['menu-item']}>
            <button type="button">모임 나가기</button>
          </li>
        </ul>
      </div>
    </div>
  );
}
