import { getCurrentUser } from '@/src/entities/user/server';
import { SignOutButton } from '@/src/features/auth';
import { auth } from '@/src/shared/config/auth';
import { ROUTES } from '@/src/shared/routes';
import { redirect } from 'next/navigation';

export default async function ProfileGeneralPage() {
  const user = await getCurrentUser();

  const session = await auth();

  if (!session) {
    redirect(ROUTES.AUTH.PAGE('signin'));
  }

  return (
    <div>
      Общие сведения:
      <div>email: {user?.email}</div>
      <div>role: {user?.role}</div>
      <div>
        {user?.avatar && <img width={80} src={user.avatar} alt='qwe' />}
      </div>
      <SignOutButton />
    </div>
  );
}
