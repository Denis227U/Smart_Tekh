import { Prisma } from '@/src/shared/api/prisma/generated/client';

type ProductSeedData = Omit<Prisma.ProductCreateInput, 'category'> & {
  categorySlug: string;
};

export const products: ProductSeedData[] = [
  {
    title: 'Наушники блютуз беспроводные большие с микрофоном\t',
    categorySlug: 'aksessuary',
    description: 'Музыкальная полноразмерная аудиотехника tws от нашего бренда',
    price: 1410,
    rating: 4.4,
    coverImage:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSByaHVrAK_LZz8G12q8kn6S14y0S9-6g_Rog&s',
  },
  {
    title: 'Гироскутер/ гироскутер детский',
    categorySlug: 'giroskuteri',
    description: 'Новинка 2026 года',
    price: 8280,
    rating: 4.2,
    coverImage:
      'https://basket-13.wbbasket.ru/vol2042/part204265/204265456/images/c516x688/1.webp',
  },
];
