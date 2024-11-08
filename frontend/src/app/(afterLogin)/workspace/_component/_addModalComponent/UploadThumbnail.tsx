import NoImage from '../NoImage';

export default function UploadThumbnail({ handleImageChange }) {
  return (
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
  );
}
