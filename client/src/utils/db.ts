import { Category, Project, ProjectPosting } from '@/types/category';

export default function getCategories(): Category[] {
  return [
    {
      id: '1',
      name: 'Design',
      slug: 'design',
      description: 'UI/UX, Graphic Design, Product Design',
      icon: 'palette',
      count: 25
    },
    {
      id: '2',
      name: 'Engineering',
      slug: 'engineering',
      description: 'Software Development, DevOps, QA',
      icon: 'code',
      count: 45
    },
    {
      id: '3',
      name: 'Marketing',
      slug: 'marketing',
      description: 'Digital Marketing, Content, SEO',
      icon: 'trending-up',
      count: 30
    },
    {
      id: '4',
      name: 'Sales',
      slug: 'sales',
      description: 'Sales Development, Account Management',
      icon: 'briefcase',
      count: 20
    }
  ];
}