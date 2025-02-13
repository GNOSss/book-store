import { BookReviewItem } from '@/models/book.model';
import { http, HttpResponse } from 'msw';
import { fakerKO as faker } from '@faker-js/faker';

const mockReviewdata: BookReviewItem[] = Array.from({ length: 8 }).map((_, index) => ({
  id: index,
  userName: `${faker.person.lastName()}${faker.person.firstName()}`,
  content: faker.lorem.paragraph(),
  createdAt: faker.date.past().toISOString(),
  score: faker.helpers.rangeToNumber({ min: 1, max: 5 }),
}));

/* browser.ts의 handler에 들어갈 데이터
 * method()의 1번째 인자 : API 서버 엔드포인트
 * 2번째 인자 : 응답 함수 , HttpResponse메서드로 JSON형식으로 데이터를 받는다
 * 커스텀이 가능하고 이번 코드에서는 status만 설정했다.
 */
export const reviewsById = http.get(`http://localhost:3000/reviews/:bookId`, () => {
  return HttpResponse.json(mockReviewdata, {
    status: 200,
  });
});

export const addReview = http.post(`http://localhost:3000/reviews/:bookId`, () => {
  return HttpResponse.json(
    {
      message: '리뷰가 등록되었습니다.',
    },
    {
      status: 201,
    }
  );
});

// 메인화면_리뷰섹션
export const reviewForMain = http.get('http://localhost:3000/reviews', () => {
  return HttpResponse.json(mockReviewdata, {
    status: 200,
  });
});


