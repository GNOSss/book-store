import styled from 'styled-components';
import { Banner as IBanner } from '@/models/banner.model';

interface Props {
  banner: IBanner;
}

const BannerItem = ({ banner }: Props) => {
  return (
    <BannerItemStyle>
      <div className="img">
        <img src={banner.image} alt={banner.title} />
      </div>
      <div className="content">
        <h2>{banner.title}</h2>
        <p>{banner.description}</p>
      </div>
    </BannerItemStyle>
  );
};

const BannerItemStyle = styled.div`
  /* 상위 컴포넌트(BannerContainerStyle)이 display:flex로 눌러버려서 기본값으로 돌아가기 위함 */
  flex: 0 0 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;

  .img {
    img {
      width: 100%;
      max-width: 100%;
    }
  }

  .content {
    position: absolute;
    top: 0;
    left: 0;
    width: 40%;
    height: 100%;
    background: linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h2 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: ${(props) => props.theme.color.primary};
    }

    p {
      font-size: 1.25rem;
      color: ${(props) => props.theme.color.text};
      margin: 0;
    }
  }

  @media screen AND ${({ theme }) => theme.mediaQuery.mobile} {
    .content {
      width: 100%;
      background: linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));

      h2 {
        font-size: 1.5rem;
        margin-bottom: 8px;
      }
      p {
        font-size: 0.75rem;
        margin-bottom: 2rem;
      }
    }
`;

export default BannerItem;
