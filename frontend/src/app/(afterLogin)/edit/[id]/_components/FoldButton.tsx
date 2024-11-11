import { FaChevronLeft } from 'react-icons/fa';

export default function FoldButton({ toggleSidebar, isOpen }) {
  return (
    <button
      onClick={toggleSidebar}
      className={`absolute top-[calc(50%-30px)] left-[239px] h-[60px] w-[20px] rounded-r-lg bg-gray-900 transform -translate-y-1/2 focus:outline-none`}
    >
      <FaChevronLeft className={`${isOpen ? '' : 'rotate-180'}`} color="white" />
    </button>
  );
}
