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
  const [toggleLeaveModal, handleToggleLeaveModal] = useModal();
  const [toggleFriendModal, handleToggleFriendModal] = useModal();
  const {
    state: { code, detail },
  } = useLocation();
  const { handleLeaveClass } = useClass(code);

  return (
    <div ref={menuRef} className={styles['setting-menu-group']}>
      <button
        className={styles['setting-btn']}
        type="button"
        onClick={handleToggleMenu}
      >
        <IoMdSettings className={styles['setting-icon']} />
      </button>
      <div className={`${styles.menu} ${toggleMenu && styles['is-open']}`}>
        <ul className={styles['menu-list']}>
          <li className={styles['menu-item']} onClick={handleToggleFriendModal}>
            <button type="button">친구 초대</button>
          </li>
          <li className={styles['menu-item']} onClick={onModifyBtnClick}>
            <button type="button">모임 수정</button>
          </li>
          <li className={styles['menu-item']} onClick={handleToggleLeaveModal}>
            <button className={styles['is-leave']} type="button">
              모임 나가기
            </button>
          </li>
        </ul>
      </div>
      {toggleLeaveModal && (
        <OverlayPortal>
          <Overlay onClose={handleToggleLeaveModal} />
          <ModalPortal>
            <ConfirmModal
              message={'모임에서 나가시겠습니까?'}
              btnText={'모임 나가기'}
              detail={detail}
              onConfirm={handleLeaveClass}
              onClose={handleToggleLeaveModal}
            />
          </ModalPortal>
        </OverlayPortal>
      )}
      {toggleFriendModal && (
        <OverlayPortal>
          <Overlay onClose={handleToggleFriendModal} />
          <ModalPortal>
            <ConfirmModal
              message={'친구에게 코드를 공유해주세요!'}
              code={code}
              btnText={'코드 복사'}
              onConfirm={handleLeaveClass}
              onClose={handleToggleFriendModal}
            />
          </ModalPortal>
        </OverlayPortal>
      )}
    </div>
  );
}
