import styles from './ClassCreateForm.module.css';
import Button from '../../../Button/Button';
import Input from '../../../input/Input';
import { useBottomSheet } from '../../../../../context/BottomSheetContext';

export default function ClassCreateForm({ type }) {
  const { toggle } = useBottomSheet();

  if (toggle !== type) return;
  return (
    // TODO 계좌번호 name: number -> account 변경
    <form className={styles.form}>
      <Input type='text' name='title' text='모임 이름' />
      <Input type='text' name='bank' text='은행' />
      <Input type='number' name='account' text='계좌번호' />
      <Button text='모임 생성!' />
    </form>
  );
}
