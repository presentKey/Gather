import { MdContentCopy } from 'react-icons/md';
import styles from './css/AccountNumber.module.css';
import { copyAccountNumber } from '../../utils/clipboard';
import ModalPortal from '../../components/common/Modal/ModalPortal';
import ToastNotification from '../../components/common/Modal/ToastNotification';
import { useState } from 'react';

export default function AccountNumber({ number }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <span className={styles.container} onClick={() => copyAccountNumber(number, setOpen)}>
        {number}
        <MdContentCopy className={styles.icon} />
      </span>

      {open && (
        <ModalPortal>
          <ToastNotification type='success' message='계좌번호가 복사되었습니다.' />
        </ModalPortal>
      )}
    </>
  );
}
