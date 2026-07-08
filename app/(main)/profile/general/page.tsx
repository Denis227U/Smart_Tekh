import { Suspense } from 'react';
import { TemporaryUserProfile } from './_temporary-user-profile';

export default function ProfileGeneralPage() {
  return (
    <Suspense fallback={<div>Загрузка профиля...</div>}>
      <TemporaryUserProfile />
    </Suspense>
  );
}
