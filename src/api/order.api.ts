import { OrderSheet } from '@/models/order.model';
import { requestHandler } from './http';

// 결제 하기
export const order = async (orderData: OrderSheet) => {
  return await requestHandler('post', '/orders', orderData);
};

// 주문 내역
export const fetchOrders = async () => {
  return await requestHandler('get', '/orders');
};

// 주문 내역 중에서 '자세히'1건 조회
export const fetchOrder = async (orderId: number) => {
  return await requestHandler('get', `/orders/${orderId}`);
};
