import Image from 'next/image';

export function Loading() {
  return (
    <div className="opacity-[0.2]">
      <Image src="https://liveblocks.io/loading.svg" alt="Loading" width={64} height={64} />
    </div>
  );
}
