import styled from 'styled-components';
import Title from '@/components/common/Title';
import { useOrders } from '@/hooks/useOrders';
import { formatDate, formatNumber } from '@/utils/format';
import Button from '@/components/common/Button';
import React from 'react';

const OrderList = () => {
  const { orders, selectOrderItem, selectedItemId } = useOrders();

  return (
    <>
      <Title size="large">주문 내역</Title>
      <OrderListStyle>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>주문일자</th>
              <th>주소</th>
              <th>수령인</th>
              <th>전화번호</th>
              <th>대표상품명</th>
              <th>수량</th>
              <th>금액</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              /*
               * React.Fragment : 각 주문(order)의 주요 정보 행과 주문 상세 정보 행을 하나의 그룹으로 묶기 위해서
               * map함수 사용시 map함수 바로 밑에 태그에 key값을 넣는게 맞지만
               * 현재 <tr>의 key를 박아두면 '자세히'버튼 로직의 key와 서로 분리된다
               * React.Fragment를 사용하면 한 개의 order.id를 기준으로 묶어서 관리 가능.
               */
              <React.Fragment key={order.id}>
                <tr>
                  <td>{order.id}</td>
                  <td>{formatDate(order.created_at, 'YYYY.MM.DD')}</td>
                  <td>{order.address}</td>
                  <td>{order.recelver}</td>
                  <td>{order.contact}</td>
                  <td>{order.book_title}</td>
                  <td>{order.total_quantity}권</td>
                  <td>{formatNumber(order.total_price)}원</td>
                  <td>
                    <Button
                      size="small"
                      scheme="normal"
                      onClick={() => {
                        selectOrderItem(order.id);
                      }}
                    >
                      자세히
                    </Button>
                  </td>
                </tr>
                {selectedItemId === order.id && (
                  <tr>
                    <td></td>
                    <td colSpan={8}>
                      <ul className="detail">
                        {order?.detail &&
                          order.detail.map((item) => (
                            <li key={item.book_id}>
                              <div>
                                <span>{item.book_id}</span>
                                <span>{item.author}</span>
                                <span>{formatNumber(item.price)}원</span>
                              </div>
                            </li>
                          ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </OrderListStyle>
    </>
  );
};

const OrderListStyle = styled.div`
  padding: 24px 0 0 0;

  table {
    width: 100%;
    border-collapse: collapse;
    border-top: 1px solid ${({ theme }) => theme.color.border};
    border-bottom: 1px solid ${({ theme }) => theme.color.border};

    th {
      white-space: nowrap; /* ✅ 줄바꿈 방지 */
    }

    th,
    td {
      padding: 8px;
      border-bottom: 1px solid ${({ theme }) => theme.color.border};
      text-align: center;
    }

    .detail {
      margin: 0;
      li {
        list-style: square;
        text-align: left;
        div {
          display: flex;
          padding: 8px 12px;
          gap: 8px;
        }
      }
    }
  }
`;

export default OrderList;
