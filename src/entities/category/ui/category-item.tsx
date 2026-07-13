'use client';

import Image from 'next/image';
import { useState } from 'react';
import { getAssetUrl } from '@/src/shared/lib';
import { Button, type ButtonProps } from '@/src/shared/ui/client';
import defaultIcon from '../assets/not-icon.png';
import type { CategoryDto } from '../model/types';

type CategoryItemProps = Pick<ButtonProps, 'className' | 'align'> & {
  category: CategoryDto;
};

export const CategoryItem = ({
  category,
  className,
  align,
}: CategoryItemProps) => {
  const href = '/#';

  const [imgSrc, setImgSrc] = useState(
    category.icon ? getAssetUrl(category.icon) : defaultIcon,
  );

  return (
    <Button
      href={href}
      className={className}
      align={align}
    >
      <Image
        src={imgSrc}
        alt=''
        width={32}
        height={32}
        onError={() => setImgSrc(defaultIcon)}
        preload
      />

      <span>{category.name}</span>
    </Button>
  );
};
