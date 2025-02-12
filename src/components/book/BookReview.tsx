import { BookReviewItemWrite, BookReviewItem as IBookReviewItem } from '@/models/book.model';
import styled from 'styled-components';
import BookReviewItem from './BookReviewItem';
import BookReviewAdd from './BookReviewAdd';
import { UseFormReset } from 'react-hook-form';

interface Props {
  reviews: IBookReviewItem[];
  onAdd: (book: BookReviewItemWrite, reset: UseFormReset<BookReviewItemWrite>) => void;
}

const BookReview = ({ reviews, onAdd }: Props) => {
  return (
    <BookReviewStyle>
      <BookReviewAdd onAdd={onAdd} />
      {reviews.map((review: IBookReviewItem) => (
        <BookReviewItem review={review} />
      ))}
    </BookReviewStyle>
  );
};

const BookReviewStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default BookReview;
