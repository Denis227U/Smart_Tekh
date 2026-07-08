import { Suspense } from 'react';
import { Container } from '@/src/shared/ui/common';
import { AuthContent } from '../auth-content/auth-content';
import { AuthPageLoader } from '../auth-page-loader/auth-page-loader';
import s from './auth-page.module.scss';

export const AuthPage = ({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string; callbackUrl?: string }>;
}) => {
  return (
    <main>
      <Container
        tag='section'
        className={s.wrapper}
        size='sm'
      >
        <Suspense fallback={<AuthPageLoader />}>
          <AuthContent searchParams={searchParams} />
        </Suspense>
      </Container>
    </main>
  );
};
// 'use client';

// import Link from 'next/link';
// import { OAuthButtons, RegisterForm, SignInForm } from '@/src/features/auth';
// import { Container, Heading, Icon } from '@/src/shared/ui/common';
// import { ROUTES } from '@/src/shared/routes';
// import s from './auth-page.module.scss';

// export const AuthPage = ({
//   searchParams,
// }: {
//   searchParams: { mode?: string };
// }) => {
//   const mode = searchParams.mode === 'signin' ? 'signin' : 'register';

//   return (
//     <main>
//       <Container
//         tag='section'
//         className={s.wrapper}
//         size='sm'
//       >
//         <Heading
//           tag='h1'
//           variant='h1'
//           className={s.title}
//         >
//           {mode === 'signin' ? 'Вход' : 'Регистрация'}

//           <Icon
//             name={mode === 'signin' ? 'Lock' : 'Register'}
//             size={50}
//           />
//         </Heading>

//         {mode === 'signin' ? (
//           <>
//             <SignInForm />
//             <div className={s.oauthWrapper}>
//               <p>Или войдите через соцсети:</p>
//               <OAuthButtons />
//             </div>
//           </>
//         ) : (
//           <RegisterForm />
//         )}

//         <Link
//           href={
//             mode === 'signin'
//               ? ROUTES.AUTH.PAGE('register')
//               : ROUTES.AUTH.PAGE('signin')
//           }
//           className={s.switchBtn}
//         >
//           {mode === 'signin' ? 'Зарегистрироваться' : 'У меня уже есть аккаунт'}
//         </Link>
//       </Container>
//     </main>
//   );
// };
