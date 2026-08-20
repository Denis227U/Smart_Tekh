'use client';

import { useState } from 'react';
import { useSession } from '@/src/entities/user';
import { cn } from '@/src/shared/lib';
import { Button, Modal } from '@/src/shared/ui/client';
import { Heading } from '@/src/shared/ui/common';
import { ReviewForm } from '../review-from/review-from';
import s from './add-review-trigger.module.scss';

export const AddReviewTrigger = ({
  productId,
  productSlug,
  signInTrigger,
}: {
  productId: string;
  productSlug: string;
  signInTrigger: React.ReactNode;
}) => {
  const { isAuthenticated } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {isAuthenticated ? (
        <div className={cn(s.wrapper, s.reviewBlock)}>
          <Heading
            tag='h3'
            variant='h6'
          >
            Напишите своё мнение о товаре
          </Heading>
          <p className={s.text}>Сделайте выбор других покупателей легче</p>
          <Button
            type='button'
            variant='main'
            className={s.button}
            onClick={openModal}
          >
            Написать отзыв
          </Button>
        </div>
      ) : (
        <div className={cn(s.wrapper, s.signInBlock)}>
          <p className={s.text}>
            <b>Войдите</b> в свой аккаунт
            <br />
            или <b>зарегистрируйтесь</b>
          </p>

          <div className={s.triggerWrapper}>{signInTrigger}</div>
        </div>
      )}

      {isModalOpen && (
        <Modal
          title='Ваш отзыв'
          onClose={closeModal}
        >
          <ReviewForm
            productId={productId}
            productSlug={productSlug}
            onSuccess={closeModal}
          />
        </Modal>
      )}
    </>
  );
};
