import styles from '../BottomSheetForm.module.css';
import Button from '../../../Button/Button';
import Input from '../../../input/Input';
import { useBottomSheet } from '../../../../../context/BottomSheetContext';
import useInput from '../../../../../hooks/useInput';
import useClass from '../../../../Main/hooks/useClass';

export default function ClassAttend({ distinct, onSubmit }) {
  const { toggle } = useBottomSheet();
  const [info, handleChange] = useInput();
  const { isLoading, error, handleSubmit } = useClass();

  if (toggle !== distinct) return;
  return (
    <form className={styles.form} onSubmit={(e) => handleSubmit(e, info, distinct)}>
      <Input type='text' name='code' text='모임 코드' value={info} onChange={handleChange} />
      <Button text='모임 참여!' type='submit' isLoading={isLoading} error={error} />
    </form>
  );
}
