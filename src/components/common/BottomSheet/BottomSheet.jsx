import styles from './BottomSheet.module.css';
import Button from '../Button/Button';
import Body from './Body/Body';
import Header from './Header/Header';
import { BsPlusCircle } from 'react-icons/bs';
import { useEffect, useMemo, useRef, useState } from 'react';
import { throttle } from 'lodash';
import { BottomSheetProvider } from '../../../context/BottomSheetContext';
import useSheetHeight from '../../../recoil/BottomSheet/useSheetHeight';

export default function BottomSheet({ children }) {
  const { height } = useSheetHeight();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const resizeThrottle = useRef(throttle(() => setScreenWidth(window.innerWidth), 700));
  const style = useMemo(
    () => ({
      transform: `translate3d(${screenWidth >= 768 ? '-50%' : '0'}, -${height}px, 0)`,
      bottom: `-${height}px`,
    }),
    [height, screenWidth]
  );
  useEffect(() => {
    window.addEventListener('resize', resizeThrottle.current);
    return () => window.removeEventListener('resize', resizeThrottle.current);
  }, []);

  return (
    <BottomSheetProvider>
      <aside className={styles.sheet} style={style}>
        <BsPlusCircle className={styles.icon} />
        {children}
      </aside>
    </BottomSheetProvider>
  );
}

BottomSheet.Header = Header;
BottomSheet.Body = Body;
BottomSheet.Button = Button;
