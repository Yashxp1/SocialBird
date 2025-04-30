import { Moon, Sun } from 'lucide-react';
import { useDarkMode } from '../context/ThemeContext';

const DarkModeToggle = () => {
  // const darkMode = false;
  const { darkMode, setDarkMode } = useDarkMode();
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="transition-all rounded-full"
    >
      {darkMode ? <Sun className='text-[#3D90D7]'/> : <Moon />}
    </button>
  );
};

export default DarkModeToggle;
