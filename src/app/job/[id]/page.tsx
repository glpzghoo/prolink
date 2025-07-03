import { Metadata } from 'next';
import JobDetailClient from './JobDetailClient';
import { CustomJob } from '../types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const res = await fetch(`${process.env.BASE_URL}/api/job/post?id=${id}`, { cache: 'no-store' });
  if (!res.ok) return { title: 'Job - ProLink' };
  const data = await res.json();
  if (!data.success) return { title: 'Job - ProLink' };
  const post: CustomJob = data.data.post;
  const salaryUnit =
    post.salaryRate === 'MONTH' ? 'сар' : post.salaryRate === 'DAY' ? 'өдөр' : 'цаг';
  const desc = post.description ? post.description.slice(0, 160) : `${post.title} ажлын зар`;
  return {
    title: `${post.title} - ProLink`,
    description: `${post.salary}/${salaryUnit} - ${desc}`,
  };
}

export default function Page() {
  return <JobDetailClient />;
}
