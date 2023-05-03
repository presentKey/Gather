import styles from './BottomSheet.module.css';
import Button from '../Button/Button';
import Input from '../input/Input';
import Form from './Form/Form';
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
BottomSheet.Form = Form;
BottomSheet.Button = Button;
BottomSheet.Input = Input;
