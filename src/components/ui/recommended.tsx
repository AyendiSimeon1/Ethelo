"use client";
export default function RecommendedJobs() {
    
    const jobs = [
        {
            id: 1,
            date: '20 May, 2023',
            company: 'Amazon',
            role: 'Senior UI/UX Designer',
            pay: '$250/hr',
            location: 'San Francisco, CA',
            tags: ['Part time', 'Senior level', 'Distant', 'Project work'],
            color: 'bg-orange-100',
        },
        {
            id: 2,
            date: '4 Feb, 2023',
            company: 'Google',
            role: 'Junior UI/UX Designer',
            pay: '$150/hr',
            location: 'California, CA',
            tags: ['Full time', 'Junior level', 'Distant', 'Flexible Schedule'],
            color: 'bg-green-100',
        },
        {
            id: 3,
            date: '29 Jan, 2023',
            company: 'Dribbble',
            role: 'Senior Motion Designer',
            pay: '$260/hr',
            location: 'New York, NY',
            tags: ['Part time', 'Senior level', 'Full Day'],
            color: 'bg-purple-100',
        },
        {
            id: 4,
            date: '11 Apr, 2023',
            company: 'Twitter',
            role: 'UX Designer',
            pay: '$120/hr',
            location: 'California, CA',
            tags: ['Full time', 'Middle level', 'Distant', 'Project work'],
            color: 'bg-blue-100',
        },
    ];

    return (
        <section className="p-6 bg-gray-50 mb-8 mx-8 rounded-lg mt-8">
            <h2 className="text-2xl font-semibold font-mono mb-6">Recommended Projects</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {jobs.map((job) => (
                    <div
                        key={job.id}
                        className={`${job.color} p-6 rounded-lg shadow-md transform transition duration-200 hover:scale-105`}
                    >
                        <div className="text-sm text-gray-500 font-mono mb-2">{job.date}</div>
                        <h3 className="text-lg font-bold text-gray-800 font-mono">{job.role}</h3>
                        <p className="text-sm text-gray-700 font-mono">{job.company}</p>
                        <div className="my-4 space-y-2">
                            {job.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="inline-block bg-gray-200 text-gray-700 text-xs font-mono px-2 py-1 rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className="font-semibold text-gray-900 font-mono">{job.pay}</div>
                        <div className="text-sm text-gray-500 font-mono">{job.location}</div>
                        <button className="mt-4 bg-black text-white py-1 px-4 rounded-lg text-sm font-mono transition duration-200 hover:bg-gray-800">
                            Details
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}