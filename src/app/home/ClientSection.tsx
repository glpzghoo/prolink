'use client';

import { useDragScroll } from './useDragScroll';
import HomeClientCard from './cards/HomeClientCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CustomUser } from '../freelancer/FreelancerListClient';

export default function ClientSection({ users }: { users: CustomUser[] }) {
  const { ref, onMouseDown, onMouseLeave, onMouseMove, onMouseUp } =
    useDragScroll<HTMLDivElement>();

  if (users.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Компаниуд</h2>
        <Link href="/client">
          <Button variant="link" size="sm" className="text-sm text-primary">
            Дэлгэрэнгүй
          </Button>
        </Link>
      </div>
      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto px-1 py-2 scrollbar-none cursor-grab active:cursor-grabbing"
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {users.map((u) => (
          <HomeClientCard key={u.id} user={u} />
        ))}
      </div>
    </section>
  );
}
