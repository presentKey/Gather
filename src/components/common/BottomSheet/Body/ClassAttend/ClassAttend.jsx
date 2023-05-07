import styles from '../BottomSheetForm.module.css';
import Button from '../../../Button/Button';
import Input from '../../../Input/Input';
import { useBottomSheet } from '../../../../../context/BottomSheetContext';
import useInput from '../../../../../hooks/useInput';
import useClass from '../../../../Main/hooks/useClass';

export default function ClassAttend({ tag }) {
  const { toggle } = useBottomSheet();
  const [info, handleChange] = useInput();
  const { isLoading, error, handleSubmit } = useClass();

  if (toggle !== tag) return;
  return (
    <form className={styles.form} onSubmit={(e) => handleSubmit(e, info, tag)}>
      <p className={styles.message}>모임 구성원에게 코드 공유를 요청하세요!</p>
      <Input
        type='text'
        name='code'
        text='모임 코드'
        value={info}
        onChange={handleChange}
        required
      />
      <Button text='모임 참여!' type='submit' color='yellow' isLoading={isLoading} error={error} />
    </form>
  );
}
