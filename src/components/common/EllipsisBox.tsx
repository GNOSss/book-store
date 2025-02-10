import { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';
import { FaAngleDown } from 'react-icons/fa';

interface Props {
  children: React.ReactNode;
  linelimit: number;
}

const EllipsisBox = ({ children, linelimit }: Props) => {
  // true면 상세설명 펼쳐지고, false면 상세설명 접히고
  const [expanded, setExpanded] = useState(false);

  return (
    <EllipsisBoxStyle linelimit={linelimit} $expanded={expanded}>
      <p>{children}</p>
      <div className="toggle">
        <Button
          size="small"
          scheme="normal"
          onClick={() => {
            setExpanded(!expanded);
          }}
        >
          {expanded ? '접기' : '펼치기'}
          <FaAngleDown />
        </Button>
      </div>
    </EllipsisBoxStyle>
  );
};

interface EllipsisBoxStyleProps {
  linelimit: number; // clamp할 line limit
  $expanded: boolean; // clapm적용 할 것인지, 아닌 건지
}

const EllipsisBoxStyle = styled.div<EllipsisBoxStyleProps>`
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: ${({ linelimit, $expanded }) => ($expanded ? 'none' : linelimit)};
    -webkit-box-orient: vertical; /*...더보기 링크를 열기 */
    padding: 20px 0 0 0;
    margin: 0;
  }

  .toggle {
    display: flex;
    justify-content: end;
    svg {
      transform: ${({ $expanded }) => ($expanded ? 'rotate(180deg)' : 'rotate(0)')};
    }
  }
`;

export default EllipsisBox;
