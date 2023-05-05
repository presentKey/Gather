import styles from './Body.module.css';
import Symbole from '../../icons/Symbole';
import { useBottomSheet } from '../../../../context/BottomSheetContext';
import OverlayPortal from '../../Overlay/OverlayPortal';
import Overlay from '../../Overlay/Overlay';
import { useEffect, useRef } from 'react';
import ClassCreate from './ClassCreate/ClassCreate';
import ClassAttend from './ClassAttend/ClassAttend';
import { useRecoilState } from 'recoil';
import { heightState } from '../../../../recoil/atoms/bottomSheetHeightState';

export default function Body({ children }) {
  const { toggle, setToggle } = useBottomSheet();
  const [, setHeight] = useRecoilState(heightState);
  const bodyRef = useRef();
  useEffect(() => (toggle ? setHeight(bodyRef.current?.offsetHeight) : setHeight(0)), [toggle]);

  if (!toggle) return;
  return (
    <div className={styles.body} ref={bodyRef}>
      {children}
      <div className={styles.icon}>
        <Symbole responsive />
      </div>
      {toggle && (
        <OverlayPortal>
          <Overlay onClose={() => setToggle(!toggle)} />
        </OverlayPortal>
      )}
    </div>
  );
}

Body.ClassCreate = ClassCreate;
Body.ClassAttend = ClassAttend;
