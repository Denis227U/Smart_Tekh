'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';
import noPhotoSrc from '@/src/shared/assets/no-photo.png';

type SrcType = ImageProps['src'];

interface SafeImageProps extends Omit<ImageProps, 'src'> {
  src: string | null | undefined;
}

export const SafeImage = ({ src, alt, ...props }: SafeImageProps) => {
  const targetSrc = src || noPhotoSrc;

  // Храним и текущую картинку, и проп, который был на прошлом рендере
  const [imgSrc, setImgSrc] = useState<SrcType>(targetSrc);
  const [prevSrc, setPrevSrc] = useState<SrcType>(targetSrc);

  // Синхронизация прямо во время рендера
  if (targetSrc !== prevSrc) {
    setPrevSrc(targetSrc);
    setImgSrc(targetSrc);
  }

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(noPhotoSrc)}
      onLoad={(event) => {
        const img = event.currentTarget;
        // Если картинка загрузилась, но её размер 1x1 или меньше (заглушка WB)
        if (img.naturalWidth <= 1 || img.naturalHeight <= 1) {
          setImgSrc(noPhotoSrc);
        }
      }}
    />
  );
};
