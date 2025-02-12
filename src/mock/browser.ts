import { setupWorker } from 'msw/browser';
import { addReview, reviewsById } from './review';

// reviewsById 제거시 모킹서버 중단
const handlers = [reviewsById, addReview];

// main.tsx 참고
export const worker = setupWorker(...handlers);
