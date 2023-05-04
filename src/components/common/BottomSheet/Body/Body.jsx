import styles from './Body.module.css';
import Symbole from '../../icons/Symbole';
import ClassCreateForm from './ClassCreateForm/ClassCreateForm';
import ClassAttendForm from './ClassAttendForm/ClassAttendForm';
import { useBottomSheet } from '../../../../context/BottomSheetContext';
import OverlayPortal from '../../Overlay/OverlayPortal';
import Overlay from '../../Overlay/Overlay';

export default function Body({ children }) {
  const { toggle, setToggle } = useBottomSheet();

  if (!toggle) return;
  return (
    <div className={styles.body}>
      {children}
      <div className={styles.icon}>
        <Symbole responsive />
      </div>
      {toggle && (
        <OverlayPortal>
          <Overlay onClose={() => setToggle(null)} />
        </OverlayPortal>
      )}
    </div>
  );
}

Body.ClassCreateForm = ClassCreateForm;
Body.ClassAttendForm = ClassAttendForm;
