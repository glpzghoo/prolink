'use client';
import { CustomUser as FUser } from '../freelancer/FreelancerListClient';
import { CustomUser as CUser } from '../client/ClientListClient';
import { CustomJob } from '../job/types';
import { skill } from '@prisma/client';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import SkillFilter from './SkillFilter';
import FreelancerSection from './FreelancerSection';
import JobSection from './JobSection';
import ClientSection from './ClientSection';

interface Props {
  skills: skill[];
  freelancers: FUser[];
  clients: CUser[];
  jobs: CustomJob[];
}

export default function HomePageClient({ skills, freelancers, clients, jobs }: Props) {
  const searchParams = useSearchParams();
  const selected = searchParams.getAll('skill');

  const filterBySkill = <T extends { skill: { id: string }[] }>(items: T[]) => {
    if (selected.length === 0) return items;
    return items.filter((item) =>
      item.skill.some((s) => selected.includes(s.id))
    );
  };

  const fFiltered = useMemo(() => filterBySkill(freelancers), [freelancers, selected]);
  const cFiltered = useMemo(() => filterBySkill(clients), [clients, selected]);
  const jFiltered = useMemo(() => filterBySkill(jobs), [jobs, selected]);

  return (
    <div className="space-y-10 px-4 py-6 max-w-7xl mx-auto">
      <SkillFilter skills={skills} />
      <FreelancerSection users={fFiltered} />
      <JobSection posts={jFiltered} />
      <ClientSection users={cFiltered} />
    </div>
  );
}
