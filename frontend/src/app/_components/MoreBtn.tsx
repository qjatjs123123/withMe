import { useState, useEffect, useRef } from 'react';
import SettingModal from './SettingModal';

export default function MoreBtn() {
  const [isVisible, setIsVisible] = useState(null);
  const modalRef = useRef(null);
  const btnRef = useRef(null);

  const changeState = (flg) => {
    setIsVisible(!isVisible);
  };

  const handleClickOutside = (e) => {
    // setIsVisible(false);
    if (btnRef.current.contains(e.target)) return;
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible]);

  return (
    <>
      <div ref={btnRef} onClick={() => setIsVisible(true)}>
        <svg
          className="cursor-pointer relative"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10ZM19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
            fill="black"
          />
        </svg>
      </div>
      {isVisible && <SettingModal ref={modalRef} isVisible={isVisible} changeState={changeState} />}
    </>
  );
}
