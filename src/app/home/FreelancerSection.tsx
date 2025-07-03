'use client';
import { CustomUser } from '../freelancer/FreelancerListClient';
import { ClientCard } from '../_component/ ClientPostCard';
import { useDragScroll } from './useDragScroll';

export default function FreelancerSection({ users }: { users: CustomUser[] }) {
  const { ref, onMouseDown, onMouseLeave, onMouseMove, onMouseUp } = useDragScroll<HTMLDivElement>();
  if (users.length === 0) return null;
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">Чөлөөт ажилчид</h2>
      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto cursor-grab active:cursor-grabbing py-2"
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {users.map((u) => (
          <ClientCard key={u.id} user={u} />
        ))}
      </div>
    </section>
  );
}
