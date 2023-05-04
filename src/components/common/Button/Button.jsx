import { useBottomSheet } from '../../../context/BottomSheetContext';
import styles from './Button.module.css';

export default function Button({ text, type }) {
  const { toggle, handleToggle } = useBottomSheet();
  const handleClick = () => (toggle === type ? handleToggle(null) : handleToggle(type));

  return (
    <button className={styles.button} onClick={handleClick}>
      {text}
    </button>
  );
}
