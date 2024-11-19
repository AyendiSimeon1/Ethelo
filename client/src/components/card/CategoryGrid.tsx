

import React from 'react';
import CategoryCard  from '@/components/card/CategoryCard';
import type { Category } from '@/types/category';

export const CategoryGrid = ({ categories }: { categories: Category[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
};