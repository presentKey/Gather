import { AiFillPlusCircle } from 'react-icons/ai';
import Overlay from '../Overlay/Overlay';
import OverlayPortal from '../Overlay/OverlayPortal';
import styles from './BottomSheet.module.css';
import ButtonGroup from './ButtonGroup/ButtonGroup';
import { useCallback, useEffect, useRef, useState } from 'react';
import { throttle } from 'lodash';

export default function BottomSheet({
  children,
  content,
  handleContent,
  onClose,
  buttonInfo,
  height,
  setHeaderHeight,
}) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const aside = useRef(null);
  const handleResize = useCallback(
    throttle(() => {
      setScreenWidth(window.innerWidth);
      setHeaderHeight(aside.current?.offsetHeight);
    }, 700),
    []
  );

  useEffect(() => {
    setHeaderHeight(aside.current?.offsetHeight);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [screenWidth]);

  return (
    <>
      <aside
        className={styles.toast}
        style={{
          transform: `translate3d(${screenWidth >= 768 ? '-50%' : '0'}, -${height}px, 0)`,
        }}
        ref={aside}
      >
        <AiFillPlusCircle className={styles.plus} />
        <ButtonGroup content={content} handleContent={handleContent} buttonInfo={buttonInfo} />
        {children}
        {(content.create || content.participation) && (
          <OverlayPortal>
            <Overlay onClose={onClose} />
          </OverlayPortal>
        )}
      </aside>
    </>
  );
}
