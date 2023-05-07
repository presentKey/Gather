import styles from '../BottomSheetForm.module.css';
import Button from '../../../Button/Button';
import Input from '../../../input/Input';
import { useBottomSheet } from '../../../../../context/BottomSheetContext';
import useInput from '../../../../../hooks/useInput';

export default function ClassCreate({ distinct, onSubmit }) {
  const { toggle } = useBottomSheet();
  const [info, handleChange] = useInput();

  if (toggle !== distinct) return;
  return (
    // TODO 계좌번호 name: number -> account 변경
    <form className={styles.form} onSubmit={(e) => onSubmit(e, info, distinct)}>
      <Input type='text' name='title' text='모임 이름' value={info} onChange={handleChange} />
      <Input type='text' name='bank' text='은행' value={info} onChange={handleChange} />
      <Input type='number' name='account' text='계좌번호' value={info} onChange={handleChange} />
      <Button text='모임 생성!' type='submit' />
    </form>
  );
}
