import { fetchBanners } from '@/api/banner.api';
import { fetchBestBooks, fetchBooks } from '@/api/books.api';
import { fetchReviewAll } from '@/api/review.api';
import { Banner } from '@/models/banner.model';
import { Book, BookReviewItem } from '@/models/book.model';
import { useEffect, useState } from 'react';

export const useMain = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [bestBooks, setBestBooks] = useState<Book[]>([]);
  const [newBooks, setNewBooks] = useState<Book[]>([]);
  const [reviews, setReviews] = useState<BookReviewItem[]>([]);

  useEffect(() => {
    // 배너섹션
    fetchBanners().then((banners) => {
      setBanners(banners);
    });

    // 베스트섹션
    fetchBestBooks().then((books) => {
      setBestBooks(books);
    });

    // 신간 섹션
    fetchBooks({
      category_id: undefined,
      newBook: true,
      currentPage: 1,
      limit: 4,
    }).then(({ books }) => {
      setNewBooks(books);
    });

    // 리뷰섹션
    fetchReviewAll().then((reviews) => {
      setReviews(reviews);
    });
  }, []);

  return { reviews, newBooks, bestBooks, banners };
};
