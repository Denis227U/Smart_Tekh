'use client';

import Image from 'next/image';
import { useState } from 'react';
import { getAssetUrl } from '@/src/shared/lib';
import { Button } from '@/src/shared/ui/client';
import defaultIcon from '../assets/not-icon.png';
import type { CategoryDto } from '../model/types';

export const CategoryItem = ({
  category,
  className,
}: {
  category: CategoryDto;
  className?: string;
}) => {
  const href = '/#';

  const [imgSrc, setImgSrc] = useState(
    category.icon ? getAssetUrl(category.icon) : defaultIcon,
  );

  return (
    <Button
      href={href}
      className={className}
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
