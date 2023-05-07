import { useBottomSheet } from '../../../context/BottomSheetContext';
import styles from './Button.module.css';

export default function Button({ text, type, distinct, isLoading, error }) {
  const { toggle, handleToggle } = useBottomSheet();
  const handleClick = () => {
    if (type !== 'button') return;
    toggle === distinct ? handleToggle(null) : handleToggle(distinct);
  };

  return (
    <button
      className={`${styles.button} ${toggle === distinct && styles['is-active']} ${
        error && styles['is-error']
      }`}
      type={type}
      onClick={handleClick}
      disabled={isLoading}
    >
      {text}
    </button>
  );
}
