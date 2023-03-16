import React from 'react';
import { IoMdSettings } from 'react-icons/io';
import { useLocation } from 'react-router-dom';
import ConfirmModal from '../../components/common/Modal/ConfirmModal';
import ModalPortal from '../../components/common/Modal/ModalProtal';
import Overlay from '../../components/common/Overlay/Overlay';
import OverlayPortal from '../../components/common/Overlay/OverlayPortal';
import useClass from '../../components/Main/hooks/useClass';
import useModal from '../../hooks/useModal';
import useMenu from './hooks/useMenu';
import styles from './SettingMenu.module.css';

export default function SettingMenu({ onModifyBtnClick }) {
  const { menuRef, toggleMenu, handleToggleMenu } = useMenu();
  const [toggleModal, handleToggleModal] = useModal();
  const {
    state: { code, detail },
  } = useLocation();
  const { handleLeaveClass } = useClass(code);

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
            <button type="button" onClick={handleToggleModal}>
              모임 나가기
            </button>
          </li>
        </ul>
      </div>
      {toggleModal && (
        <OverlayPortal>
          <Overlay onClose={handleToggleModal} />
          <ModalPortal>
            <ConfirmModal
              detail={detail}
              onConfirm={handleLeaveClass}
              onClose={handleToggleModal}
            />
          </ModalPortal>
        </OverlayPortal>
      )}
    </div>
  );
}
