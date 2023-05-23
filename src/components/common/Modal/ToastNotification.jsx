import styles from './ToastNotification.module.css';

export default function ToastNotification({ message }) {
  return <aside className={styles.toast}>{message}</aside>;
}
