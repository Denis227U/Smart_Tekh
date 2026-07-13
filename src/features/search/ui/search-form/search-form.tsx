'use client';

import { SubmitEvent } from 'react';
import { Button, Field } from '@/src/shared/ui/client';
import { Icon } from '@/src/shared/ui/common';
import s from './search-form.module.scss';

export const SearchForm = () => {
  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('mobileSearchQuery') as string;

    console.log('From SearchForm:::', { query });
  };

  return (
    <form
      action='/search'
      method='get'
      className={s.form}
      onSubmit={handleSubmit}
    >
      <Field
        id='mobileSearchQuery'
        name='mobileSearchQuery'
        label='Введите запрос'
        placeholder='Гироскутер Smart Balance'
        isVisibleLabel={false}
      />
      <Button
        type='submit'
        title='Поиск товара'
        aria-label='Поиск товара'
      >
        <Icon name='Search' />
      </Button>
    </form>
  );
};
