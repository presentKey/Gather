import { useRecoilState } from 'recoil';
import { sheetHeight } from './atoms';

export default function useSheetHeight() {
  const [height, setHeight] = useRecoilState(sheetHeight);
  const setSheetHeight = (height) => setHeight(height);

  return { height, setSheetHeight };
}
