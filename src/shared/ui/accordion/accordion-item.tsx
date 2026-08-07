import {
  Children,
  cloneElement,
  isValidElement,
  useId,
  type PropsWithChildren,
} from 'react';

export const Item = ({
  value,
  className,
  children,
}: PropsWithChildren<{
  value: string;
  className?: string;
}>) => {
  const id = useId();
  const triggerId = `${id}-trigger`;
  const contentId = `${id}-content`;

  const context = {
    itemValue: value,
    triggerId,
    contentId,
  };

  return (
    <div
      className={className}
      data-accordion-item={value}
    >
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(
            child as React.ReactElement<{
              itemValue: string;
              triggerId: string;
              contentId: string;
            }>,
            context,
          );
        }
        return child;
      })}
    </div>
  );
};
