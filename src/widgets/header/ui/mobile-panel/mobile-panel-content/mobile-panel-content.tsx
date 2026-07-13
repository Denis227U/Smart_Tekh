'use client';

import { usePathname } from 'next/navigation';
import { createPortal } from 'react-dom';
import type { CategoryDto } from '@/src/entities/category';
import { cn } from '@/src/shared/lib';
import { Button } from '@/src/shared/ui/client';
import { Heading, Icon } from '@/src/shared/ui/common';
import { PANEL_BUTTONS } from '../../../model/constants';
import { useMobilePanel } from '../../../model/use-mobile-panel';
import { MobileCategories } from './mobile-categories';
import { MobileMore } from './mobile-more';
import { MobileSearch } from './mobile-search';
import s from './mobile-panel-content.module.scss';

export const MobilePanel = ({ categories }: { categories: CategoryDto[] }) => {
  const {
    activePanelId,
    modalTitle,
    isNavHidden,
    modalRef,
    backdropRef,
    closeBtnRef,
    handleTriggerClick,
    setActivePanelId,
    handleCloseModalOnLinkClick,
  } = useMobilePanel({ styles: s });

  const pathname = usePathname();

  const panel = (
    <div className={s.mobilePanel}>
      <nav
        className={cn(s.nav, isNavHidden && s.navHidden)}
        aria-label='Мобильная панель навигации'
        onClick={handleCloseModalOnLinkClick}
      >
        <ul className={s.list}>
          {PANEL_BUTTONS.map(({ title, iconName, href, triggerId }) => {
            const isTrigger = !!triggerId;
            const isActiveTrigger = isTrigger && activePanelId === triggerId;
            const isActiveLink = pathname === href;

            return (
              <li
                className={s.item}
                key={title}
              >
                <Button
                  className={s.button}
                  {...(isTrigger
                    ? {
                        onClick: () => handleTriggerClick(triggerId, title),
                        'data-panel-trigger': triggerId,
                        'aria-haspopup': 'dialog' as const,
                        'aria-expanded': isActiveTrigger,
                        'aria-controls': 'mobile-panel-modal',
                        'data-active': isActiveTrigger ? 'trigger' : undefined,
                      }
                    : {
                        href: isActiveLink ? undefined : href,
                        'data-active': isActiveLink ? 'link' : undefined,
                      })}
                >
                  <Icon
                    name={iconName}
                    size={24}
                  />
                  <span>{title}</span>
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div
        ref={backdropRef}
        className={s.modalBackdrop}
        onClick={() => setActivePanelId(null)}
        aria-hidden='true'
      />

      <dialog
        ref={modalRef}
        id='mobile-panel-modal'
        className={s.modal}
        aria-labelledby='mobile-panel-modal-title'
      >
        <header className={s.modalHeader}>
          <Heading
            tag='h2'
            variant='h4'
          >
            {modalTitle}
          </Heading>
          <Button
            ref={closeBtnRef}
            className={s.modalClose}
            type='button'
            title='Закрыть панель'
            aria-label='Закрыть панель'
            onClick={() => setActivePanelId(null)}
            autoFocus
          >
            &times;
          </Button>
        </header>

        <div
          className={s.modalBody}
          onClick={handleCloseModalOnLinkClick}
        >
          <div
            className={cn(
              s.modalContent,
              activePanelId === 'catalog' && s.active,
            )}
            role='tabpanel'
            id='mobile-panel-catalog'
            aria-labelledby='mobile-panel-trigger-catalog'
          >
            <MobileCategories categories={categories} />
          </div>

          <div
            className={cn(
              s.modalContent,
              activePanelId === 'search' && s.active,
            )}
            role='tabpanel'
            id='mobile-panel-search'
            aria-labelledby='mobile-panel-trigger-search'
          >
            <MobileSearch />
          </div>

          <div
            className={cn(s.modalContent, activePanelId === 'more' && s.active)}
            role='tabpanel'
            id='mobile-panel-more'
            aria-labelledby='mobile-panel-trigger-more'
          >
            <MobileMore />
          </div>
        </div>
      </dialog>
    </div>
  );

  return createPortal(panel, document.body);
};
