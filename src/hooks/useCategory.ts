import { useEffect, useState } from 'react';
import { Category } from '../models/category.model';
import { fetchCategory } from '../api/category.api';

export const useCategory = () => {
  const [category, setCategory] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategory().then((category) => {
      if (!category) return;

      const categoryWithAll = [{ category_id: null, category_name: '전체' }, ...category];

      console.log(categoryWithAll);
      setCategory(categoryWithAll);
    });
  }, []);

  return { category }; // 객체 형태로 반환하기 때문에 { category }로 반환 , 나중에 {category} = useCategory(); 처럼 구조 분해 할당 가능
};
