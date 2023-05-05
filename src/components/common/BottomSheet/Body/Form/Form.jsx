import styles from './Form.module.css';
import ClassCreate from '../ClassCreate/ClassCreate';
import ClassAttend from '../ClassAttend/ClassAttend';

export default function Form({ children }) {
  return <form className={styles.form}>{children}</form>;
}

Form.ClassCreate = ClassCreate;
Form.ClassAttend = ClassAttend;
