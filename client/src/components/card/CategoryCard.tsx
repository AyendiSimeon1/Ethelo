"use client";
import React, { useEffect } from 'react';
import { Palette, Code, TrendingUp, Briefcase } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { getCategories } from '@/redux/categoryReducer';

type IconMapping = {
  [key: string]: React.ComponentType<any>;
};

const iconMapping: IconMapping = {
  palette: Palette,
  code: Code,
  'trending-up': TrendingUp,
  briefcase: Briefcase,
};

const CategoryCard = () => {
  const dispatch = useAppDispatch();
  const { data: categories, isLoading, error } = useAppSelector((state) => {
    console.log('🔍 Full Redux State:', state);
    return state.category;
  });

  useEffect(() => {
    console.log('🚀 CategoryCard Component Mounted');
    
    const fetchCategories = async () => {
      try {
        console.log('📦 Dispatching getCategories');
        const result = await dispatch(getCategories());
        
        console.log('📥 Dispatch Result:', {
          type: result.type,
          payload: result.payload,
          // error: result?.error
        });
      } catch (dispatchError) {
        console.error('❌ Dispatch Error:', dispatchError);
      }
    };

    fetchCategories();
  }, [dispatch]);

  // Extensive logging for rendering states
  useEffect(() => {
    console.log('🔄 Categories State Changed', {
      categoriesCount: categories.length,
      isLoading,
      error
    });
  }, [categories, isLoading, error]);

  if (isLoading) {
    console.log('⏳ Rendering Loading State');
    return <p>Loading categories...</p>;
  }

  if (error) {
    console.error('❌ Rendering Error State:', error);
    return <p>Error: {error}</p>;
  }

  console.log('🖼️ Rendering Categories:', categories);

  return (
    <div className="p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category, index) => {
        const Icon = iconMapping[category.icon] || Palette;
        
        console.log(`🏷️ Rendering Category ${index}:`, category);
        
        return (
          <div 
            key={category.id} 
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <Icon className="w-10 h-10 mb-3 text-blue-500" />
            <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
            <p className="text-gray-600">{category.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryCard;