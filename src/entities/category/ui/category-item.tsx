import Image from 'next/image';
import { Button } from '@/src/shared/ui/client';
import { CategoryMock } from '../model/constants';

export const CategoryItem = ({
  category,
  className,
}: {
  category: CategoryMock;
  className?: string;
}) => {
  const href = '/#';

  return (
    <Button
      href={href}
      className={className}
    >
      <Image
        src={category.imageSrc}
        alt=''
        width={32}
        height={32}
      />

      <span>{category.label}</span>
    </Button>
  );
};
