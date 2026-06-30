export const ROUTES = {
  MAIN: '/',
  AUTH: {
    MODAL: (mode: 'signin' | 'register') => `/auth-modal?mode=${mode}`,
    PAGE: (mode: 'signin' | 'register') => `/auth?mode=${mode}`,
  },
  PROFILE: {
    INDEX: '/profile',
    GENERAL: '/profile/general',
  },
};
