import { useState } from 'react';
import CreateBtn from './CreateBtn';
import NoImage from './NoImage';
import axios from '@/util/axiosConfigClient';
import Image from 'next/image';
import { useGlobalState } from '../../_components/RepoModalProvider';
import useImageUpload from '@/app/(afterLogin)/workspace/business/useImageUpload';

export default function CreateImage() {
  const { curRepo } = useGlobalState();
  const { selectedImage, handleImageChange } = useImageUpload(curRepo.current.repoUrl);

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
        <CreateBtn />
      </div>
    </div>
  );
}
