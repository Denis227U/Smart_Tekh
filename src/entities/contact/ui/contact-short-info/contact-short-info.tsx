import { cn } from '@/src/shared/lib';
import s from './contact-short-info.module.scss';

export const ContactShortInfo = ({
  className,
  orientation = 'horizontal',
  children,
}: {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(s.contacts, className)}
      data-orientation={orientation}
    >
      {children}
    </div>
  );
};
