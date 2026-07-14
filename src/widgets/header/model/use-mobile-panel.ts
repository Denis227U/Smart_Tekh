import { useCallback, useEffect, useRef, useState } from 'react';
import { getFocusableChildren } from '@/src/shared/lib/client';

export const useMobilePanel = ({
  styles: s,
}: {
  styles: Record<string, string>;
}) => {
  const [activePanelId, setActivePanelId] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState('Меню');
  const [isNavHidden, setIsNavHidden] = useState(false);

  const modalRef = useRef<HTMLDialogElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const lastFocusedTrigger = useRef<HTMLElement | null>(null);
  const lastScrollTop = useRef(0);
  const transitionEndCleanup = useRef<() => void>(undefined);
  const isOpen = activePanelId !== null;

  // Managing the modal window
  useEffect(() => {
    const modal = modalRef.current;
    const backdrop = backdropRef.current;
    if (!modal || !backdrop) return;

    if (isOpen) {
      // Cancel previous close transitionend
      transitionEndCleanup.current?.();
      transitionEndCleanup.current = undefined;

      modal.show();

      requestAnimationFrame(() => {
        modal.classList.add(s.active);
        backdrop.classList.add(s.active);
        document.documentElement.classList.add('is-lock');
      });
    } else {
      modal.classList.remove(s.active);
      backdrop.classList.remove(s.active);
      document.documentElement.classList.remove('is-lock');

      const onTransitionEnd = (e: TransitionEvent) => {
        if (e.target !== modal) return;
        modal.close();
        modal.removeEventListener('transitionend', onTransitionEnd);
        transitionEndCleanup.current = undefined;
      };
      modal.addEventListener('transitionend', onTransitionEnd);
      transitionEndCleanup.current = () => {
        modal.removeEventListener('transitionend', onTransitionEnd);
      };
    }
  }, [isOpen, s.active]);

  // Cleanup on unmount
  useEffect(() => {
    const modal = modalRef.current;
    return () => {
      transitionEndCleanup.current?.();
      if (modal?.open) modal.close();
      document.documentElement.classList.remove('is-lock');
    };
  }, []);

  // Handle trigger clicks
  const handleTriggerClick = useCallback(
    (triggerId?: string, title?: string) => {
      setIsNavHidden(false);

      // Saving the trigger element to restore focus
      const button = triggerId
        ? (triggerRefs.current.get(triggerId) ??
          modalRef.current?.ownerDocument.querySelector<HTMLButtonElement>(
            `[data-panel-trigger="${triggerId}"]`,
          ))
        : null;
      if (button) lastFocusedTrigger.current = button;

      setActivePanelId((prev) =>
        prev === triggerId ? null : (triggerId ?? null),
      );
      setModalTitle(title || 'Меню');
    },
    [],
  );

  // Keyboard navigation and focus trap
  useEffect(() => {
    if (!isOpen) return;
    const modal = modalRef.current;
    if (!modal) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Esc – close
      if (e.key === 'Escape') {
        e.preventDefault();
        setActivePanelId(null);
        return;
      }

      // Left/Right arrows – switch panels without moving focus
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        const buttons = Array.from(
          document.querySelectorAll<HTMLButtonElement>('[data-panel-trigger]'),
        );
        if (buttons.length === 0) return;
        const currentIndex = buttons.findIndex(
          (btn) => btn === lastFocusedTrigger.current,
        );
        const direction = e.key === 'ArrowRight' ? 1 : -1;
        const nextIndex =
          (currentIndex + direction + buttons.length) % buttons.length;
        const nextButton = buttons[nextIndex];
        lastFocusedTrigger.current = nextButton; // Saving for focus restoration after closing
        const nextId = nextButton.dataset.panelTrigger;
        setActivePanelId(nextId ?? null);
        setModalTitle(nextButton.textContent || 'Меню');
        return;
      }

      // Tab – focus trap inside the dialog
      if (e.key === 'Tab') {
        const focusableElements = Array.from(getFocusableChildren(modal) ?? []);

        if (focusableElements?.length === 0) return;

        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        const activeElement = document.activeElement;

        // Return focus to the first element if it leaves the dialog
        if (!modal.contains(activeElement)) {
          e.preventDefault();
          firstFocusable.focus();
          return;
        }

        if (e.shiftKey) {
          if (activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          }
        } else {
          if (activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus close button on panel change/open
  useEffect(() => {
    if (isOpen) {
      // Ensures DOM is updated before focusing
      const raf = requestAnimationFrame(() => {
        closeBtnRef.current?.focus();
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [activePanelId, isOpen]);

  // Hide mobile panel on scroll
  useEffect(() => {
    if (isOpen) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.scrollY;
          const isScrollingDown = currentScroll > lastScrollTop.current;
          const shouldHide = isScrollingDown && currentScroll > 700;
          setIsNavHidden(shouldHide);
          lastScrollTop.current = Math.max(0, currentScroll);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  const handleCloseModalOnLinkClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const link = target.closest('a');
    if (link?.href) {
      setActivePanelId(null);
    }
  };

  return {
    activePanelId,
    modalTitle,
    isNavHidden,
    modalRef,
    backdropRef,
    closeBtnRef,
    triggerRefs,
    lastFocusedTrigger,
    handleTriggerClick,
    setActivePanelId,
    handleCloseModalOnLinkClick,
  };
};
