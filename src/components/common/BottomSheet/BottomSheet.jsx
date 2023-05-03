import Button from '../Button/Button';
import Input from '../input/Input';
import Form from './Form/Form';
import Header from './Header/Header';

export default function BottomSheet({ children }) {
  return <aside>{children}</aside>;
}

BottomSheet.Header = Header;
BottomSheet.Form = Form;
BottomSheet.Button = Button;
BottomSheet.Input = Input;
