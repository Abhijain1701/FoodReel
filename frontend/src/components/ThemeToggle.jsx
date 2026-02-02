import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="theme-toggle">
      <button
        onClick={toggleTheme}
        className="theme-toggle-btn"
        aria-label="Toggle theme"
      >
        {isDark ? (
          <Sun size={20} color="#eab308" />
        ) : (
          <Moon size={20} color="#334155" />
        )}
      </button>
    </div>
  );
}

export default ThemeToggle;
