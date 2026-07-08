import { SignOutButton } from '@/src/features/auth';
import { getCurrentUser } from '@/src/entities/user/server';

export async function TemporaryUserProfile() {
  const user = await getCurrentUser();

  if (!user) {
    return <div>Загрузка или доступ запрещен...</div>;
  }

  return (
    <div>
      Общие сведения:
      <div>email: {user.email}</div>
      <div>role: {user.role}</div>
      <div>name: {user.name}</div>
      <div>
        {user.avatar && (
          <img
            width={80}
            src={user.avatar}
            alt='avatar'
          />
        )}
      </div>
      <SignOutButton />
    </div>
  );
}
