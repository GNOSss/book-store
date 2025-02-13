import MainBest from '@/components/Main/MainBest';
import MainNewBooks from '@/components/Main/MainNewBooks';
import MainReview from '@/components/Main/MainReview';
import Title from '@/components/common/Title';
import Banner from '@/components/common/banner/Banner';
import { useMain } from '@/hooks/useMain';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import styled from 'styled-components';

const Home = () => {
  const { reviews, newBooks, bestBooks, banners } = useMain();
  const { isMobile } = useMediaQuery();

  return (
    <HomeStyle>
      {/*배너*/}
      <Banner banners={banners} />
      {/*베스트*/}
      <section className="section">
        <Title size="large">베스트셀러</Title>
        <MainBest books={bestBooks} />
      </section>
      {/*신간*/}
      <section className="section">
        <Title size="large">신간 안내</Title>
        <MainNewBooks books={newBooks} />
      </section>
      {/*리뷰*/}
      <section className="section">
        <Title size="large">리뷰</Title>
        <MainReview reviews={reviews} />
      </section>
    </HomeStyle>
  );
};

const HomeStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export default Home;
