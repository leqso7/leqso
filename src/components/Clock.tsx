import { useState, useEffect } from 'react';

export const Clock = () => {
  const [time, setTime] = useState<Date>(new Date());
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const syncWithServer = async () => {
      try {
        const response = await fetch('https://worldtimeapi.org/api/ip');
        const data = await response.json();
        setTime(new Date(data.datetime));
      } catch (error) {
        console.log('Using local time due to offline/error');
      }
    };

    // Initial sync with server if online
    if (isOnline) {
      syncWithServer();
    }

    // Update time every second
    const timer = setInterval(() => {
      setTime(prevTime => new Date(prevTime.getTime() + 1000));
    }, 1000);

    // Handle online/offline events
    const handleOnline = () => {
      setIsOnline(true);
      syncWithServer();
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      clearInterval(timer);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white px-4 py-2 rounded-lg shadow-lg">
      <div className="text-xl font-mono">
        {time.toLocaleTimeString()}
      </div>
      {!isOnline && (
        <div className="text-xs text-yellow-400">
          Offline Mode
        </div>
      )}
    </div>
  );
};
