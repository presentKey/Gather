import { createPortal } from 'react-dom';

export default function ModalPortal({ children }) {
  const domNode = document.querySelector('#modal-root');

  return createPortal(children, domNode);
}
