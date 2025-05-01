import { useState, useEffect } from 'react';
<<<<<<< HEAD
import { ThemeProvider } from '../context/ThemeContext';

export default function LoadingText() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
=======

export default function LoadingText() {
  const [dots, setDots] = useState('');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prevDots => {
>>>>>>> 4d85d9fb60cc580f76e5a99cbbf05fae5426c020
        if (prevDots.length >= 3) {
          return '';
        }
        return prevDots + '.';
      });
    }, 500);
<<<<<<< HEAD

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
=======
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-100 rounded-lg shadow-md">
      <div className="text-3xl font-bold text-blue-600">
        Loading<span className="inline-block w-12">{dots}</span>
      </div>
      <div className="mt-4 text-gray-600">Please wait while we process your request</div>
    </div>
  );
}
>>>>>>> 4d85d9fb60cc580f76e5a99cbbf05fae5426c020
