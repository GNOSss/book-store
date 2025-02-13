import { getTheme } from '@/style/theme';
import { useEffect, useState } from 'react';

export const useMediaQuery = () => {
  /**
   * matchMedia().matches를 통해서
   * 커스텀 함수 : getTheme()를 Light 인자로 호출하여
   * 미리 만들어준 mediaQuery.mobile값 : maxwidth(768px)
   * 현재 사용자의 페이지 width가 768px 이하인지 판단
   */
  const [isMobile, setIsMobile] = useState(window.matchMedia(getTheme('light').mediaQuery.mobile).matches);

  useEffect(() => {
    const isMobileQuery = window.matchMedia(getTheme('light').mediaQuery.mobile);

    setIsMobile(isMobileQuery.matches);
  }, []);

  return { isMobile };
};
