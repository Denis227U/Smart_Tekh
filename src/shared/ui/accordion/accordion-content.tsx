import { useEffect, useRef, useState } from 'react';
import { cn } from '@/src/shared/lib';
import { useAccordionContext } from './accordion-context';
import s from './accordion.module.scss';

interface AccordionContentProps {
  itemValue?: string;
  triggerId?: string;
  contentId?: string;
  className?: string;
  children: React.ReactNode;
}

export const Content = ({
  itemValue,
  triggerId,
  contentId,
  className,
  children,
}: AccordionContentProps) => {
  const { openItems } = useAccordionContext();
  const isOpen = itemValue ? openItems.includes(itemValue) : false;
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<number>(0);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const updateHeight = () => {
      if (isOpen) {
        const scrollHeight = el.scrollHeight;
        setMaxHeight(scrollHeight);
      } else {
        setMaxHeight(0);
      }
    };

    updateHeight();

    const observer = new ResizeObserver(() => {
      if (isOpen) {
        setMaxHeight(el.scrollHeight);
      }
    });
    observer.observe(el);

    return () => observer.disconnect();
  }, [isOpen, children]);

  if (!itemValue || !triggerId || !contentId) {
    throw new Error(
      'AccordionContent must be rendered inside an AccordionItem',
    );
  }

  return (
    <div
      ref={contentRef}
      id={contentId}
      className={cn(s.content, className)}
      role='region'
      aria-labelledby={triggerId}
      aria-hidden={!isOpen || undefined}
      style={{
        maxHeight: `${maxHeight}px`,
        overflow: 'hidden',
        transition: 'max-height 0.2s ease',
      }}
    >
      {children}
    </div>
  );
};
