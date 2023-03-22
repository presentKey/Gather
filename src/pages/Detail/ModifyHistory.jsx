import React from 'react';
import Avatar from '../../components/common/Avatar/Avatar';
import styles from './ModifyHistory.module.css';
import { v4 as uuidv4 } from 'uuid';
import useClass from '../../components/Main/hooks/useClass';
import { BsThreeDotsVertical } from 'react-icons/bs';
import useModal from '../../hooks/useModal';
import OverlayPortal from '../../components/common/Overlay/OverlayPortal';
import Overlay from '../../components/common/Overlay/Overlay';
import ModalPortal from '../../components/common/Modal/ModalProtal';
import ConfirmModal from '../../components/common/Modal/ConfirmModal';

export default function ModifyHistory({ code, histories, history, members }) {
  const { id, date, price, uid, deletable } = history;
  const [toggleHistoryModal, setToggleHistoryModal] = useModal();
  const { user, isLoading, error, handleDeleteHistory } = useClass(code);

  return (
    <li className={styles['history-list']}>
      <div className={styles.left}>
        {members.map(
          (member) =>
            member.uid === uid && (
              <Avatar key={uuidv4()} image={member.photoURL} />
            )
        )}
        <span className={styles.date}>{date}</span>
        <p className={styles.message}>
          모임의 돈이 <strong>{price.toLocaleString()}</strong>원으로
          변경되었습니다.
        </p>
      </div>
      {deletable && user.uid === uid && (
        <button
          className={styles['set-btn']}
          type="button"
          onClick={setToggleHistoryModal}
        >
          <BsThreeDotsVertical className={styles['set-icon']} />
        </button>
      )}
      {toggleHistoryModal && (
        <OverlayPortal>
          <Overlay onClose={setToggleHistoryModal} />
          <ModalPortal>
            <ConfirmModal
              message={'해당 내역을 삭제하시겠습니까?'}
              btnText={'내역 삭제'}
              isLoading={isLoading}
              error={error}
              onConfirm={() =>
                handleDeleteHistory(id, histories, setToggleHistoryModal)
              }
              onClose={setToggleHistoryModal}
            />
          </ModalPortal>
        </OverlayPortal>
      )}
    </li>
  );
}
