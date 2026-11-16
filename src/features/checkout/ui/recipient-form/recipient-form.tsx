'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { useSession } from '@/src/entities/user';
import { Field, FieldCheckbox } from '@/src/shared/ui/client';
import { useSetCheckoutRecipientState } from '../../model/actions';
import { recipientFormSchema } from '../../model/recipient-schema';
import { useCheckoutRecipient } from '../../model/selectors';
import type { RecipientSchemaInput } from '../../model/types';
import s from './recipient-form.module.scss';

export const RecipientForm = () => {
  const recipient = useCheckoutRecipient();
  const setRecipientState = useSetCheckoutRecipientState();
  const { user } = useSession();

  const getDefaultValues = (): RecipientSchemaInput => {
    if (recipient) {
      return recipient;
    }

    return {
      recipientFirstname: user?.username ?? '',
      recipientLastname: '',
      recipientPhone: user?.phone ?? '',
      recipientEmail: user?.email ?? '',
      recipientNoCall: true,
    };
  };

  const {
    control,
    reset,

    formState: { isDirty },
  } = useForm<RecipientSchemaInput>({
    resolver: zodResolver(recipientFormSchema),
    defaultValues: getDefaultValues(),
    mode: 'onChange',
  });

  useEffect(() => {
    if (!recipient && user && !isDirty) {
      reset({
        recipientFirstname: user.username ?? '',
        recipientLastname: '',
        recipientPhone: user.phone ?? '',
        recipientEmail: user.email ?? '',
        recipientNoCall: true,
      });
    }
  }, [user, recipient, isDirty, reset]);

  const watchedValues = useWatch({ control });

  // Sync valid data with the Zustand store
  useEffect(() => {
    const parsed = recipientFormSchema.safeParse(watchedValues);

    if (parsed.success) {
      setRecipientState(parsed.data, true);
    } else {
      setRecipientState(null, false);
    }
  }, [watchedValues, setRecipientState]);

  return (
    <form className={s.form}>
      <div className={s.body}>
        <Controller
          name='recipientFirstname'
          control={control}
          render={({ field, fieldState }) => (
            <Field
              label='Имя'
              placeholder='Иван'
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
              isRequired
            />
          )}
        />

        <Controller
          name='recipientLastname'
          control={control}
          render={({ field, fieldState }) => (
            <Field
              label='Фамилия'
              placeholder='Иванов'
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
              isRequired
            />
          )}
        />

        <Controller
          name='recipientPhone'
          control={control}
          render={({ field, fieldState }) => (
            <Field
              label='Номер телефона'
              placeholder='+7 (9__) ___-__-__'
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
              isRequired
            />
          )}
        />

        <Controller
          name='recipientEmail'
          control={control}
          render={({ field, fieldState }) => (
            <Field
              label='Эл. почта'
              placeholder='smart@gmail.com'
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
              isRequired
            />
          )}
        />

        <Controller
          name='recipientNoCall'
          control={control}
          render={({ field: { value, ...fieldProps } }) => (
            <FieldCheckbox
              {...fieldProps}
              className={s.fieldWide}
              checked={value}
              text='Не перезванивать мне для подтверждения заказа'
            />
          )}
        />
      </div>
    </form>
  );
};
