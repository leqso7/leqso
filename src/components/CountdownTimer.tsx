import { useState, useEffect } from 'react';

export const CountdownTimer = () => {
  const [seconds, setSeconds] = useState(365 * 24 * 60 * 60); // 1 year in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Convert seconds to days, hours, minutes, seconds
  const days = Math.floor(seconds / (24 * 60 * 60));
  const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((seconds % (60 * 60)) / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white px-4 py-2 rounded-lg shadow-lg font-mono">
      <div className="text-xl">
        {days}დ {hours}ს {minutes}წ {remainingSeconds}წმ
      </div>
      <div className="text-xs text-yellow-400">
        დარჩენილი დრო
      </div>
    </div>
  );
};
