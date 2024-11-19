import Image from 'next/image';

export default function ExistingRepoThumbnail({ thumbnail }) {
  return (
    <div className="flex flex-col w-full h-full bg-white justify-center">
      <Image
        src={thumbnail}
        alt="Repository thumbnail"
        width={200}
        height={300}
        objectFit="contain"
        className="rounded-lg"
        style={{ width: '100%', height: '90%', objectFit: 'contain' }}
      />
      <div className="font-bold text-[16px] text-center w-full">이미 존재하는 레포입니다.</div>
    </div>
  );
}
