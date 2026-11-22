'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Ref } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { PaymentMethodCode } from '@/src/shared/api/enums';
import { Select } from '@/src/shared/ui/client';
import { useSetCheckoutPaymentData } from '../../model/actions';
import { PAYMENT_METHOD_OPTIONS } from '../../model/constants';
import { paymentFormSchema } from '../../model/payment-schema';
import { useCheckoutPayment } from '../../model/selectors';
import type { PaymentFormSchemaInput } from '../../model/types';
import s from './payment-form.module.scss';

export const PaymentForm = ({
  onValidSubmit,
  ref,
}: {
  onValidSubmit: () => void;
  ref: Ref<HTMLButtonElement>;
}) => {
  const payment = useCheckoutPayment();
  const setPaymentData = useSetCheckoutPaymentData();

  const { control, handleSubmit } = useForm<PaymentFormSchemaInput>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      paymentMethod: payment?.paymentMethod || PaymentMethodCode.CARD_ONLINE,
    },
    mode: 'onBlur',
  });

  const onSubmit = (data: PaymentFormSchemaInput) => {
    setPaymentData(data);
    onValidSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={s.form}
    >
      <div className={s.body}>
        <Controller
          name='paymentMethod'
          control={control}
          render={({ field, fieldState }) => (
            <Select
              options={PAYMENT_METHOD_OPTIONS}
              value={field.value}
              onChange={field.onChange}
              error={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </div>

      {/* Hidden button to submit form programmatically via ref */}
      <button
        type='submit'
        ref={ref}
        className='visually-hidden'
        aria-hidden='true'
      />
    </form>
  );
};
