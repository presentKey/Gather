import styles from './css/SheetHeader.module.css';

export default function SheetHeader({ children }) {
  return <header className={styles.header}>{children}</header>;
}
