import styled from 'styled-components';
import { useCategory } from '../../hooks/useCategory';
import Button from '../common/Button';
import { useSearchParams } from 'react-router-dom';

const BooksFilter = () => {
  /**
   * 1. 카테고리
   * 2. 신간 여부 (true,false)
   * -> 리액트의 useState, globalState로 사용할 수 있지만,
   * 일반적으로 목록들은 쿼리스트링을 사용한다고함
   *
   * 쿼리스트링을 이용하는 방법은 여러가지 장점을 가짐
   * 상태의 공유, 다른 브라우저에 붙여넣었을때 상태공유가 됨
   * 재사용성이 보장됨
   * 해당 주소가 유니크한 결과값을 갖고있기에 검색엔진에 최적화됨
   * 데이터 추적과 분석에 용이하다고 함
   */

  const { category } = useCategory();

  const [searchParams, setSearchParams] = useSearchParams();

  const handleCategory = (category_id: number | null) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (category_id === null) {
      newSearchParams.delete('category_id');
    } else {
      newSearchParams.set('category_id', category_id.toString());
    }

    setSearchParams(newSearchParams);
  };

  const handleNews = () => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (newSearchParams.get('news')) {
      newSearchParams.delete('news');
    } else {
      newSearchParams.set('news', 'true');
    }

    setSearchParams(newSearchParams);
  };

  return (
    <BooksFilterStyle>
      <div className="category">
        {category.map((item) => (
          <Button
            size="medium"
            scheme={item.isActive ? 'primary' : 'normal'}
            key={item.category_id}
            onClick={() => {
              handleCategory(item.category_id);
            }}
          >
            {item.category_name}
          </Button>
        ))}
      </div>
      <div className="new">
        <Button size="medium" scheme={searchParams.get('news') ? 'primary' : 'normal'} onClick={() => handleNews()}>
          신간
        </Button>
      </div>
    </BooksFilterStyle>
  );
};

const BooksFilterStyle = styled.div`
  display: flex;
  gap: 24px;

  .category {
    display: flex;
    gap: 8px;
  }
`;

export default BooksFilter;
