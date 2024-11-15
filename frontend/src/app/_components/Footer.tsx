import React from 'react';

const Footer: React.FC = () => {
  return (
    <div className="h-[40px] px-[50px] flex flex-row text-[24px] mt-[100px] w-full text-start items-center gap-[20px]">
      WithMe
      <span style={{ fontFamily: 'SamsungOneKorean-400', fontSize: '16px' }}>© SSAFY All Rights Reserved</span>
    </div>
  );
};

export default Footer;
