import Image from 'next/image';

export default function ThumbnailPreview({ image }) {
  return (
    <div>
      <Image
        src={URL.createObjectURL(image)}
        alt="Selected thumbnail"
        layout="fill"
        objectFit="contain"
        className="rounded-lg"
      />
    </div>
  );
}
