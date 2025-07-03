import { Metadata } from 'next';
import JobListClient from './JobListClient';
import { CustomJob } from './[id]/page';

export const metadata: Metadata = {
  title: 'Jobs - ProLink',
  description: 'Ажлын зарууд',
};

export default async function JobPage() {
  const res = await fetch(`${process.env.BASE_URL}/api/job/allposts`, { cache: 'no-store' });
  let posts: CustomJob[] = [];
  if (res.ok) {
    const data = await res.json();
    if (data.success) posts = data.data.posts;
  }
  return <JobListClient posts={posts} />;
}
