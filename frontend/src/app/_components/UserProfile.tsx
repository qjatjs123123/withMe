import Image from 'next/image';

export default function UserProfile({ image_url }) {
  return <Image alt="" src={image_url} width={40} height={40} className="rounded-full" />;
}
