import { useState } from 'react';
import CreateBtn from './CreateBtn';
import NoImage from './NoImage';
import axios from '@/util/axiosConfigClient';
import Image from 'next/image';
import { useGlobalState } from '../../_components/RepoModalProvider';

export default function CreateImage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { curRepo } = useGlobalState();

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      handleUpload(file);
    }
  };

  const handleUpload = async (file) => {
    if (!file) {
      alert('업로드할 이미지를 선택해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('repository_url', curRepo.current.repoUrl);

    try {
      const response = await axios.post('/api/workspace/thumbnail', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('이미지 업로드 성공:', response.data);
    } catch (err) {
      alert('이미지 업로드 실패');
    }
  };
  return (
    <div className="h-[330px] pt-[20px]  flex justify-center items-center flex-col">
      <div
        className={`flex justify-center items-center flex-col h-[70%] w-full relative ${
          selectedImage ? 'bg-white' : 'bg-[#E9ECEF]'
        }`}
      >
        {selectedImage ? (
          <Image
            src={URL.createObjectURL(selectedImage)}
            alt="Selected thumbnail"
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
        ) : (
          <>
            <NoImage />
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="file-input" />
            <label
              htmlFor="file-input"
              className="p-[10px] pr-[30px] pl-[30px] mt-5 bg-[#020623] text-white font-bold rounded-lg transition duration-200 ease-in-out transform hover:bg-[#1B1F30] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#1B1F30] focus:ring-opacity-50 cursor-pointer"
            >
              썸네일 업로드
            </label>
          </>
        )}
      </div>
      <div className="h-[30%] flex flex-col justify-between">
        <div className="mt-[10px] font-bold">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2 custom-checkbox " />
            AI 이미지를 생성하시겠습니까?
          </label>
        </div>
        <CreateBtn />
      </div>
    </div>
  );
}
