import { render, screen } from '@testing-library/react';
import Title from './Title';
import { BookStoreThemeProvider } from '../../context/themeContext';
import '@testing-library/jest-dom';

describe('Title 컴포넌트 테스트', () => {
  it('렌더를 확인', () => {
    // 1.렌더
    render(
      <BookStoreThemeProvider>
        <Title size="large">제목</Title>
      </BookStoreThemeProvider>
    );

    // 2.확인
    expect(screen.getByText('제목')).toBeInTheDocument();
  });
});

/*

> book-store@0.0.0 test
> jest

● Validation Error:

  Module @testing-library/jest-dom/extend-expect in the setupFilesAfterEnv option was not found.
         <rootDir> is: /Users/seungsoosmacbook/Desktop/programmer_dev5/FE/book-store

  Configuration Documentation:
  https://jestjs.io/docs/configuration

 */
