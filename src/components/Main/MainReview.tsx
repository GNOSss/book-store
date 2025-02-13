import { BookReviewItem as IBookReviewItem } from '@/models/book.model';
import styled from 'styled-components';
import BookReviewItem from '../book/BookReviewItem';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface Props {
  reviews: IBookReviewItem[];
}

const MainReview = ({ reviews }: Props) => {
  const { isMobile } = useMediaQuery();

  const sliderSettings = {
    dots: true, // 점으로 페이지네이션 구현
    infinite: true, // 우측으로 이동 시 무한히 이동
    speed: 500, // 속도
    slidesToShow: isMobile ? 1 : 3, // 한 페이지 몇 개를 보여줄 지
    slidesToScroll: isMobile ? 1 : 2, // 1번 이동 시 몇 개를 이동 시킬 지
    gap: 16, // 간격
  };

  return (
    <MainReviewStyle>
      <Slider {...sliderSettings}>
        {reviews.map((review) => (
          <BookReviewItem key={review.id} review={review} />
        ))}
      </Slider>
    </MainReviewStyle>
  );
};

const MainReviewStyle = styled.div`
  padding: 0 0 24px 0;
  margin-bottom: 24px;

  /* Slider */
  .slick-track {
    padding: 12px 0;
  }

  .slick-slide > div {
    margin: 0 12px;
  }

  .slick-prev:before,
  .slick-next:before {
    color: #000;
  }

  @media screen and ${({ theme }) => theme.mediaQuery.mobile} {
    .slick-prev {
      left: 0;
      z-index: 1000;
    }
    .slick-next {
      right: 0;
      z-index: 1000;
    }
  }
`;

export default MainReview;
