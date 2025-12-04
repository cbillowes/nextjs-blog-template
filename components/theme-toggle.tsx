'use client';

import { useThemeMode } from 'flowbite-react';
import { FaSun, FaMoon } from 'react-icons/fa';

export function ThemeToggle() {
  const { mode, toggleMode } = useThemeMode();
  return (
    <button
      className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-lg p-2.5"
      onClick={toggleMode}
    >
      <span className="sr-only">Toggle theme</span>
      {mode === 'dark' && <FaSun />}
      {mode !== 'dark' && <FaMoon />}
    </button>
  );
}
