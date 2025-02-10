export interface Order {
  id: number;
  created_at: string;
  address: string;
  recelver: string;
  contact: string;
  book_title: string;
  total_quantity: number;
  total_price: number;
}

export interface OrderSheet {
  items: number[];
  totalQuantity: number;
  totalPrice: number;
  firstBookTitle: string;
  delivery: Delivery;
}

export interface Delivery {
  address: string;
  recelver: string;
  contact: string;
}

export interface OrderDetailItem {
  book_id: number;
  title: string;
  author: string;
  price: number;
  quantity: number;
}

export interface OrderListItem extends Order {
  detail?: OrderDetailItem[];
}
