import { useEffect, useState } from 'react';
import { Cart } from '@/models/cart.model';
import { deleteCart, fetchCart } from '@/api/carts.api';

export const useCart = () => {
  const [carts, setCarts] = useState<Cart[]>([]);
  // const [isEmpty, setIsEmpty] = useState(true);

  // 장바구니에서 체크된 도서 아이템의 id값을 가지는 배열
  const [checkedItems, setCheckedItems] = useState<number[]>(() => JSON.parse(localStorage.getItem('checkItem') || '[]'));

  const deleteCartItem = async (id: number) => {
    await deleteCart(id).then(() => {
      setCarts(carts.filter((item) => item.id !== id));
    });
  };

  useEffect(() => {
    fetchCart().then((carts) => {
      setCarts(carts);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('checkItem', JSON.stringify(checkedItems));
  }, [checkedItems]);

  // useLayoutEffect(() => {
  //   setIsEmpty(carts.length === 0);
  // }, [carts]);

  return { carts, isEmpty: carts.length === 0, deleteCartItem, checkedItems, setCheckedItems };
};
