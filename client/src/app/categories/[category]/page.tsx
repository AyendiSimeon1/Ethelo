import { notFound } from 'next/navigation';
import { getCategories, getJobsByCategory } from '@/utils/db';
// import { JobCard } from '@/components/card/ProjectCard';

export async function generateStaticParams () {
    const categories = await getCategories();
    return categories.map((category: { slug: any; }) => ({
        category: category.slug,
    }))
}

export default async function CategoryPage({
    params
}: {
    params: { category: string }
}) {
    const categories = await getCategories()
    const category = categories.find((c: { slug: string; }) => c.slug === params.category)

    if(!category) {
        notFound()
    }

    const jobs = await getJobsByCategory(params.category)
    return (
        <div className='max-w-7xl mx-auto px-4 py-8'>
            <div className='mb-8'>
                <h1 className='text-3xl font-bold mb-2'>
                    {category.name} Jobs
                </h1>
                <p className="text-gray-600">
                    {category.description} • {category.count} opportunities available
                </p>
            </div>
            {/* <div className='space-y-6'>
                {jobs.map((job: { id: any; }) => (
                    <JobCard key={job.id} job={job} />
                ))}
            </div> */}
        </div>
    )
}