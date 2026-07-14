import { CategoryDto, CategoryItem } from '@/src/entities/category';
import { MobileMenu } from '../mobile-menu/mobile-menu';
import s from './mobile-panel-content.module.scss';

export const MobileCategories = ({
  categories,
}: {
  categories: CategoryDto[];
}) => (
  <MobileMenu ariaLabel='Меню категорий товаров'>
    {categories.map((category) => (
      <MobileMenu.Item key={category.slug}>
        <CategoryItem
          category={category}
          className={s.link}
          align='left'
        />
      </MobileMenu.Item>
    ))}
  </MobileMenu>
);
