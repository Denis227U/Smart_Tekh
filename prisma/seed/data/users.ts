import { Prisma } from '@/src/shared/api/prisma/generated/client';

type UserSeedData = Prisma.UserCreateInput;

export const users: UserSeedData[] = [
  {
    email: 'admin@test.ru',
    password: '123admin',
    username: 'Admin',
    phone: '89994443322',
    avatar:
      'https://shapka-youtube.ru/wp-content/uploads/2021/02/prikolnaya-avatarka-dlya-patsanov.jpg',
    role: 'ADMIN',
  },
  {
    email: 'user_1@test.ru',
    password: '123user1',
    username: 'First User',
    phone: '89995554433',
    role: 'USER',
  },
];
