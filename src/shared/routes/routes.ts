export const ROUTES = {
  MAIN: '/',
  AUTH: {
    MODAL: (mode: 'signin' | 'register') => `/auth-modal?mode=${mode}`,
    PAGE: (mode: 'signin' | 'register') => `/auth?mode=${mode}`,
  },
  CATEGORY: (category: string) => `/catalog/${category}`,
  PRODUCT: (category: string, product: string) =>
    `/product/${category}/${product}`,
  PROFILE: {
    INDEX: '/profile',
    GENERAL: '/profile/general',
    ORDERS: '/profile/orders',
    ORDER_DETAILS: (orderId: string) => `/profile/orders/${orderId}`,
  },
  CHECKOUT: (mode?: 'buy-now') =>
    mode ? `/checkout?mode=${mode}` : '/checkout',
};
