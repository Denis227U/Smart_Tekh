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
