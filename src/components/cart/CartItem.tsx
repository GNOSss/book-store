import styled from 'styled-components';
import { Cart } from '@/models/cart.model';
import Button from '@/components/common/Button';
import Title from '@/components/common/Title';
import { formatNumber } from '@/utils/format';
import CheckIconButton from './CheckIconButton';
import { useMemo } from 'react';
import { useAlert } from '@/hooks/useAlert';

interface Props {
  cart: Cart;
  checkedItems: number[];
  onCheck: (id: number) => void; // Cart.tsx라는 부모 컴포넌트에서 로직 처리
  onDelete: (id: number) => Promise<void>; // Cart.tsx라는 부모 컴포넌트에서 로직 처리
}

function CartItem({ cart, checkedItems = [], onCheck, onDelete }: Props) {
  const { showConfirm } = useAlert();

  // checkedItems 목록에 해당 도서 아이템이 있는지 판단 = checked
  const isChecked = useMemo(() => {
    if (cart.id === undefined) {
      return false;
    }

    return checkedItems.includes(cart.id);
  }, [checkedItems, cart.id]);

  // const handleCheck = () => onCheck(cart.id);

  const handleDelete = () => {
    showConfirm('장바구니에서 도서를 삭제하시겠습니까?', () => {
      onDelete(cart.id);
    });
  };

  return (
    <CartItemStyle>
      <div className="info">
        <div className="check">
          <CheckIconButton isChecked={isChecked} onCheck={() => onCheck(cart.id)} />
        </div>
        <div>
          <Title size="medium" color="text">
            {cart.title}
          </Title>
          <p className="summary">{cart.summary}</p>
          <p className="price">{formatNumber(cart.price)}</p>
          <p className="quantity">{cart.quantity} 권</p>
        </div>
      </div>
      <Button size="medium" scheme="normal" onClick={handleDelete}>
        장바구니 삭제
      </Button>
    </CartItemStyle>
  );
}

const CartItemStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  padding: 12px;

  .info {
    display: flex;
    align-items: start;
    flex: 1;

    .check {
      width: 40px;
      flex-shrink: 0;
    }

    p {
      padding: 0 0 8px 0;
      margin: 0;
    }
  }
`;

export default CartItem;
