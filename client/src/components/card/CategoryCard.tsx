import React, { useEffect } from 'react';
import { Palette, Code, TrendingUp, Briefcase } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { getCategories } from '@/redux/categoryReducer';

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  count: number;
};

const iconMapping = {
  palette: Palette,
  code: Code,
  'trending-up': TrendingUp,
  briefcase: Briefcase,
};
const CategoryCard = () => {
  const dispatch = useAppDispatch();
  const { data: categories = [], isLoading, error } = useAppSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  if (isLoading) return <p>Loading categories...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {categories.map((category: { _id: React.Key | null | undefined; title: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; description: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }) => (
        <div key={category._id} className="category-card">
          <h3>{category.title}</h3>
          <p>{category.description}</p>
        </div>
      ))}
    </div>
  );
};

export default CategoryCard;