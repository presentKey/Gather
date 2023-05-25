import styles from './css/Symbole.module.css';
import { HiOutlineCurrencyDollar } from 'react-icons/hi';

export default function Symbole({ responsive }) {
  return (
    <HiOutlineCurrencyDollar className={`${styles.icon} ${responsive && styles.responsive}`} />
  );
}
