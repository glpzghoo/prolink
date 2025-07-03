'use client';
import { CustomUser } from '../client/ClientListClient';
import { useDragScroll } from './useDragScroll';
import HomeClientCard from './cards/HomeClientCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ClientSection({ users }: { users: CustomUser[] }) {
  const { ref, onMouseDown, onMouseLeave, onMouseMove, onMouseUp } = useDragScroll<HTMLDivElement>();
  if (users.length === 0) return null;
  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between">
        <h2 className="text-xl font-semibold text-foreground">Компаниуд</h2>
        <Link href="/client">
          <Button variant="link" size="sm" className="p-0">
            Дэлгэрэнгүй
          </Button>
        </Link>
      </div>
      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing py-2"
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
