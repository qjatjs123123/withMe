import { FaChevronLeft } from 'react-icons/fa';

export default function FoldButton({ toggleSidebar, isOpen }) {
  return (
    <button
      onClick={toggleSidebar}
      className={`absolute top-[calc(50%-30px)] left-[238px] h-[60px] w-[20px] rounded-r-lg bg-white transform -translate-y-1/2 border-r-2 border-y-2 focus:outline-none`}
    >
      <FaChevronLeft className={`${isOpen ? '' : 'rotate-180'}`} color="black" />
    </button>
  );
}
