import styles from './Body.module.css';
import Symbole from '../../icons/Symbole';
import { useBottomSheet } from '../../../../context/BottomSheetContext';
import OverlayPortal from '../../Overlay/OverlayPortal';
import Overlay from '../../Overlay/Overlay';
import { useEffect, useRef } from 'react';
import ClassCreate from './ClassCreate/ClassCreate';
import ClassAttend from './ClassAttend/ClassAttend';
import Transfer from './Transfer/Transfer';
import useSheetHeight from '../../../../recoil/BottomSheet/useSheetHeight';

export default function Body({ children }) {
  const { toggle, handleToggle } = useBottomSheet();
  const { setSheetHeight } = useSheetHeight();
  const bodyRef = useRef();
  useEffect(
    () => (toggle ? setSheetHeight(bodyRef.current?.offsetHeight) : setSheetHeight(0)),
    [toggle]
  );

  if (!toggle) return;
  return (
    <div className={styles.body} ref={bodyRef}>
      {children}
      <div className={styles.icon}>
        <Symbole responsive />
      </div>
      {toggle && (
        <OverlayPortal>
          <Overlay onClose={() => handleToggle(!toggle)} />
        </OverlayPortal>
      )}
    </div>
  );
}

Body.ClassCreate = ClassCreate;
Body.ClassAttend = ClassAttend;
Body.Transfer = Transfer;
