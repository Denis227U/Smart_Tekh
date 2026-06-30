import { ROUTES } from '@/src/shared/routes';
import { redirect } from 'next/navigation';

export default function ProfilePage() {
  redirect(ROUTES.PROFILE.GENERAL);
}
