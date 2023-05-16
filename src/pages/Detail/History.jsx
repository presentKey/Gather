import React from 'react';
import Avatar from '../../components/common/Avatar/Avatar';
import { v4 as uuidv4 } from 'uuid';
import styles from './History.module.css';
import useModal from '../../hooks/useModal';
import OverlayPortal from '../../components/common/Overlay/OverlayPortal';
import Overlay from '../../components/common/Overlay/Overlay';
import ModalPortal from '../../components/common/Modal/ModalProtal';
import ConfirmModal from '../../components/common/Modal/ConfirmModal';
import useClass from '../../components/Main/hooks/useClass';
import SetHistoryIcon from '../../components/common/icons/SetHistoryIcon';

export default function History({ code, history, members }) {
  const { id, date, price, message, type, uid, deletable } = history;
  const [toggleHistoryModal, setToggleHistoryModal] = useModal();
  const { user, isLoading, error, handleDeleteHistory } = useClass();
  const member = members.find((member) => member.uid === uid);

  return (
    <li className={`${styles.list} ${!deletable && styles.disabled}`}>
      <div className={styles.left}>
        <Avatar key={uuidv4()} image={member.photoURL} />
        <div className={styles.container}>
          <span className={styles.date}>{date}</span>
          <p className={styles.message}>{message}</p>
        </div>
      </div>
      <div className={styles.right}>
        <b className={`${styles.type} ${type === 'deposit' && styles.deposit}`}>
          {type === 'deposit' ? '입금' : '출금'}
        </b>
        <strong className={styles.price}>{price.toLocaleString()}원</strong>
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
              onConfirm={() => handleDeleteHistory(code, id, setToggleHistoryModal)}
              onClose={setToggleHistoryModal}
            />
          </ModalPortal>
        </OverlayPortal>
      )}
    </li>
  );
}
