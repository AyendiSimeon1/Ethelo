import  CategoryCard  from '@/components/card/CategoryCard';
import  { CategoryGrid }  from '@/components/card/CategoryGrid';
import getCategories from '@/utils/db';

export default  function Cat() {
    const categories = getCategories();
    
    return (
      <main className="container mx-auto py-8">
        <CategoryGrid categories={categories} />
      </main>
    );
  }