import { useState, useEffect } from 'react';

export default function Gauge({ connection }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showConnected, setShowConnected] = useState(false);

  useEffect(() => {
    const percentage = Math.min(10 * connection.rooms.size, 100);
    setProgress(percentage);

    if (percentage >= 100) {
      setShowConnected(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [connection.rooms.size]);

  // if (!isVisible) return null;

  const size = 40;
  const strokeWidth = 4;
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      className={`flex items-center transition-all duration-1000 ease-out ${isVisible ? '' : '-mr-[200%] ml-[200%]'}`}
    >
      {showConnected ? (
        <span className="text-sm font-medium text-green-600 animate-fade-in">Connected!</span>
      ) : (
        <div className="relative w-10 h-10">
          <svg className="transform -rotate-90 w-full h-full" viewBox={`0 0 ${size} ${size}`}>
            <circle
              className="stroke-gray-200"
              strokeWidth={strokeWidth}
              fill="transparent"
              r={radius}
              cx={center}
              cy={center}
            />
            <circle
              className="stroke-blue-500 transition-all duration-500 ease-out"
              strokeWidth={strokeWidth}
              fill="transparent"
              r={radius}
              cx={center}
              cy={center}
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: strokeDashoffset,
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-medium">{progress}%</span>
          </div>
        </div>
      )}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
