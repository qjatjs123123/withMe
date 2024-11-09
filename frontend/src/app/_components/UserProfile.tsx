// src/app/_components/UserProfile.tsx
import Image from 'next/image';
import { cookies } from 'next/headers';

export default async function UserProfile() {
  const cookieStore = cookies();
  const userData = (await cookieStore).get('userData')?.value;
  const user = JSON.parse(userData);

  return (
    <button>
      <Image alt="User profile image" src={user.image_url} width={52} height={52} className="rounded-full" />
    </button>
  );
}
