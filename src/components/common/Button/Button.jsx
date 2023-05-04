import { useBottomSheet } from '../../../context/BottomSheetContext';
import styles from './Button.module.css';

export default function Button({ text, type }) {
  const { toggle, setToggle } = useBottomSheet();
  const handleClick = () => (toggle === type ? setToggle(null) : setToggle(type));

  return (
    <button
      className={`${styles.button} ${toggle === type && styles['is-active']}`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}
