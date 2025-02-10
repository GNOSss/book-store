import { Book, BookDetail } from '@/models/book.model';
import { Pagination } from '@/models/pagination.model';
import { httpClient } from './http';

interface FetchBooksParams {
  category_id?: number;
  newBook?: boolean;
  currentPage?: number;
  limit: number;
}

interface FetchBooksResponse {
  books: Book[];
  pagination: Pagination;
}

//params를 사용해서 /books뒤에 쿼리스트링을 붙혀서 http요청으로 보냄
export const fetchBooks = async (params: FetchBooksParams) => {
  try {
    const response = await httpClient.get<FetchBooksResponse>('/books', {
      params: params,
    });

    return response.data;
  } catch (error) {
    return {
      books: [],
      pagination: {
        currentPage: 1,
        totalCount: 0,
      },
    };
  }
};

export const fetchBook = async (bookId: string) => {
  const response = await httpClient.get<BookDetail>(`/books/${bookId}`);

  return response.data;
};

export const likeBook = async (bookId: number) => {
  const response = await httpClient.post(`/likes/${bookId}`);

  return response.data;
};

export const unlikeBook = async (bookId: number) => {
  const response = await httpClient.delete(`/likes/${bookId}`);

  return response.data;
};
