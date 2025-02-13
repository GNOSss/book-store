import { Banner as IBanner } from '@/models/banner.model';
import styled from 'styled-components';
import BannerItem from './BannerItem';
import { useMemo, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

interface Props {
  banners: IBanner[];
}

const Banner = ({ banners }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  /** transFormValue
   * 현재 뷰포트의 값 , currentIndex
   * 에서 Prev, Next 버튼 클릭시
   * 이동하게 될 CSS translation의 값을 계산하는 핸들링
   */
  const transFormValue = useMemo(() => {
    return currentIndex * -100;
  }, [currentIndex]);

  // 좌측 이동
  const handlePrev = () => {
    if (currentIndex === 0) return;
    setCurrentIndex(currentIndex - 1);
  };
  // 우측 이동
  const handleNext = () => {
    if (currentIndex === banners.length - 1) return;
    setCurrentIndex(currentIndex + 1);
  };

  // 인디케이터 클릭
  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <BannerStyle>
      {/* 배너 그룹 */}
      <BannerContainerStyle $transFormValue={transFormValue}>
        {banners.map((banner, index) => (
          <BannerItem banner={banner} />
        ))}
      </BannerContainerStyle>
      {/* 버튼 */}
      <BannerButtonStyle>
        <button className="prev" onClick={handlePrev}>
          <FaAngleLeft />
        </button>
        <button className="next" onClick={handleNext}>
          <FaAngleRight />
        </button>
      </BannerButtonStyle>

      {/* 인디케이터 */}
      <BannerIndicatorStyle>
        {banners.map((banner, index) => (
          <span onClick={() => handleIndicatorClick(index)} className={index === currentIndex ? 'active' : ''}></span>
        ))}
      </BannerIndicatorStyle>
    </BannerStyle>
  );
};

// 뷰포트 정의
const BannerStyle = styled.div`
  overflow: hidden;
  position: relative;
`;

// transFormValue를 BannerContainerStyle에 적용하려는 데이터 타입 선언
interface BannerContainerStyleProps {
  $transFormValue: number;
}

const BannerContainerStyle = styled.div<BannerContainerStyleProps>`
  display: flex;
  transform: translateX(${(props) => props.$transFormValue}%);
  transition: transform 0.75s ease-in-out;
`;

const BannerButtonStyle = styled.div`
  button {
    border: 0;
    width: 40px;
    height: 40px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 500px;
    font-size: 2rem;
    cursor: pointer;

    display: flex;
    aligne-items: ceonter;
    justify-content: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    svg {
      fill: white;
    }

    &.prev {
      left: 10px;
    }

    &.next {
      right: 10px;
    }

    @media screen AND ${({ theme }) => theme.mediaQuery.mobile} {
      width: 28px;
      height: 28px;
      font-size: 1.5rem;

      &.prev {
        left: 1;
      }
      &.next {
        left: 1;
      }
    }
  }
`;

const BannerIndicatorStyle = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);

  span {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 100px;
    background: #fff;
    margin: 0 8px;
    cursor: pointer;

    &.active {
      background: ${({ theme }) => theme.color.primary};
    }
  }

  @media screen AND ${({ theme }) => theme.mediaQuery.mobile} {
    bottom: 0;

    span {
      width: 12px;
      height: 12px;

      &.active {
        width: 30px;
      }
    }
  }
`;

export default Banner;
