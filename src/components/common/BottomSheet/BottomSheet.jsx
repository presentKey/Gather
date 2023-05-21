import styles from './BottomSheet.module.css';
import Button from '../Button/Button';
import Body from './Body/Body';
import Header from './Header/Header';
import { BsPlusCircle } from 'react-icons/bs';
import { useEffect, useRef } from 'react';
import { throttle } from 'lodash';
import { BottomSheetProvider } from '../../../context/BottomSheetContext';
import useSheetHeight from '../../../recoil/BottomSheet/useSheetHeight';

export default function BottomSheet({ children }) {
  const { height } = useSheetHeight();
  const screenWidthRef = useRef(window.innerWidth);
  const asideRef = useRef();

  const resizeThrottle = throttle(() => {
    screenWidthRef.current = window.innerWidth;
    translate3d(asideRef, screenWidthRef.current, height);
  }, 700);

  useEffect(() => {
    window.addEventListener('resize', resizeThrottle);
    translate3d(asideRef, screenWidthRef.current, height);
    asideRef.current.style.bottom = `-${height}px`;

    return () => window.removeEventListener('resize', resizeThrottle);
  }, [height, resizeThrottle]);

  return (
    <BottomSheetProvider>
      <aside className={styles.sheet} ref={asideRef}>
        <BsPlusCircle className={styles.icon} />
        {children}
      </aside>
    </BottomSheetProvider>
  );
}

BottomSheet.Header = Header;
BottomSheet.Body = Body;
BottomSheet.Button = Button;

function translate3d(ref, screenWidth, height) {
  ref.current.style.transform = `translate3d(${
    screenWidth >= 768 ? '-50%' : '0'
  }, -${height}px, 0)`;
}
