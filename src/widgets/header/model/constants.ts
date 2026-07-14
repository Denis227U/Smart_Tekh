import { PanelButton } from './types';

export const PANEL_BUTTONS: PanelButton[] = [
  { title: 'Главная', iconName: 'Home', href: '/' },
  { title: 'Каталог', iconName: 'Catalog', triggerId: 'catalog' },
  { title: 'Корзина', iconName: 'Cart', href: '/cart' },
  { title: 'Поиск', iconName: 'Search', triggerId: 'search' },
  { title: 'Ещё', iconName: 'More', triggerId: 'more' },
];
