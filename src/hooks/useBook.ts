import { useEffect, useState } from 'react';
import { BookDetail, BookReviewItem, BookReviewItemWrite } from '@/models/book.model';
import { fetchBook, likeBook, unlikeBook } from '@/api/books.api';
import { useAuthStore } from '@/store/authStore';
import { useAlert } from './useAlert';
import { useNavigate } from 'react-router-dom';
import { addCart } from '@/api/carts.api';
import { addBookReview, fetchBookReview } from '@/api/review.api';
import { UseFormReset } from 'react-hook-form';
import { useToast } from './useToast';

/**
 * bookId는 useParams()에 나온 데이터인데
 * undefined도 포함하고 있어서 undefined도 타입에 포함시켜야함
 */
export const useBook = (bookId: string | undefined) => {
  const [book, setBook] = useState<BookDetail | null>(null);
  const [cartAdded, setCardAdded] = useState(false);
  const [reviews, setRivews] = useState<BookReviewItem[]>([]);

  const { isloggedIn } = useAuthStore();
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const likeToggle = () => {
    // 권한 확인
    if (!isloggedIn) {
      showAlert('로그인이 필요합니다.');
      navigate('/login');
      // return이 없으면 아래 프로세스들이 진행되므로 꼭 return 적어줄 것
      return;
    }

    if (!book) return;

    if (book.liked) {
      // 라이크 상태 -> 언라이크 실행
      unlikeBook(book.id).then(() => {
        setBook({ ...book, liked: false, likes: book.likes - 1 });
        showToast('좋아요가 취소되었습니다.');
      });
    } else {
      // 언라이크 상태 -> 라이크 실행
      likeBook(book.id).then(() => {
        setBook({ ...book, liked: true, likes: book.likes + 1 });
        showToast('좋아요가 추가되었습니다.');
      });
    }
  };

  const addToCart = (quantity: number) => {
    if (!book) return;

    addCart({
      book_id: book.id,
      quantity: quantity,
    }).then(() => {
      setCardAdded(true);
      setTimeout(() => {
        setCardAdded(false);
      }, 3000);
    });
  };

  useEffect(() => {
    // bookId가 undefined일 경우
    if (!bookId) return;

    fetchBook(bookId)
      .then((res) => {
        setBook(res);
      })
      .catch(() => {});

    fetchBookReview(bookId).then((res) => {
      setRivews(res);
    });
  }, [bookId]);

  const addReview = (data: BookReviewItemWrite, reset: UseFormReset<BookReviewItemWrite>) => {
    if (!book) return;

    addBookReview(book.id.toString(), data).then((res) => {
      fetchBookReview(book.id.toString()).then((reviews) => {
        setRivews(reviews);
      });
      showAlert(res.message);
      reset();
    });
  };

  return { book, likeToggle, addToCart, cartAdded, reviews, addReview };
};
