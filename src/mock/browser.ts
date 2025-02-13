import { setupWorker } from 'msw/browser';
import { addReview, reviewForMain, reviewsById } from './review';
import { bestBooks } from './books';
import { banners } from './banner';

// 배열의 데이터 제거시 모킹서버 중단
const handlers = [reviewsById, addReview, reviewForMain, bestBooks, banners];

// main.tsx 참고
export const worker = setupWorker(...handlers);
