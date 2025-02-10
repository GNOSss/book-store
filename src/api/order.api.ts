import { Order, OrderDetailItem, OrderSheet } from '@/models/order.model';
import { httpClient } from './http';

export const order = async (orderData: OrderSheet) => {
  const response = await httpClient.post('/orders', orderData);
  return response.data;
};

// 주문 내역
export const fetchOrders = async () => {
  const response = await httpClient.get<Order[]>('/orders');
  return response.data;
};

// 주문 내역 중에서 '자세히'1건 조회
export const fetchOrder = async (orderId: number) => {
  const response = await httpClient.get<OrderDetailItem[]>(`/orders/${orderId}`);

  return response.data;
};
