import { useEffect, useState } from 'react';
import { OrderListItem } from '@/models/order.model';
import { fetchOrder, fetchOrders } from '@/api/order.api';

export const useOrders = () => {
  // 주문 내역 리스트 (전체 O) , (상세 X)
  const [orders, setOrders] = useState<OrderListItem[]>([]);

  // 선택된 주문 ID (전체 X) , (상세 X)
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  useEffect(() => {
    fetchOrders().then((orders) => {
      setOrders(orders);
    });
  }, []);

  const selectOrderItem = (orderId: number) => {
    /**
     * 요청 방어, 같은 주문내역을 계속해서 fetch함수 요청하지 않도록 함
     * orders : 전체 주문 내역 리스트
     * orderId : '자세히'버튼을 누른 주문 내역의 id
     * [0].detail : order.id와 orderId가 같은 item의 첫번째 요소[0]오고 detail이 있는지 확인
     * setSelectedItemId : detail이 있다면 (orderId)를 실행
     */

    if (orders.filter((item) => item.id === orderId)[0].detail) {
      setSelectedItemId(orderId);
      return;
    }

    fetchOrder(orderId).then((orderDetail) => {
      // detaitl정보(배열)을 어디에 저장 ?
      setSelectedItemId(orderId);

      /**
       * setOrders
       * 주문 내역 리스트를 순회하면서
       * 각 주문 내역 리스트의 id(item.id)와
       * '자세히'버튼 클릭한 주문id(orderId)를 비교하여
       * 같다면 detail정보를 넣어준다.
       */
      setOrders(
        orders.map((item) => {
          if (item.id === orderId) {
            return { ...item, detail: orderDetail };
          }
          return item;
        })
      );
    });
  };

  return { orders, selectOrderItem, selectedItemId };
};
