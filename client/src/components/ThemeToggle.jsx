import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 flex items-center justify-center">
        <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700" />
      </div>
    );
  }

  return (
    <button
      onClick={toggleDarkMode}
      className={`
        flex items-center justify-center 
        w-10 h-10 rounded-lg focus:outline-none 
        transition-colors duration-200
        ${darkMode ? 'bg-gray-800' : 'bg-orange-50'}
      `}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? (
        <FiMoon className="w-5 h-5 text-blue-300" />
      ) : (
        <FiSun className="w-5 h-5 text-amber-500" />
      )}
    </button>
  );
};

export default ThemeToggle;
