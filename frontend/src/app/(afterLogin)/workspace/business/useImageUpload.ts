import { useState } from "react";
import axios from '@/util/axiosConfigClient';
import { API_URL } from "@/util/constants";

const useImageUpload = (repoUrl) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          setSelectedImage(file);
          return await handleUpload(file);
        }
        return null;
    };

    const handleUpload = async (file) => {
        if (!file) {
          alert('업로드할 이미지를 선택해주세요.');
          return;
        }
    
        const formData = new FormData();
        formData.append('image', file);
        formData.append('repository_url', repoUrl);
    
        try {
          const response = await axios.post(`${API_URL.IMAGE_UPLOAD}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
    
          console.log('이미지 업로드 성공:', response.data);
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
}

export default useImageUpload;
