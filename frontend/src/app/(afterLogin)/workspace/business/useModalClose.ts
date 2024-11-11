import { useEffect, useRef, useState } from 'react';

const useModalClose = () => {
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

  return { isVisible, modalRef, btnRef, changeState, setIsVisible };
};

export default useModalClose;
