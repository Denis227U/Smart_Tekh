'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createReviewAction } from '../api/create-review-action';
import { reviewSchema, type ReviewInput } from './review-schema';

export const useAddReviewForm = ({
  productId,
  productSlug,
  onSuccess,
}: {
  productId: string;
  productSlug: string;
  onSuccess?: () => void;
}) => {
  const [isPending, setIsPending] = useState(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<ReviewInput>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      text: '',
      rating: null as unknown as number,
    },
  });

  const onSubmit = async (data: ReviewInput) => {
    setIsPending(true);

    const formData = new FormData();
    formData.append('rating', String(data.rating));
    formData.append('text', data.text);

    const response = await createReviewAction(productId, productSlug, formData);

    if (response.success) {
      reset();
      onSuccess?.();
      return;
    }

    // Automatic server error mapping to form fields
    if (response.errors) {
      Object.entries(response.errors).forEach(([field, messages]) => {
        setError(field as keyof ReviewInput, {
          type: 'server',
          message: Array.isArray(messages)
            ? messages.join(', ')
            : String(messages),
        });
      });
    }

    // Generic server error (e.g., "Session expired")
    if (response.message) {
      setError('root.serverError', {
        type: 'server',
        message: response.message,
      });
    }
  };

  return {
    control,
    isPending,
    errors,
    onSubmit: handleSubmit(onSubmit),
  };
};
