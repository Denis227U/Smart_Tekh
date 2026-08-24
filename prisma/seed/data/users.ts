import { Prisma } from '@/src/shared/api/prisma/generated/client';

type UserSeedData = Prisma.UserCreateInput;

export const users: UserSeedData[] = [
  {
    email: 'admin@test.ru',
    password: '123admin',
    username: 'Admin',
    phone: '89994443322',
    avatar: 'monkey.jpg',
    role: 'ADMIN',
  },
  {
    email: 'user_1@test.ru',
    password: '123user1',
    username: 'Test User',
    phone: '89995554433',
    role: 'USER',
  },
  {
    email: 'user_2@test.ru',
    password: '123user2',
    username: 'Александр',
    phone: '89995554434',
    role: 'USER',
  },
  {
    email: 'user_3@test.ru',
    password: '123user3',
    username: 'Олег',
    phone: '89995554435',
    avatar: 'octopus.png',
    role: 'USER',
  },
  {
    email: 'user_4@test.ru',
    password: '123user4',
    username: 'Тимофей',
    phone: '89995554436',
    role: 'USER',
  },
  {
    email: 'user_5@test.ru',
    password: '123user5',
    username: 'Ольга',
    phone: '89995554437',
    role: 'USER',
  },
];
