import { FaChevronLeft } from 'react-icons/fa';

export default function FoldButton({ toggleSidebar, isOpen }) {
  return (
    <button
      onClick={toggleSidebar}
      className={`absolute top-[calc(50%-30px)] left-[240px] h-[60px] w-[21px] rounded-r-lg bg-[#f9f9f9] transform -translate-y-1/2 border-r-2 border-y-2 focus:outline-none`}
    >
      <FaChevronLeft className={`${isOpen ? '' : 'rotate-180'}`} color="black" />
    </button>
  );
}
