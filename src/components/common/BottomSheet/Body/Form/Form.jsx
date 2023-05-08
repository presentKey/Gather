import styles from './Form.module.css';
import ClassCreateForm from '../ClassCreateForm/ClassCreateForm';
import ClassAttendForm from '../ClassAttendForm/ClassAttendForm';

export default function Form({ component }) {
  return <form className={styles.form}>{component}</form>;
}

Form.ClassCreate = ClassCreateForm;
Form.ClassAttend = ClassAttendForm;
