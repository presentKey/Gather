import styles from './Body.module.css';
import Symbole from '../../icons/Symbole';
import ClassCreateForm from './ClassCreateForm/ClassCreateForm';
import ClassAttendForm from './ClassAttendForm/ClassAttendForm';
import { useBottomSheet } from '../../../../context/BottomSheetContext';

export default function Body({ children }) {
  const { toggle } = useBottomSheet();

  if (!toggle) return;
  return (
    <div className={styles.body}>
      {children}
      <div className={styles.icon}>
        <Symbole responsive />
      </div>
    </div>
  );
}

Body.ClassCreateForm = ClassCreateForm;
Body.ClassAttendForm = ClassAttendForm;
