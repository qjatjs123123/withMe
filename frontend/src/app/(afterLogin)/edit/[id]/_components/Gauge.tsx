import { useEffect, useState } from 'react';

export default function Gauge({ connection }) {
  const [progress, setProgress] = useState(0);
  const [showMessage, setShowMessage] = useState(true);
  const [isExiting, setIsExiting] = useState(false); // 메시지 이동 상태

  useEffect(() => {
    // connection.rooms.size를 기준으로 10%씩 증가
    const percentage = Math.min(10 * connection.rooms.size, 100);
    setProgress(percentage);

    // progress가 100이 되면 메시지 이동 트리거
    if (percentage === 100) {
      const timeout = setTimeout(() => {
        setIsExiting(true); // 이동 시작
        setTimeout(() => setShowMessage(false), 1000); // 이동 후 메시지 숨김
      }, 3000);

      return () => clearTimeout(timeout); // 언마운트 시 타이머 클리어
    } else {
      // progress가 100이 아니면 메시지 초기화
      setShowMessage(true);
      setIsExiting(false);
    }
  }, [connection.rooms.size]);

  return (
    <div
      className={`transition-all duration-1000 ease-out ${
        isExiting ? '-mr-[200%] ml-[200%]' : 'mr-0'
      } ${showMessage ? '' : 'hidden'}`}
    >
      <div className="w-full flex justify-between pr-3 text-sm">
        <div className={progress < 100 ? `loading-dots` : ''}></div>
        <div>{progress < 100 ? `${progress === 0 ? '' : `${progress}%`}` : 'Connected!'}</div>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-md overflow-hidden relative">
        <div
          className={`h-full bg-gray-300 rounded-full text-black font-bold flex items-center justify-center transition-all duration-500 ease-out`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <style jsx>{`
        .loading-dots::after {
          content: 'Loading';
          animation: dots 1.5s steps(3, end) infinite;
        }

        @keyframes dots {
          0% {
            content: 'Loading ';
          }
          33% {
            content: 'Loading .';
          }
          66% {
            content: 'Loading . .';
          }
          100% {
            content: 'Loading . . .';
          }
        }
      `}</style>
    </div>
  );
}
