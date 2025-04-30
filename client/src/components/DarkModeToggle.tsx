import { useDarkMode } from '../context/ThemeContext';

const DarkModeToggle = () => {
  // const darkMode = false;
  const { darkMode, setDarkMode } = useDarkMode();
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="bg-gray-700 px-4 rounded-md"
    >
      {darkMode ? '☀️Light' : '🌑 Dark'}
    </button>
  );
};

export default DarkModeToggle;
