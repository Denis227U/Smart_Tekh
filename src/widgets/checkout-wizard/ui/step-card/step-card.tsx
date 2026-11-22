import { PropsWithChildren, ReactNode } from 'react';
import { cn } from '@/src/shared/lib';
import { Button } from '@/src/shared/ui/client';
import { Heading } from '@/src/shared/ui/common';
import s from './step-card.module.scss';

export const StepCard = ({
  number,
  title,
  isActive,
  isUnlocked = true,
  onEdit,
  previewContent,
  onNext,
  nextBtnText = 'Далее',
  isNextDisabled = false,
  children,
}: PropsWithChildren<{
  number: number;
  title: string;
  isActive: boolean;
  isUnlocked?: boolean;
  onEdit?: () => void;
  previewContent?: ReactNode;
  onNext?: () => void;
  nextBtnText?: string;
  isNextDisabled?: boolean;
}>) => {
  // Locked mode: Step is not yet accessible to the user
  if (!isUnlocked) {
    return (
      <section className={s.step}>
        <Heading
          id={`checkout-step-${number}`}
          tag='h2'
          variant='h3'
          className={cn(s.title, s.titleLocked)}
        >
          {number}. {title}
        </Heading>
      </section>
    );
  }

  // Review mode: Step is completed and collapsed
  if (!isActive) {
    return (
      <section className={s.step}>
        <Heading
          id={`checkout-step-${number}`}
          tag='h2'
          variant='h3'
          className={s.title}
        >
          {number}. {title}
        </Heading>

        <div className={s.prevStepInner}>
          {previewContent && previewContent}

          {onEdit && (
            <Button
              type='button'
              variant='outline'
              className={s.editBtn}
              aria-label={`Редактировать ${title}`}
              onClick={onEdit}
            >
              Изменить
            </Button>
          )}
        </div>
      </section>
    );
  }

  // Active mode: Full form is displayed
  return (
    <div className={s.stepWrapper}>
      <section className={s.step}>
        <Heading
          id={`checkout-step-${number}`}
          tag='h2'
          variant='h3'
          className={s.title}
        >
          {number}. {title}
        </Heading>

        <div>{children}</div>
      </section>

      {onNext && (
        <Button
          type='button'
          variant='main'
          className={s.nextBtn}
          aria-label={`Перейти к следующему шагу после "${title}"`}
          disabled={isNextDisabled}
          onClick={onNext}
        >
          {nextBtnText}
        </Button>
      )}
    </div>
  );
};
