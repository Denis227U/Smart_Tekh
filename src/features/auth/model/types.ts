type BaseState = {
  success?: boolean;
  error?: string;
};

export type SignInState = BaseState & {
  email?: string;
  errors?: {
    email?: string[];
    password?: string[];
  };
};

export type RegisterState = BaseState & {
  email?: string;
  username?: string;
  phone?: string;
  errors?: {
    email?: string[];
    username?: string[];
    phone?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
};
