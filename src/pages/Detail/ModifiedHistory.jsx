import React from 'react';
import styles from './css/ModifiedHistory.module.css';
import { v4 as uuidv4 } from 'uuid';
import useModal from '../../hooks/useModal';
import OverlayPortal from '../../components/common/Overlay/OverlayPortal';
import Overlay from '../../components/common/Overlay/Overlay';
import ModalPortal from '../../components/common/Modal/ModalPortal';
import ConfirmModal from '../../components/common/Modal/ConfirmModal';
import SetHistoryIcon from '../../components/common/icons/SetHistoryIcon';
import useClassDetail from '../../hooks/useClassDetail';
import Avatar from '../../components/common/Avatar';

export default function ModifiedHistory({ code, history, members }) {
  const { id, date, price, uid, deletable } = history;
  const [toggleHistoryModal, setToggleHistoryModal] = useModal();
  const { user, isLoading, error, handleDeleteHistory } = useClassDetail(code);
  const member = members.find((member) => member.uid === uid);

  return (
    <li className={styles.list}>
      <div className={styles.info}>
        <Avatar key={uuidv4()} image={member.photoURL} />
        <div className={styles.container}>
          <time className={styles.date}>{date}</time>
          <p className={styles.message}>
            모임의 돈이 <strong>{price.toLocaleString()}원</strong>으로 변경되었습니다.
          </p>
        </div>
      </div>
      {deletable && user.uid === uid && (
        <button className={styles['set-btn']} type='button' onClick={setToggleHistoryModal}>
          <SetHistoryIcon />
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
              onConfirm={() => handleDeleteHistory(id, setToggleHistoryModal)}
              onClose={setToggleHistoryModal}
            />
          </ModalPortal>
        </OverlayPortal>
      )}
    </li>
  );
}
