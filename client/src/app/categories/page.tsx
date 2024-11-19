import Link from 'next/link';
import { getCategories } from '@/utils/db';
import { Palette, Code, TrendingUp, Briefcase } from 'lucide-react';

const iconMap = {
    palette: Palette,
    code: Code,
    'trending-up': TrendingUp,
    briefcase: Briefcase
}

export default async function CategoriesPage () {

    const categories = await getCategories();

    return (
        <div className='max-w-7xl mx-auto px-4 py-12'>
            <h1 className='text-4xl font-bold text-center mb-4'>
                Browse Projects by Category
            </h1>
            <p className='text-gray-600 text center mb-12'>
                Expore opportunites across different fields and industries
            </p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {categories.map((category) => {
                    const IconComponent = iconMap[category.icon as keyof typeof iconMap]
                    return (
                        <Link 
                            key={category.id}
                            href={`/categories/${category.slug}`}
                            className='block group'
                        >
                            <div className='bg-white rounded-lg shadow-md p-6 hover:shadow-lg hover:shadow-lg transition-shadow'>
                                <div className='flex items-center justify-between mb-4'>
                                    <div className='p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors'>
                                        <IconComponent className='w-6 h-6 text-blue-600' />
                                    </div>
                                    <span className='text-gray-600'>
                                        {category.count} jobs
                                    </span>
                                </div>
                                <h2 className='text-xl font-semibold mb-2 mb-2 text-gray-900'>
                                    {category.name}
                                </h2>
                                <p className='text-gray-600'>
                                    {category.description}
                                </p>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}