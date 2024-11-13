import { useState } from 'react';
import axios from '@/util/axiosConfigClient';
import { API_URL } from '@/util/constants';
import { useGlobalState } from '../../_components/RepoModalProvider';
import useErrorHandler from './useErrorHandler';

const useImageUpload = (repoUrl, curRepo) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { handlerMessage } = useErrorHandler();

  const invalidCheck = async () => {
    if (!curRepo.current || !curRepo.current.id) {
      await handlerMessage('제대로 선택해주세요');
      return false;
    }
    return true;
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!(await invalidCheck())) return;
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const url = await handleUpload(file);
      curRepo.current.thumbnail = url;
    }
    return null;
  };

  const handleUpload = async (file) => {
    if (!file) {
      await handlerMessage('제대로 선택해주세요');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('repository_url', repoUrl);

    try {
      const response = await axios.post(`${API_URL.UPLOAD_THUMBNAIL}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data; // 성공 시 업로드 결과 반환
    } catch (err) {
      alert('이미지 업로드 실패');
      throw err; // 에러 발생 시 throw
    }
  };

  return {
    selectedImage,
    setSelectedImage,
    handleImageChange,
    handleUpload,
  };
};

export default useImageUpload;
