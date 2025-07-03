import { Metadata } from 'next';
import HomePageClient from './home/HomePageClient';
import { skill } from '@prisma/client';
import { CustomUser as FUser } from './freelancer/FreelancerListClient';
import { CustomJob } from './job/types';

export const metadata: Metadata = {
  title: 'ProLink - Нүүр хуудас',
  description: 'Чадварлаг мэргэжилтнүүд, ажлын зарууд, компаниудыг нэг дороос.',
};

export default async function Home() {
  const [skillRes, userRes, jobRes] = await Promise.all([
    fetch(`${process.env.BASE_URL}/api/skills`, { cache: 'no-store' }),
    fetch(`${process.env.BASE_URL}/api/account/user/all`, { cache: 'no-store' }),
    fetch(`${process.env.BASE_URL}/api/job/allposts`, { cache: 'no-store' }),
  ]);

  let skills: skill[] = [];
  let users: FUser[] = [];
  let jobs: CustomJob[] = [];

  if (skillRes.ok) {
    const data = await skillRes.json();
    if (data.success) skills = data.data.skills;
  }

  if (userRes.ok) {
    const data = await userRes.json();
    if (data.success) users = data.data.users;
  }

  if (jobRes.ok) {
    const data = await jobRes.json();
    if (data.success) jobs = data.data.posts;
  }

  const freelancers = users.filter((u) => !u.companyName);
  const clients = users.filter((u) => u.role === 'CLIENT');

  return (
    <HomePageClient skills={skills} freelancers={freelancers} clients={clients} jobs={jobs} />
  );
}
