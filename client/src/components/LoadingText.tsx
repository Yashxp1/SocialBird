import { useState, useEffect } from 'react';

export default function LoadingText() {
  const [dots, setDots] = useState('');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prevDots => {
        if (prevDots.length >= 3) {
          return '';
        }
        return prevDots + '.';
      });
    }, 500);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex bg-[#101828]  flex-col items-center justify-center p-8 dark:bg-blue-100 rounded-lg shadow-md">
      <div className="text-3xl font-bold text-blue-600">
        Loading<span className="inline-block w-12">{dots}</span>
      </div>
      <div className="mt-4 text-gray-600">Please wait while we process your request</div>
    </div>
  );
}