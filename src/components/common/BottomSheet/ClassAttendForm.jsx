import styles from './css/BottomSheetForm.module.css';
import Button from '../Button';
import Input from '../Input/Input';
import { useBottomSheet } from '../../../context/BottomSheetContext';
import useInput from '../../../hooks/useInput';
import useClassList from '../../../hooks/useClassList';
import ModalPortal from '../Modal/ModalPortal';
import ToastNotification from '../Modal/ToastNotification';

export default function ClassAttendForm({ tag }) {
  const { toggle } = useBottomSheet();
  const [info, handleChange] = useInput();
  const { isLoading, error, handleAttendSubmit } = useClassList();

  if (toggle !== tag) return;
  return (
    <>
      <form className={styles.form} onSubmit={(e) => handleAttendSubmit(e, info)}>
        <p className={styles.message}>모임 구성원에게 코드 공유를 요청하세요!</p>
        <Input
          type='text'
          name='code'
          text='모임 코드'
          value={info}
          onChange={handleChange}
          required
        />
        <Button text='모임 참여!' type='submit' color='yellow' isLoading={isLoading} />
      </form>

      {error.state && (
        <ModalPortal>
          <ToastNotification message={error.message} />
        </ModalPortal>
      )}
    </>
  );
}
