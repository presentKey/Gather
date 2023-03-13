import { createPortal } from 'react-dom';

export default function OverlayPortal({ children }) {
  const domNode = document.querySelector('#overlay-root');

  return createPortal(children, domNode);
}
