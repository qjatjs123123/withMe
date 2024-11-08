import CreateBtn from './CreateBtn';
import { useGlobalState } from '../../_components/RepoModalProvider';
import useImageUpload from '@/app/(afterLogin)/workspace/business/useImageUpload';
import ExistingRepoThumbnail from './_addModalComponent/ExistingRepoThumbnail';
import ThumbnailPreview from './_addModalComponent/ThumbnailPreview';
import UploadThumbnail from './_addModalComponent/UploadThumbnail';

export default function CreateImage() {
  const { curRepo } = useGlobalState();
  const { selectedImage, handleImageChange } = useImageUpload(curRepo.current.repoUrl);

  return (
    <div className="h-[330px] pt-[20px] flex justify-center items-center flex-col">
      <div
        className={`flex justify-center items-center flex-col h-[250px] w-full relative ${selectedImage ? 'bg-white' : 'bg-[#E9ECEF]'}`}
      >
        {curRepo.current.thumbnail ? (
          <ExistingRepoThumbnail thumbnail={curRepo.current.thumbnail} />
        ) : selectedImage ? (
          <ThumbnailPreview image={selectedImage} />
        ) : (
          <UploadThumbnail handleImageChange={handleImageChange} />
        )}
      </div>
      <div className="h-[10%] flex flex-col justify-between w-full mt-[10px]">
        <CreateBtn url={curRepo.current.thumbnail} />
      </div>
    </div>
  );
}
