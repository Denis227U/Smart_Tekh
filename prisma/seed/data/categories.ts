import { Prisma } from '@/src/shared/api/prisma/generated/client';

type CategorySeedData = Prisma.CategoryCreateInput;

export const categories: CategorySeedData[] = [
  {
    name: 'Электросамокаты',
    slug: 'electrosamokati',
    icon: 'elektrosamokaty.svg',
    sortOrder: 2,
  },
  {
    name: 'Электровелосипеды',
    slug: 'electrovelosipedi',
    icon: 'elektrovelosipedy.svg',
    sortOrder: 6,
  },
  {
    name: 'Умные игрушки',
    slug: 'unnie-igrushki',
    icon: 'umnye-igruski.svg',
    sortOrder: 10,
  },
  {
    name: 'Ноутбуки',
    slug: 'noutbuki',
    icon: 'noutbuki.svg',
    sortOrder: 12,
  },
  {
    name: 'Умные часы',
    slug: 'unnie-chasi',
    icon: 'smart-watch.svg',
    sortOrder: 11,
  },
  {
    name: 'Электроскутеры',
    slug: 'electroskuteri',
    icon: 'elektroskutery.svg',
    sortOrder: 5,
  },
  {
    name: 'Сигвеи и мини-сигвеи',
    slug: 'sigvei-i-mini-sigvei',
    icon: 'sigvei.svg',
    sortOrder: 4,
  },
  {
    name: 'Аксессуары',
    slug: 'aksessuary',
    icon: 'aksessuary.svg',
    sortOrder: 9,
  },
  {
    name: 'Электромобили',
    slug: 'electromobili',
    icon: 'elektromobili.svg',
    sortOrder: 8,
  },
  {
    name: 'Моноколеса',
    slug: 'monokolesa',
    icon: 'monokolesa.svg',
    sortOrder: 3,
  },
  {
    name: 'Гироскутеры',
    slug: 'giroskuteri',
    icon: 'giroskutery.svg',
    sortOrder: 1,
  },
  {
    name: 'Электроскейты',
    slug: 'elektroskejty',
    icon: 'elektroskeity.svg',
    sortOrder: 7,
  },
];
