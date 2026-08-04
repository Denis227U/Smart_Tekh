import { cn } from '@/src/shared/lib';
import { Icon } from '@/src/shared/ui/common';
import { useAccordionContext } from './accordion-context';
import s from './accordion.module.scss';

interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  itemValue?: string;
  triggerId?: string;
  contentId?: string;
  children: React.ReactNode;
}

export function Trigger({
  itemValue,
  triggerId,
  contentId,
  className,
  children,
  ...props
}: AccordionTriggerProps) {
  const { openItems, toggleItem } = useAccordionContext();

  if (!itemValue || !triggerId || !contentId) {
    throw new Error(
      'AccordionTrigger must be rendered inside an AccordionItem',
    );
  }

  const isOpen = openItems.includes(itemValue);

  return (
    <button
      id={triggerId}
      type='button'
      aria-expanded={isOpen}
      aria-controls={contentId}
      onClick={() => toggleItem(itemValue)}
      className={cn(s.trigger, className)}
      data-state={isOpen ? 'open' : 'closed'}
      {...props}
    >
      <span>{children}</span>

      <Icon
        name='ArrowRight'
        width={13}
        height={8}
        aria-hidden='true'
      />
    </button>
  );
}
