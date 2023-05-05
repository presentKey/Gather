import Button from '../../../Button/Button';
import Input from '../../../input/Input';
import { useBottomSheet } from '../../../../../context/BottomSheetContext';

export default function ClassAttend({ type }) {
  const { toggle } = useBottomSheet();

  if (toggle !== type) return;
  return (
    <>
      <Input type='text' name='code' text='모임 코드' />
      <Button text='모임 참여!' />
    </>
  );
}
