export const CATEGORIES_MOCK = [
  {
    label: 'Гироскутеры',
    slug: 'giroskutery',
    imageSrc: '/github-icon.svg',
  },
  {
    label: 'Электросамокаты',
    slug: 'elektrosamokaty',
    imageSrc: '/github-icon.svg',
  },
  {
    label: 'Моноколеса',
    slug: 'monokolesa',
    imageSrc: '/github-icon.svg',
  },
  {
    label: 'Сигвеи и мини-сигвеи',
    slug: 'sigvei-i-mini-sigvei',
    imageSrc: '/github-icon.svg',
  },
  {
    label: 'Электроскутеры',
    slug: 'elektroskutery',
    imageSrc: '/github-icon.svg',
  },
  {
    label: 'Электровелосипеды',
    slug: 'elektrovelosipedy',
    imageSrc: '/github-icon.svg',
  },
  {
    label: 'Электроскейты',
    slug: 'elektroskeity',
    imageSrc: '/github-icon.svg',
  },
  {
    label: 'Электромобили',
    slug: 'elektromobili',
    imageSrc: '/github-icon.svg',
  },
  {
    label: 'Аксессуары',
    slug: 'aksessuary',
    imageSrc: '/github-icon.svg',
  },
  {
    label: 'Умные игрушки',
    slug: 'umnye-igruski',
    imageSrc: '/github-icon.svg',
  },
  {
    label: 'Smart Watch',
    slug: 'smart-watch',
    imageSrc: '/github-icon.svg',
  },
] as const;

export type CategoryMock = (typeof CATEGORIES_MOCK)[number];
