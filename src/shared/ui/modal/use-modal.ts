import { useCallback, useEffect, useRef } from 'react';
import { useModalTransition } from '@/src/shared/ui/modal/use-modal-transition';

export const useModal = ({
  cb,
  closeBtnClassName,
}: {
  cb: VoidFunction;
  closeBtnClassName: string;
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const {
    isOpen,
    isClosing,
    startAnimation,
    clearAnimation,
    handleTransitionClose,
  } = useModalTransition({ dialogRef, cb });

  // Scroll lock
  useEffect(() => {
    document.body.classList.add('modal-open');

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  // Opens on mount and closes on unmount
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (dialog.open) {
      dialog.close();
    }

    dialog.showModal();
    startAnimation();

    // Set focus to the close button or dialog (A11y)
    const closeBtn = dialog.querySelector(
      `.${closeBtnClassName}`,
    ) as HTMLElement | null;
    if (closeBtn) {
      closeBtn.focus({ preventScroll: true });
    } else {
      dialog.focus({ preventScroll: true });
    }

    return () => {
      if (dialog.open) {
        dialog.close();
      }
      clearAnimation();
    };
  }, [startAnimation, clearAnimation, closeBtnClassName]);

  // Close on Esc (A11y)
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e: Event) => {
      e.preventDefault();
      handleTransitionClose();
    };

    dialog.addEventListener('cancel', handleCancel);
    return () => dialog.removeEventListener('cancel', handleCancel);
  }, [handleTransitionClose]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === dialogRef.current) {
        handleTransitionClose();
      }
    },
    [handleTransitionClose],
  );

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return {
    dialogRef,
    isOpen,
    isClosing,
    handleContentClick,
    handleBackdropClick,
    handleTransitionClose,
  };
};
