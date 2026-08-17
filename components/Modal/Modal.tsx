'use client';

import { createPortal } from 'react-dom';
import css from '../Modal/Modal.module.css';
import type React from 'react';
import { useEffect } from 'react';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={event => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className={css.modal}>
        <button type="button" className={css.closeBtn} onClick={onClose}>
          x
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLDivElement
  );
}
