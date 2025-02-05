import styled from 'styled-components';
import BookItem from './BookItem';
import { Book } from '../../models/book.model';

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

const BooksList = () => {
  return (
    <BooksListStyle>
      <BookItem book={dummyBook} />
    </BooksListStyle>
  );
};

const BooksListStyle = styled.div``;

export default BooksList;
