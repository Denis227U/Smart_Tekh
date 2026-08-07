import { Container, Heading } from '@/src/shared/ui/common';
import type { ReactNode } from 'react';
import s from './page-header.module.scss';

export const PageHeader = ({
  title,
  breadcrumbs,
}: {
  title?: ReactNode;
  breadcrumbs?: ReactNode;
}) => {
  return (
    <Container className={s.container}>
      {breadcrumbs && <div className={s.breadcrumbs}>breadcrumbs</div>}
      {title && (
        <Heading
          tag='h1'
          variant='h1'
        >
          {title}
        </Heading>
      )}
    </Container>
  );
};
