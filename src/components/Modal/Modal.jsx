import { useEffect } from 'react';
import s from './Modal.module.css';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, children }) {
  useEffect(() => {
    window.addEventListener('keydown', hendleKeyDown);

    return () => {
      window.removeEventListener('keydown', hendleKeyDown);
    };
    // eslint-disable-next-line
  }, []);

  const hendleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const clickOnModal = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={s.overlay} onClick={clickOnModal}>
      <div className={s.modal}>{children}</div>
    </div>,
    modalRoot
  );
}
