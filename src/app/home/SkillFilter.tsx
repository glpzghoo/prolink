'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { skill } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useRef } from 'react';

export default function SkillFilter({ skills }: { skills: skill[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = searchParams.getAll('skill');

  const toggleSkill = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const current = params.getAll('skill');
    if (current.includes(id)) {
      const filtered = current.filter((s) => s !== id);
      params.delete('skill');
      filtered.forEach((s) => params.append('skill', s));
    } else {
      params.append('skill', id);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const clear = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('skill');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const scrollLeft = () => {
    if (containerRef.current) containerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
  };
  const scrollRight = () => {
    if (containerRef.current) containerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Button onClick={scrollLeft} variant="outline" size="icon">
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <div ref={containerRef} className="flex overflow-x-auto gap-2 scrollbar-hide py-2">
          {skills.map((sk) => (
            <button
              key={sk.id}
              onClick={() => toggleSkill(sk.id)}
              className={`px-3 py-1 text-sm rounded-full border whitespace-nowrap ${
                selected.includes(sk.id)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background text-foreground'
              }`}
            >
              {sk.name}
            </button>
          ))}
        </div>
        <Button onClick={scrollRight} variant="outline" size="icon">
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
      {selected.length > 0 && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Шүүлтүүр:</span>
          {selected.map((id) => (
            <span key={id} className="px-2 py-0.5 bg-muted rounded-full">
              {skills.find((s) => s.id === id)?.name}
            </span>
          ))}
          <button onClick={clear} className="flex items-center gap-1 text-red-500">
            <X className="w-3 h-3" /> Цэвэрлэх
          </button>
        </div>
      )}
    </div>
  );
}
