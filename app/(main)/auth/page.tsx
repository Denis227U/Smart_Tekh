import { OAuthButtons } from '@/src/features/auth';

export default async function AuthPageRoute() {
  return (
    <div>
      <h1>Вход в интернет-магазин</h1>
      <OAuthButtons />
    </div>
  );
}
