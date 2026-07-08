import { redirect } from 'next/navigation';
import { ROUTES } from '@/src/shared/routes';

export default function ProfilePage() {
  redirect(ROUTES.PROFILE.GENERAL);
}
