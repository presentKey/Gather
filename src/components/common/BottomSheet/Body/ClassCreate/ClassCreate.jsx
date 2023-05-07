import styles from '../BottomSheetForm.module.css';
import Button from '../../../Button/Button';
import Input from '../../../Input/Input';
import { useBottomSheet } from '../../../../../context/BottomSheetContext';
import useInput from '../../../../../hooks/useInput';
import useClass from '../../../../Main/hooks/useClass';
import CheckBox from '../../../Input/CheckBox';

export default function ClassCreate({ distinct }) {
  const { toggle } = useBottomSheet();
  const [info, handleChange] = useInput();
  const { isLoading, error, handleSubmit } = useClass();

  if (toggle !== distinct) return;
  return (
    <form className={styles.form} onSubmit={(e) => handleSubmit(e, info, distinct)}>
      <CheckBox
        type='checkbox'
        name='allowAnonymouse'
        text='모임 구성원으로 게스트 유저 허용'
        onChange={handleChange}
      />
      <Input type='text' name='title' text='모임 이름' value={info} onChange={handleChange} />
      <Input type='text' name='bank' text='은행' value={info} onChange={handleChange} />
      <Input type='number' name='number' text='계좌번호' value={info} onChange={handleChange} />
      <Button text='모임 생성!' type='submit' isLoading={isLoading} error={error} />
    </form>
  );
}
