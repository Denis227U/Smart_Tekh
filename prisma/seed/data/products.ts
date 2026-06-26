import { Prisma } from '@/prisma/generated/client';

type ProductSeedData = Prisma.ProductCreateInput;

export const products: ProductSeedData[] = [
  {
    title: 'Наушники блютуз беспроводные большие с микрофоном\t',
    description: 'Музыкальная полноразмерная аудиотехника tws от нашего бренда',
    price: 1410,
    rating: 4.4,
    coverImage:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSByaHVrAK_LZz8G12q8kn6S14y0S9-6g_Rog&s',
  },
  {
    title: 'Гироскутер/ гироскутер детский',
    description: 'Новинка 2026 года',
    price: 8280,
    rating: 4.2,
    coverImage:
      'https://basket-13.wbbasket.ru/vol2042/part204265/204265456/images/c516x688/1.webp',
  },
];
