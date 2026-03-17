import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
  onClick={toggleTheme}
  className="fixed bottom-6 right-6 p-3 rounded-full 
  bg-white text-black 
  dark:bg-slate-800 dark:text-white 
  shadow-lg border border-gray-200 dark:border-slate-700 
  hover:scale-110 active:scale-95 
  transition-all duration-300 
  z-50 group 
  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 
  dark:focus:ring-offset-slate-900"
  aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
>
      <div className="relative w-6 h-6 flex items-center justify-center overflow-hidden">
        {/* Sun Icon */}
        <Sun 
          className={`w-6 h-6 text-amber-500 transition-all duration-500 absolute transform ${
            theme === 'dark' ? '-translate-y-10 rotate-90 opacity-0' : 'translate-y-0 rotate-0 opacity-100'
          }`}
        />
        {/* Moon Icon */}
        <Moon 
          className={`w-5 h-5 text-indigo-400 transition-all duration-500 absolute transform ${
            theme === 'light' ? 'translate-y-10 -rotate-90 opacity-0' : 'translate-y-0 rotate-0 opacity-100'
          }`}
        />
      </div>
      
      {/* Tooltip */}
      <span className="absolute right-full mr-3 px-2 py-1 rounded bg-slate-800 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden md:block">
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </span>
    </button>
  );
};

export default ThemeToggle;
