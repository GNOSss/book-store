import React from 'react';
import { render } from '@testing-library/react';
import BookItem from '../components/books/BookItem';
import { BookStoreThemeProvider } from '../context/themeContext';
import { Book } from '../models/book.model';

const dummyBook: Book = {
  id: 1,
  title: '승수 자서전',
  img: 5,
  category_id: 1,
  form: 'paperBack',
  isbn: 'Dummy ISBN',
  summary: 'Dummy Summary',
  detail: 'Dummy Details',
  author: 'Dummy Author',
  pages: 100,
  contents: 'Dummy Contents',
  price: 10000,
  likes: 1,
  pubDate: '2021-01-01',
};

describe('BookItem', () => {
  it('렌더 여부', () => {
    const { getByText } = render(
      <BookStoreThemeProvider>
        <BookItem book={dummyBook} />
      </BookStoreThemeProvider>
    );

    expect(getByText(dummyBook.title)).toBeInTheDocument();
  });
});
