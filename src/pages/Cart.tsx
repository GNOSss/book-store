import styled from 'styled-components';
import Title from '@/components/common/Title';
import CartItem from '@/components/cart/CartItem';
import { useCart } from '@/hooks/useCart';
import { useMemo } from 'react';
import Empty from '@/components/common/Empty';
import { FaShoppingCart } from 'react-icons/fa';
import CartSummary from '@/components/cart/CartSummary';
import Button from '@/components/common/Button';
import { useAlert } from '@/hooks/useAlert';
import { OrderSheet } from '@/models/order.model';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { showAlert, showConfirm } = useAlert();
  const navigate = useNavigate();

  /**
   * carts : 사용자가 담아 놓은 장바구니에 아이템 리스트
   * deleteCartItem : delete Fetch API
   * isEmpty : 장바구니가 비어있는지 .. 상태여부
   * checkedItems : 체크된 도서 아이템 id값 배열
   * setCheckedItems : 체크, none체크에 따라 checkedItems상태를 변경하는 로직
   */
  const { carts, deleteCartItem, isEmpty, checkedItems, setCheckedItems } = useCart();

  const handleCheckItem = (id: number) => {
    setCheckedItems((prevCheckedItems) => {
      if (prevCheckedItems.includes(id)) {
        return prevCheckedItems.filter((item) => item !== id);
      } else {
        return [...prevCheckedItems, id];
      }
    });
  };

  const handleItemDelete = async (id: number) => {
    // 장바구니에 있는 도서 삭제 요청
    await deleteCartItem(id);
  };

  const totalQuantity = useMemo(() => {
    return carts.reduce((acc, cart) => {
      if (checkedItems.includes(cart.id)) {
        return acc + cart.quantity;
      }
      return acc;
    }, 0);
  }, [carts, checkedItems]);

  /**
   * reduce 순회
   * acc : 누적 값
   * cart : 순회하며 들어오는 값
   * includes : 인자(cart.id)의 값이 있는지 여부 판단
   * 0 : 초기값
   */
  const totalPrice = useMemo(() => {
    return carts.reduce((acc, cart) => {
      if (checkedItems.includes(cart.id)) {
        return acc + cart.price * cart.quantity;
      }
      return acc;
    }, 0);
  }, [carts, checkedItems]);

  const handleOrder = () => {
    // 선택된 아이템이 없을때
    if (checkedItems.length === 0) {
      showAlert('주문할 도서를 선택하세요.');
      return;
    }

    // 주문 액션 : 주문서 작성으로 데이터 전달
    const orderData: Omit<OrderSheet, 'delivery'> = {
      items: checkedItems,
      totalPrice,
      totalQuantity,
      firstBookTitle: carts[0].title,
    };

    showConfirm('주문하시겠습니까?', () => {
      // 주문하기 버튼 클릭하게되면 /order로 이동하는데
      // 이때 2번째 인자로 orderData를 보내주면 /order 라우트에서 수신을 할 수 있다.
      navigate('/order', { state: orderData });
    });
  };

  return (
    <>
      <Title size="large">장바구니</Title>
      <CartStyle>
        {!isEmpty && (
          <>
            <div className="contents">
              {carts.map((item) => (
                <CartItem
                  key={item.id}
                  cart={item}
                  checkedItems={checkedItems}
                  onCheck={(cartId) => handleCheckItem(cartId)}
                  onDelete={handleItemDelete}
                />
              ))}
            </div>
            <div className="summary">
              <CartSummary totalQuantity={totalQuantity} totalPrice={totalPrice} />
              <Button size="large" scheme="primary" onClick={handleOrder}>
                주문 하기
              </Button>
            </div>
          </>
        )}
        {isEmpty && <Empty title="장바구니가 비었습니다." icon={<FaShoppingCart />} description={<>장바구니를 채워보세요.</>} />}
      </CartStyle>
    </>
  );
}

export const CartStyle = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
  padding: 24px 0 0 0;

  .contents {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .summary {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .order-info {
    h1 {
      padding: 0 0 24px 0;
    }

    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    padding: 12px;
  }

  .delivery {
    fieldset {
      border: 0;
      margin: 0;
      padding: 0 0 12px 0;
      display: flex;
      justify-content: start;
      gap: 12px;

      label {
        width: 80px;
      }

      .input {
        flex: 1;
        input {
          width: 100%;
        }
      }
    }

    .error-text {
      color: red;
      margin: 0;
      padding: 0 0 12px 0;
      text-align: right;
    }
  }
`;

export default Cart;
