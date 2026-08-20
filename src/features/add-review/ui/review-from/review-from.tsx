'use client';

import { Controller } from 'react-hook-form';
import { useAddReviewForm } from '@/src/features/add-review/model/use-add-review-form';
import { Button, Field, Select } from '@/src/shared/ui/client';
import { RATING_OPTIONS } from '../../model/constants';
import s from './review-from.module.scss';

interface ReviewFormProps {
  productId: string;
  productSlug: string;
  onSuccess?: () => void;
}

export const ReviewForm = ({
  productId,
  productSlug,
  onSuccess,
}: ReviewFormProps) => {
  const { control, isPending, errors, onSubmit } = useAddReviewForm({
    productId,
    productSlug,
    onSuccess,
  });

  return (
    <form
      onSubmit={onSubmit}
      className={s.form}
    >
      {errors.root?.serverError && (
        <p className={s.error}>{errors.root.serverError.message}</p>
      )}

      <Controller
        name='rating'
        control={control}
        render={({
          field: { value, onChange, name },
          fieldState: { error },
        }) => (
          <Select
            name={name}
            label='Ваша оценка'
            options={RATING_OPTIONS}
            value={value}
            onChange={onChange}
            error={Boolean(error)}
            helperText={error?.message}
          />
        )}
      />

      <Controller
        name='text'
        control={control}
        render={({
          field: { value, onChange, name },
          fieldState: { error },
        }) => (
          <Field
            className={s.textArea}
            rows={7}
            name={name}
            label='Текст отзыва'
            placeholder='Товар супер!'
            value={value}
            onChange={onChange}
            error={Boolean(error)}
            helperText={error?.message}
            multiline
            isRequired
          />
        )}
      />

      <Button
        type='submit'
        variant='main-dark'
        className={s.button}
        disabled={isPending}
      >
        {isPending ? 'Отправка...' : 'Отправить отзыв'}
      </Button>
    </form>
  );
};
