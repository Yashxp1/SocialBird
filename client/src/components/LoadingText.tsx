import { useState, useEffect } from 'react';
import { ThemeProvider } from '../context/ThemeContext';

export default function LoadingText() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length >= 3) {
          return '';
        }
        return prevDots + '.';
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <ThemeProvider>
      <div className="flex flex-col bg-[#101828] items-center justify-center p-8 dark:bg-blue-100 h-screen">
        <div className="text-3xl font-bold text-blue-600">
          Loading<span className="inline-block w-12">{dots}</span>
        </div>
        <div className="mt-4 text-gray-600">
          Please wait while we process your request
        </div>
      </div>
    </ThemeProvider>
  );
}
