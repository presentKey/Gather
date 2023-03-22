import React from 'react';
import { IoMdSettings } from 'react-icons/io';
import { BsPersonFillAdd } from 'react-icons/bs';
import { HiPencilAlt } from 'react-icons/hi';
import { ImExit } from 'react-icons/im';
import { useLocation } from 'react-router-dom';
import ConfirmModal from '../../components/common/Modal/ConfirmModal';
import ModalPortal from '../../components/common/Modal/ModalProtal';
import Overlay from '../../components/common/Overlay/Overlay';
import OverlayPortal from '../../components/common/Overlay/OverlayPortal';
import useClass from '../../components/Main/hooks/useClass';
import useModal from '../../hooks/useModal';
import clipboard from '../../utils/clipboard';
import useMenu from './hooks/useMenu';
import styles from './SettingMenu.module.css';

export default function SettingMenu({ members, onModifyBtnClick }) {
  const { menuRef, toggleMenu, handleToggleMenu } = useMenu();
  const [toggleLeaveModal, handleToggleLeaveModal] = useModal();
  const [toggleFriendModal, handleToggleFriendModal] = useModal();
  const {
    state: { code },
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
            <button type="button">
              <BsPersonFillAdd />
              친구 초대
            </button>
          </li>
          <li className={styles['menu-item']} onClick={onModifyBtnClick}>
            <button type="button">
              <HiPencilAlt />
              모임 수정
            </button>
          </li>
          <li className={styles['menu-item']} onClick={handleToggleLeaveModal}>
            <button className={styles['is-leave']} type="button">
              <ImExit />
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
              onConfirm={() =>
                handleLeaveClass(members, handleToggleLeaveModal)
              }
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
              onConfirm={() => {
                clipboard(code);
                handleToggleFriendModal();
              }}
              onClose={handleToggleFriendModal}
            />
          </ModalPortal>
        </OverlayPortal>
      )}
    </div>
  );
}
