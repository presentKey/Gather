import styles from './Form.module.css';
import Symbole from '../../icons/Symbole';

export default function Form({ children }) {
  return (
    <div className={styles.container}>
      <form className={styles.form}>{children}</form>
      <div className={styles.icon}>
        <Symbole large />
      </div>
    </div>
  );
}
