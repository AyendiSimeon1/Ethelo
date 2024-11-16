import React from 'react';
import { Palette, Code, TrendingUp, Briefcase } from 'lucide-react';

// Type definition for our category data
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

const CategoryCard = ({ category }: { category: Category }) => {
  const IconComponent = iconMapping[category.icon as keyof typeof iconMapping];

  return (
    
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {IconComponent && (
              <div className="p-2 bg-blue-100 rounded-lg">
                <IconComponent className="h-5 w-5 text-blue-600" />
              </div>
            )}
            <h3 className="text-xl font-semibold text-gray-900">{category.name}</h3>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
            {category.count} items
          </span>
        </div>
        <p className="text-sm text-gray-500">
          {category.description}
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;