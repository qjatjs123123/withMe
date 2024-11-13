import { useEffect, useState } from 'react';

export default function Gauge({ connection }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // connection.rooms.size를 기준으로 10%씩 증가
    const percentage = Math.min(10 * connection.rooms.size, 100);
    setProgress(percentage);
  }, [connection.rooms.size]);

  return (
    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden relative">
      <div
        className={`h-full bg-gray-300 rounded-full text-black font-bold flex items-center justify-center transition-all duration-500 ease-out`}
        style={{ width: `${progress}%` }}
      >
        {progress < 100 ? `${progress === 99 ? 99 : progress}%` : 'connected!'}
      </div>
    </div>
  );
}
