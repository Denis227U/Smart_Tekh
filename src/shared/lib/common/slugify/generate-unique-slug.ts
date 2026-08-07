import slugify from 'slugify';

export const generateUniqueSlug = (text: string) => {
  const baseSlug = slugify(text, {
    lower: true,
    strict: true, // delete special characters (e.g., $, %, @)
    locale: 'ru',
    trim: true,
  });

  const randomSuffix = Math.random().toString(36).substring(2, 6);
  return `${baseSlug}-${randomSuffix}`;
};
