import styles from './BottomSheet.module.css';
import Button from '../Button/Button';
import Input from '../input/Input';
import Body from './Body/Body';
import Header from './Header/Header';
import { BsPlusCircle } from 'react-icons/bs';
import { BottomSheetProvider } from '../../../context/BottomSheetContext';

export default function BottomSheet({ children, types }) {
  return (
    <BottomSheetProvider types={types}>
      <aside className={styles.sheet}>
        <BsPlusCircle className={styles.icon} />
        {children}
      </aside>
    </BottomSheetProvider>
  );
}

BottomSheet.Header = Header;
BottomSheet.Body = Body;
BottomSheet.Button = Button;
BottomSheet.Input = Input;
