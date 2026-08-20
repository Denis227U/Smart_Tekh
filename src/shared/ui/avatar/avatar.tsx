'use client';

import Image from 'next/image';
import { useState } from 'react';
import s from './avatar.module.scss';

/**
 * A generic avatar component that displays an image or falls back to a text initial.
 *
 * @example
 * // Renders the image using Next.js Image component
 * <Avatar name="Alexander" src="https://example.com" />
 *
 * @example
 * // Renders a fallback with the letter "A" if the image URL is missing or broken (error 404/500)
 * <Avatar name="Alexander" src={null} />
 */
export const Avatar = ({
  name,
  src,
  size = 50,
}: {
  name: string;
  src?: string | null;
  size?: number;
}) => {
  const [hasError, setHasError] = useState(false);

  const firstLetter = name ? name.trim().charAt(0).toUpperCase() : '?';
  const validSrc = src ? encodeURI(src) : '';
  const showImage = validSrc !== '' && !hasError;

  return (
    <div
      className={s.avatar}
      style={{ width: size, height: size }}
      aria-label={name}
    >
      {showImage ? (
        <Image
          src={validSrc}
          alt={name}
          width={size}
          height={size}
          className={s.image}
          onError={() => setHasError(true)}
          priority={false}
        />
      ) : (
        <span
          className={s.fallback}
          aria-hidden='true'
        >
          {firstLetter}
        </span>
      )}
    </div>
  );
};
