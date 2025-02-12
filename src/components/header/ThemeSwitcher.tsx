import { useContext } from 'react';
import { ThemeContext } from '@/context/themeContext';

const ThemeSwitcher = () => {
  const { themeName, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme}>
      {themeName}모드
      <br />
      (Dark모드 준비중)
    </button>
  );
};

export default ThemeSwitcher;
