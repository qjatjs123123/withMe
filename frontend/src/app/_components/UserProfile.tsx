// src/app/_components/UserProfile.tsx
import Image from 'next/image';
import { cookies } from 'next/headers';

export default async function UserProfile() {
  const cookieStore = cookies();
  const userData = (await cookieStore).get('userData')?.value;
  const user = JSON.parse(userData);

  return <Image alt="User profile image" src={user.image_url} width={40} height={40} className="rounded-full" />;
}
