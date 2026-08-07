import { createContext, useContext } from 'react';

export interface AccordionContextType {
  type: 'single' | 'multiple';
  openItems: string[];
  toggleItem: (value: string) => void;
}

export const AccordionContext = createContext<AccordionContextType | null>(
  null,
);

export function useAccordionContext() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error(
      'Accordion compound components must be used within an <Accordion>',
    );
  }
  return context;
}
