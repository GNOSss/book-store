export interface Book {
  id: number;
  title: string;
  image: number;
  category_id: number;
  form: string;
  isbn: string;
  summary: string;
  detail: string;
  author: string;
  pages: number;
  contents: string;
  price: number;
  likes: number;
  pub_date: string;
}

export interface BookDetail extends Book {
  category_name: string;
  liked: boolean;
}
