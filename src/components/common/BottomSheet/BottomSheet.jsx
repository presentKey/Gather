import styles from './BottomSheet.module.css';
import Button from '../Button/Button';
import Input from '../input/Input';
import Body from './Body/Body';
import Header from './Header/Header';
import { BsPlusCircle } from 'react-icons/bs';

export default function BottomSheet({ children }) {
  return (
    <aside className={styles.sheet}>
      <BsPlusCircle className={styles.icon} />
      {children}
    </aside>
  );
}

BottomSheet.Header = Header;
BottomSheet.Body = Body;
BottomSheet.Button = Button;
BottomSheet.Input = Input;
