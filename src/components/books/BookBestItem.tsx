import { Book } from '@/models/book.model';
import styled from 'styled-components';
import BookItem, { BookItemStyle } from './BookItem';

interface Props {
  book: Book;
  itemIndex: number;
}

const BookBestItem = ({ book, itemIndex }: Props) => {
  return (
    <BookBestItemStyle>
      <BookItem book={book} view="grid" />
      <div className="rank">{itemIndex + 1}</div>
    </BookBestItemStyle>
  );
};

const BookBestItemStyle = styled.div`
  ${BookItemStyle} {
    .summary,
    .price,
    .like {
      display: none;
    }

    {/* 2줄까지만 노출하고 나머지는 ...으로 가리기 */}
    h2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  position: relative;

  .rank {
    position: absolute;
    top: -10px;
    left: -10px;
    width: 40px;
    height: 40px;
    background: ${(props) => props.theme.color.primary};
    border-radius: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    color: white;
    font-weight: 700;
    font-style: italic;
  }
`;

export default BookBestItem;
