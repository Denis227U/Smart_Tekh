import { RefObject, useCallback, useRef, useState } from 'react';

export const useModalTransition = ({
  dialogRef,
  cb,
}: {
  dialogRef: RefObject<HTMLDialogElement | null>;
  cb: VoidFunction;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const closingTimerRef = useRef<number | null>(null);

  const startAnimation = useCallback(
    () =>
      requestAnimationFrame(() => {
        setIsOpen(true);
      }),
    [],
  );

  const clearAnimation = useCallback(() => {
    if (closingTimerRef.current) clearTimeout(closingTimerRef.current);
  }, []);

  const handleTransitionClose = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
    setIsOpen(false);

    const dialog = dialogRef.current;
    if (!dialog) return;

    const onTransitionEnd = () => {
      dialog.removeEventListener('transitionend', onTransitionEnd);
      dialog.close();
      setIsClosing(false);
      cb();
    };

    dialog.addEventListener('transitionend', onTransitionEnd);

    // Fallback if transitionend fails
    closingTimerRef.current = window.setTimeout(() => {
      dialog.removeEventListener('transitionend', onTransitionEnd);
      dialog.close();
      setIsClosing(false);
      cb();
    }, 200); // delay must match transition-duration
  }, [isClosing, cb, dialogRef]);

  return {
    isOpen,
    isClosing,
    startAnimation,
    clearAnimation,
    handleTransitionClose,
  };
};
