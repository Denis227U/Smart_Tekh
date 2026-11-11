'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Ref } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { CITY_OPTIONS } from '@/src/entities/pickup-point';
import { DeliveryType } from '@/src/shared/api/enums';
import { cn } from '@/src/shared/lib';
import { Field, FieldRadio, Select } from '@/src/shared/ui/client';
import { isCourierDelivery, isPickupDelivery } from '../../lib/type-guards';
import { useSetCheckoutDeliveryData } from '../../model/actions';
import { DATES, RECEIVING_METHODS, TIMES } from '../../model/constants';
import { deliveryFormSchema } from '../../model/delivery-schema';
import { useCheckoutDelivery } from '../../model/selectors';
import { DeliveryFormSchemaInput } from '../../model/types';
import s from './delivery-form.module.scss';

export const DeliveryForm = ({
  onValidSubmit,
  ref,
}: {
  onValidSubmit: () => void;
  ref: Ref<HTMLButtonElement>;
}) => {
  const delivery = useCheckoutDelivery();
  const setDeliveryData = useSetCheckoutDeliveryData();

  const getDefaultValues = (): DeliveryFormSchemaInput => {
    if (isCourierDelivery(delivery)) {
      return {
        deliveryType: DeliveryType.DELIVERY,
        city: delivery.city,
        deliveryDate: delivery.deliveryDate,
        deliveryTime: delivery.deliveryTime,
        street: delivery.street,
        apartment: delivery.apartment,
        comment: delivery.comment,
      };
    }

    if (isPickupDelivery(delivery)) {
      return {
        deliveryType: DeliveryType.PICKUP,
        city: delivery.city,
        pickupPointId: delivery.pickupPointId,
      };
    }

    return {
      deliveryType: DeliveryType.DELIVERY,
      city: CITY_OPTIONS[0].value,
      deliveryDate: DATES[0].value,
      deliveryTime: TIMES[0].value,
      street: '',
      apartment: '',
      comment: '',
    };
  };

  const { control, handleSubmit } = useForm<DeliveryFormSchemaInput>({
    resolver: zodResolver(deliveryFormSchema),
    defaultValues: getDefaultValues(),
    mode: 'onBlur',
  });

  const deliveryType = useWatch({
    control,
    name: 'deliveryType',
  });

  const onSubmit = (data: DeliveryFormSchemaInput) => {
    setDeliveryData(data);
    onValidSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={s.form}
    >
      <header className={s.header}>
        <Controller
          name='city'
          control={control}
          render={({ field, fieldState }) => (
            <Select
              label='Ваш город'
              options={CITY_OPTIONS}
              value={field.value}
              onChange={field.onChange}
              error={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <fieldset className={s.methodsFieldset}>
          <legend className={s.methodsLegend}>Выберите способ получения</legend>

          <Controller
            name='deliveryType'
            control={control}
            render={({ field }) => (
              <FieldRadio
                name={field.name}
                options={RECEIVING_METHODS.map((method) =>
                  method.value === DeliveryType.PICKUP
                    ? { ...method, disabled: true }
                    : method,
                )}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </fieldset>
      </header>

      <div className={s.body}>
        {deliveryType === 'DELIVERY' && (
          <div className={cn(s.content, s.contentDelivery)}>
            <Controller
              name='deliveryDate'
              control={control}
              render={({ field, fieldState }) => (
                <Select
                  label='Дата'
                  options={DATES}
                  value={field.value}
                  onChange={field.onChange}
                  error={Boolean(fieldState.error)}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name='street'
              control={control}
              render={({ field, fieldState }) => (
                <Field
                  label='Улица, дом/корпус'
                  placeholder='Набережная Кутузова, 2'
                  value={field.value}
                  onChange={field.onChange}
                  error={Boolean(fieldState.error)}
                  helperText={fieldState.error?.message}
                  isRequired
                />
              )}
            />

            <Controller
              name='deliveryTime'
              control={control}
              render={({ field, fieldState }) => (
                <Select
                  label='Время'
                  options={TIMES}
                  value={field.value}
                  onChange={field.onChange}
                  error={Boolean(fieldState.error)}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name='apartment'
              control={control}
              render={({ field, fieldState }) => (
                <Field
                  label='Квартира'
                  placeholder='77'
                  value={field.value}
                  onChange={field.onChange}
                  error={Boolean(fieldState.error)}
                  helperText={fieldState.error?.message}
                  isRequired
                />
              )}
            />
            <Controller
              name='comment'
              control={control}
              render={({ field, fieldState }) => (
                <Field
                  label='Комментарий курьеру'
                  className={s.fieldWide}
                  placeholder='Вход со двора'
                  value={field.value}
                  onChange={field.onChange}
                  error={Boolean(fieldState.error)}
                  helperText={fieldState.error?.message}
                  multiline
                />
              )}
            />
          </div>
        )}

        {deliveryType === 'PICKUP' && (
          <div className={s.content}>
            <div>В РАЗРАБОТКЕ</div>
          </div>
        )}
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
