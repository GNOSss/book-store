export interface Banner {
  id: number;
  title: string;
  description: string;
  image: string;        // 이미지 url
  url: string;          // 배너 클릭시 이동 할 url
  target: string;       // 이동 할 Url의 타겟
}
