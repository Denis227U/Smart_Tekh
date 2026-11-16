'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Ref } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { TIMES } from '@/src/entities/order';
import { PickupSelector } from '@/src/entities/pickup-point';
import { DeliveryType } from '@/src/shared/api/enums';
import { CITY_OPTIONS } from '@/src/shared/config';
import { cn } from '@/src/shared/lib';
import { Field, FieldRadio, Select } from '@/src/shared/ui/client';
import { isCourierDelivery, isPickupDelivery } from '../../lib/type-guards';
import { useSetCheckoutDeliveryData } from '../../model/actions';
import {
  DATES,
  PICKUP_BLOCK_HEIGHT,
  RECEIVING_METHODS,
} from '../../model/constants';
import { deliveryFormSchema } from '../../model/delivery-schema';
import { useCheckoutDelivery } from '../../model/selectors';
import { usePickupPoints } from '../../model/use-pickup-points';
import { PickupPointsError } from '../pickup-points-error/pickup-points-error';
import type { DeliveryData, DeliveryFormSchemaInput } from '../../model/types';
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

  const { control, handleSubmit, setValue, getValues } =
    useForm<DeliveryFormSchemaInput>({
      resolver: zodResolver(deliveryFormSchema),
      defaultValues: getDefaultValues(),
      mode: 'onBlur',
    });

  const deliveryType = useWatch({
    control,
    name: 'deliveryType',
  });
  const city = useWatch({
    control,
    name: 'city',
  });

  const { pickupPoints, isPickupPointsLoading, errorPickupPoints, refetch } =
    usePickupPoints({ getValues, setValue, deliveryType, city });

  const onSubmit = (data: DeliveryFormSchemaInput) => {
    let deliveryDataToSave: DeliveryData = { ...data };

    // If "PICKUP" is selected, enrich the base form data for preview
    if (data.deliveryType === DeliveryType.PICKUP && data.pickupPointId) {
      const selectedPoint = pickupPoints.find(
        (p) => p.id === data.pickupPointId,
      );

      if (selectedPoint) {
        deliveryDataToSave = {
          ...data,
          pickupPointAddress: selectedPoint.address,
          pickupPointWorkingDays: selectedPoint.workingDays,
          pickupPointWorkingHours: selectedPoint.workingHours,
        };
      }
    }

    setDeliveryData(deliveryDataToSave);
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
                options={RECEIVING_METHODS}
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
            <Controller
              name='pickupPointId'
              control={control}
              render={({ field, fieldState }) => (
                <>
                  {/* Backend error handling */}
                  {errorPickupPoints ? (
                    <PickupPointsError
                      message={errorPickupPoints}
                      height={PICKUP_BLOCK_HEIGHT}
                      onRetry={refetch}
                    />
                  ) : (
                    <PickupSelector
                      points={pickupPoints}
                      value={field.value}
                      name={field.name}
                      onChange={field.onChange}
                      isLoading={isPickupPointsLoading}
                      error={Boolean(fieldState.error && !errorPickupPoints)}
                      height={PICKUP_BLOCK_HEIGHT}
                    />
                  )}

                  {/* Form validation error */}
                  {fieldState.error && !errorPickupPoints && (
                    <span className={s.errorText}>
                      {fieldState.error.message}
                    </span>
                  )}
                </>
              )}
            />
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
