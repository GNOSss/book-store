import { Book } from '@/models/book.model';
import { faker } from '@faker-js/faker';
import { HttpResponse, http } from 'msw';

export const bestBooksData: Book[] = Array.from({ length: 10 }).map((_, index) => ({
  id: index,
  title: faker.lorem.sentence(),
  image: faker.helpers.rangeToNumber({ min: 100, max: 200 }),
  category_id: faker.helpers.rangeToNumber({ min: 0, max: 2 }),
  form: '종이책',
  isbn: faker.commerce.isbn(),
  summary: faker.lorem.paragraph(),
  detail: faker.lorem.paragraph(),
  author: faker.person.firstName(),
  pages: faker.helpers.rangeToNumber({ min: 100, max: 500 }),
  contents: faker.lorem.paragraph(),

  price: faker.helpers.rangeToNumber({ min: 10000, max: 50000 }),
  likes: faker.helpers.rangeToNumber({ min: 0, max: 100 }),

  pub_date: faker.date.past().toISOString(),
}));

// 메인화면_베스트섹션
export const bestBooks = http.get('http://localhost:3000/books/best', () => {
  return HttpResponse.json(bestBooksData, {
    status: 200,
  });
});
