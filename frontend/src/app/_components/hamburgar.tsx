'use client';
import React, { useState } from 'react';
import Link from 'next/link'; // Next.js에서 Link 사용

const HamburgerButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="hamburger-container">
      {/* 햄버거 버튼 (768px 이하에서만 보이도록) */}
      <div className="hamburger-button lg:hidden">
        <button onClick={toggleMenu} className="hamburger-icon">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>

      {/* 모바일 메뉴 (햄버거 버튼 클릭 시 토글) */}
      <div
        className={`mobile-menu overflow-hidden ${
          isMenuOpen
            ? 'max-h-screen opacity-100 transition-all duration-500 ease-in-out'
            : 'max-h-0 opacity-0 transition-all duration-300 ease-in-out'
        }`}
      >
        <ul className="space-y-4 p-6 text-center text-gray-700">
          <li>
            <Link href="/explore" onClick={() => setIsMenuOpen(false)}>
              explore
            </Link>
          </li>
          <li>
            <Link href="/aboutus" onClick={() => setIsMenuOpen(false)}>
              about us
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HamburgerButton;
