import { useBottomSheet } from '../../../context/BottomSheetContext';
import styles from './Button.module.css';

export default function Button({ text, type, distinct }) {
  const { toggle, handleToggle } = useBottomSheet();
  const handleClick = () => {
    if (type !== 'button') return;
    toggle === distinct ? handleToggle(null) : handleToggle(distinct);
  };

  return (
    <button
      className={`${styles.button} ${toggle === distinct && styles['is-active']}`}
      type={type}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}
