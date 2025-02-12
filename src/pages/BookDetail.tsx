import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useBook } from '@/hooks/useBook';
import { getImgSrc } from '@/utils/image';
import Title from '@/components/common/Title';
import { BookDetail as IBookDetail } from '@/models/book.model';
import { formatDate, formatNumber } from '@/utils/format';
import { Link } from 'react-router-dom';
import EllipsisBox from '@/components/common/EllipsisBox';
import LikeButton from '@/components/book/LikeButton';
import AddToCart from '@/components/book/AddToCart';
import BookReview from '@/components/book/BookReview';
import { Tab, Tabs } from '@/components/common/Tabs';
import Modal from '@/components/common/Modal';
import { useState } from 'react';

const bookInfoList = [
  {
    label: '카테고리',
    key: 'category_name',
    filter: (book: IBookDetail) => <Link to={`/book?category_id=${book.category_id}`}>{book.category_name}</Link>,
  },
  {
    label: '포맷',
    key: 'form',
  },
  {
    label: '페이지',
    key: 'pages',
  },
  {
    label: 'ISBN',
    key: 'isbn',
  },
  {
    label: '출간일',
    key: 'pub_date',
    filter: (book: IBookDetail) => {
      return formatDate(book.pub_date);
    },
  },
  {
    label: '가격',
    key: 'price',
    filter: (book: IBookDetail) => {
      return `${formatNumber(book.price)} 원`;
    },
  },
];

const BookDetail = () => {
  // 쿼리스트링의 파라미터의 값을 가져 올 수 있음 (?)
  const { bookId } = useParams();
  const { book, likeToggle, reviews, addReview } = useBook(bookId);
  const [isImgOpen, setIsImgOpen] = useState(false);

  // book 은 useBook에서 <BookDetail | null> 선언이 되어있는데
  // early return 처리해줘야 한다.
  if (!book) return null;

  return (
    <BookDetailStyle>
      <header className="header">
        <div className="img" onClick={() => setIsImgOpen(true)}>
          <img src={getImgSrc(book.image)} alt={book.title} />
        </div>
        <Modal isOpen={isImgOpen} onClose={() => setIsImgOpen(false)}>
          <img src={getImgSrc(book.image)} alt={book.title} />
        </Modal>
        <div className="info">
          <Title size="large" color="text">
            {book.title}
          </Title>
          {/* book 뒤에 '[]'문법은 속성 접근인데 
            bookInfo또한 점(.)표기법으로 접근했기때문에 
            book은 대괄호([])표기법을 사용했음*/}
          {bookInfoList.map((bookInfo) => (
            <dl key={bookInfo.key}>
              <dt>{bookInfo.label}</dt>
              <dd>{bookInfo.filter ? bookInfo.filter(book) : book[bookInfo.key as keyof IBookDetail]}</dd>
            </dl>
          ))}
          <p className="summary">{book.summary}</p>
          <div className="like">
            <LikeButton book={book} onClick={likeToggle} />
          </div>
          <div className="add-cart">
            <AddToCart book={book} />
          </div>
        </div>
      </header>
      <div className="content">
        <Tabs>
          <Tab title="상세 설명">
            <Title size="medium">상세 설명</Title>
            <EllipsisBox linelimit={5}>{book.detail}</EllipsisBox>
          </Tab>
          <Tab title="목차">
            <Title size="medium">목차</Title>
            <p className="contents">{book.contents}</p>
          </Tab>
          <Tab title="리뷰">
            <Title size="medium">리뷰</Title>
            <BookReview reviews={reviews} onAdd={addReview} />
          </Tab>
        </Tabs>
      </div>
    </BookDetailStyle>
  );
};

const BookDetailStyle = styled.div`
  .header {
    display: flex;
    align-items: start;
    gap: 24px;
    padding: 0 0 24px 0;
  }

  > div {
    position: relative !important;
  }

  .img {
    flex: 1;
    img {
      width: 100%;
      height: auto;
    }
  }

  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  dl {
    display: flex;
    align-items: center; /* 세로 정렬을 통일 */
    justify-content: space-between; /* 좌우 정렬을 맞춤 */
    margin: 0;

    dt {
      width: 100px; /* 고정 너비 설정 */
      flex-shrink: 0; /* dt가 줄어들지 않도록 설정 */
      color: ${({ theme }) => theme.color.secondary};
    }

    dd {
      flex: 1; /* 남은 공간을 차지하도록 설정 */
      text-align: left; /* 텍스트를 왼쪽 정렬 */
      margin-left: 12px; /* dt와 간격 유지 */
    }

    a {
      color: ${({ theme }) => theme.color.primary};
    }
  }

  .content {
    // .detail {
    //   overflow: hidden;
    //   text-overflow: ellipsis;
    //   display: -webkit-box;
    //   -webkit-line-clamp: 5; /* 5줄만 보여주고... */
    //   -webkit-box-orient: vertical; /*...더보기 링크를 열기 */
    // }
  }
`;

export default BookDetail;
