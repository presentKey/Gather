import styles from './Symbole.module.css';
import { HiOutlineCurrencyDollar } from 'react-icons/hi';

export default function Symbole({ large }) {
  return <HiOutlineCurrencyDollar className={`${styles.icon} ${large && styles.large}`} />;
}
