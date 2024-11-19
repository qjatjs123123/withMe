import React from 'react';
import { useSnackBarState } from '../(afterLogin)/_components/SnackBarProvider';

const SnackBarUI = () => {
  const { apiState } = useSnackBarState();
  return (
    <div
      className={`fixed w-[220px] h-[50px] bg-[#333333] text-white z-50 pr-[20px] pl-[20px] left-1/2 transform -translate-x-1/2 rounded-t-lg flex items-center justify-center text-center transition-all ${
        apiState.state ? 'bottom-0' : 'bottom-[-50px]'
      }`}
    >
      <span className="font-bold">{apiState.message}</span>
    </div>
  );
};

export default SnackBarUI;
