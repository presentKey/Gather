import { useBottomSheet } from '../../../context/BottomSheetContext';
import styles from './Button.module.css';

export default function Button({ text, type, tag, color = 'white', isLoading, error }) {
  const { toggle, handleToggle } = useBottomSheet();
  const handleClick = () => {
    if (type !== 'button') return;
    toggle === tag ? handleToggle(null) : handleToggle(tag);
  };

  return (
    <button
      className={`${styles.button} ${styles[getColor(color)]} 
      ${toggle === tag && styles['is-active']} ${error && styles['is-error']}`}
      type={type}
      onClick={handleClick}
      disabled={isLoading}
    >
      {text}
    </button>
  );
}

function getColor(color) {
  switch (color) {
    case 'red':
      return 'red';
    case 'blue':
      return 'blue';
    case 'yellow':
      return 'yellow';
    default:
      return 'white';
  }
}
