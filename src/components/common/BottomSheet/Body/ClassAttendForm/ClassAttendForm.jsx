import styles from './ClassAttendForm.module.css';
import Button from '../../../Button/Button';
import Input from '../../../input/Input';
import { useBottomSheet } from '../../../../../context/BottomSheetContext';

export default function ClassAttendForm({ type }) {
  const { toggle } = useBottomSheet();

  if (toggle !== type) return;
  return (
    <form className={styles.form}>
      <Input type='text' name='code' text='모임 이름' />
      <Button text='모임 참여!' />
    </form>
  );
}
