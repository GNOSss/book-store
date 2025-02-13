import { Banner } from '@/models/banner.model';
import { http, HttpResponse } from 'msw';

const bannersData: Banner[] = [
  {
    id: 1,
    title: 'NEW ARRIVALS',
    description: '20% OFF',
    image: 'https://picsum.photos/id/52/1200/400',
    url: 'https://some.url',
    target: '_self',
  },
  {
    id: 2,
    title: 'TOP RATED',
    description: '15% OFF',
    image: 'https://picsum.photos/id/156/1200/400',
    url: 'https://some.url',
    target: '_blank',
  },
  {
    id: 3,
    title: 'FEATURED BOOKS',
    description: '10% OFF',
    image: 'https://picsum.photos/id/123/1200/400',
    url: 'https://some.url',
    target: '_blank',
  },
];

export const banners = http.get('http://localhost:3000/banners', () => {
  return HttpResponse.json(bannersData, {
    status: 200,
  });
});
