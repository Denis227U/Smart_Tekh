'use server';

import bcrypt from 'bcryptjs';
import { prisma } from '@/src/shared/api';
import { registerSchema } from '@/src/shared/lib';
import type { RegisterState } from '../model/types';

export const registerUserAction = async (
  prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> => {
  const rawData = Object.fromEntries(formData);
  const validated = registerSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      email: rawData.email as string,
      phone: rawData.phone as string,
      username: rawData.username as string,
      success: false,
    };
  }

  const { username, phone, email, password } = validated.data;

  try {
    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail) {
      return {
        errors: { email: ['Пользователь с таким email уже существует'] },
        email,
        phone,
        username,
        success: false,
      };
    }

    if (phone) {
      const existingPhone = await prisma.user.findUnique({ where: { phone } });
      if (existingPhone) {
        return {
          errors: {
            phone: ['Пользователь с таким номером телефона уже существует'],
          },
          email,
          phone,
          username,
          success: false,
        };
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        phone,
      },
    });

    return { success: true, email };
  } catch (error) {
    console.error('Критическая ошибка на сервере при регистрации:', error);

    return {
      error: 'На сервере произошла ошибка. Пожалуйста, попробуйте позже.',
      email,
      phone,
      username,
      success: false,
    };
  }
};
