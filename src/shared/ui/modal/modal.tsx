'use client';

import { type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/src/shared/lib';
import { Button } from '@/src/shared/ui/button';
import { Heading } from '@/src/shared/ui/heading';
import { useModal } from './use-modal';
import s from './modal.module.scss';

export function Modal({
  children,
  onClose,
  'aria-labelledby': ariaLabelledby,
  'aria-label': ariaLabel,
  className,
  showCloseButton = true,
  closeButtonLabel,
  title,
}: {
  children: ReactNode;
  onClose: VoidFunction;
  'aria-labelledby'?: string;
  'aria-label'?: string;
  className?: string;
  showCloseButton?: boolean;
  closeButtonLabel?: string;
  title?: string;
}) {
  const {
    dialogRef,
    isOpen,
    isClosing,
    handleContentClick,
    handleBackdropClick,
    handleTransitionClose,
  } = useModal({ cb: onClose, closeBtnClassName: s.closeBtn });

  const dialogElement = (
    <dialog
      ref={dialogRef}
      className={cn(
        s.modal,
        className,
        isOpen && s.isOpen,
        isClosing && s.isClosing,
      )}
      onClick={handleBackdropClick}
      aria-modal='true'
      aria-labelledby={ariaLabelledby}
      aria-label={ariaLabel}
    >
      <div onClick={handleContentClick}>
        {showCloseButton && (
          <Button
            className={s.closeBtn}
            onClick={handleTransitionClose}
            aria-label={closeButtonLabel}
            type='button'
          >
            ✕
          </Button>
        )}

        {title && (
          <header className={s.header}>
            <Heading
              tag='h2'
              variant='h2'
              className={s.title}
              id={ariaLabelledby}
            >
              {title}
            </Heading>
          </header>
        )}

        <div className={s.body}>{children}</div>
      </div>
    </dialog>
  );

  // Outside the main flow, to fix scrolling upon opening
  return createPortal(dialogElement, document.body);
}
