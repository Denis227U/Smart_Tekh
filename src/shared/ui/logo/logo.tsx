import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/src/shared/lib';
import s from './logo.module.scss';

export const Logo = ({
  className,
  loading = 'lazy',
}: {
  className?: string;
  loading?: 'eager' | 'lazy';
}) => {
  const title = 'На главную страницу';

  return (
    <Link
      className={cn(s.logo, className)}
      href='/'
      title={title}
      aria-label={title}
    >
      <Image
        src='/logo.svg'
        alt=''
        fill
        unoptimized
        loading={loading}
      />
    </Link>
  );
};
