import { useLocation } from 'react-router-dom';
import { fetchBooks } from '@/api/books.api';
import { QUERYSTRING } from '@/constants/querystring';
import { LIMIT } from '@/constants/pagination';
import { useQuery } from 'react-query';

export const useBooks = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  // 'books': 사용할 path경로를 넣어주자
  const { data: booksData, isLoading: isBooksLoading } = useQuery(['books', location.search], () =>
    fetchBooks({
      category_id: params.get(QUERYSTRING.CATEGORY_ID) ? Number(params.get(QUERYSTRING.CATEGORY_ID)) : undefined,
      newBook: params.get(QUERYSTRING.NEWS) ? true : undefined,
      currentPage: params.get(QUERYSTRING.PAGE) ? Number(params.get(QUERYSTRING.PAGE)) : 1,
      limit: LIMIT,
    })
  );

  // TanStack query 사용전
  // const [books, setbooks] = useState<Book[]>([]);
  // const [pagination, setPagination] = useState<Pagination>({
  //   totalCount: 0,
  //   currentPage: 1,
  // });

  // const [isEmpty, setIsEmpty] = useState(true);

  // useEffect(() => {
  //   const params = new URLSearchParams(location.search);

  // fetchBooks({
  //     category_id: params.get(QUERYSTRING.CATEGORY_ID) ? Number(params.get(QUERYSTRING.CATEGORY_ID)) : undefined,
  //     newBook: params.get(QUERYSTRING.NEWS) ? true : undefined,
  //     currentPage: params.get(QUERYSTRING.PAGE) ? Number(params.get(QUERYSTRING.PAGE)) : 1,
  //     limit: LIMIT,
  //   }).then(({ books, pagination }) => {
  //     setbooks(books);
  //     setPagination(pagination);
  //     setIsEmpty(books.length === 0);
  //   });
  // }, [location.search]);

  return { books: booksData?.books, pagination: booksData?.pagination, isEmpty: booksData?.books.length === 0, isBooksLoading };
};
