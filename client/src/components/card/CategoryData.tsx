
import getCategories from '@/utils/db';

export default  function Cat() {
    const categories = getCategories();
    
    return (
      <main className="container mx-auto py-8">
      <h1>Hi</h1>
      </main>
    );
  }