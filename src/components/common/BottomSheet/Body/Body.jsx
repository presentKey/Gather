import styles from './Body.module.css';
import Symbole from '../../icons/Symbole';
import ClassCreateForm from './ClassCreateForm/ClassCreateForm';

export default function Body({ children }) {
  return (
    <div className={styles.body}>
      {children}
      <div className={styles.icon}>
        <Symbole large />
      </div>
    </div>
  );
}

Body.ClassCreateForm = ClassCreateForm;
