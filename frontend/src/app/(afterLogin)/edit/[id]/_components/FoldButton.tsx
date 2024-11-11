import { FaChevronLeft } from 'react-icons/fa';

export default function FoldButton({ toggleSidebar }) {
  return (
    <button
      onClick={toggleSidebar}
      className={`absolute top-[calc(50%-30px)] left-60 h-[60px] w-[20px] rounded-r-lg bg-gray-900 transform -translate-y-1/2`}
    >
      <FaChevronLeft color="white" />
    </button>
  );
}