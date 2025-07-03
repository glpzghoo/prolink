import { CustomFeaturedSkill } from '@/app/freelancer/[id]/types';
import { Button } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export const FeaturedSkillsetup = ({
  skill,
  deleteSkill,
  loading2,
  deletingItem,
  setdeletingItem,
}: {
  skill: CustomFeaturedSkill;
  deleteSkill: (id: string) => void;
  loading2: boolean;
  deletingItem: string;
  setdeletingItem: Dispatch<SetStateAction<string>>;
}) => {
  const startedAt = skill.startedAt;
  const endedAt = skill.endedAt ? skill.endedAt : null;

  const calculateYears = (end: string, start: string): string => {
    const yeardif = new Date(end).getFullYear() - new Date(start).getFullYear();
    const montdef = new Date(end).getMonth() - new Date(start).getMonth();
    const totalMonths = yeardif * 12 + montdef;
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    if (months === 0 && years > 0) {
      return `${years}`;
    }
    return years > 0 ? `${years}.${months}` : `${months}`;
  };

  return (
    <div className="bg-background rounded-xl shadow-md p-6 border border-gray-200 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-foreground">{skill.skill.name}</h3>
          <div className="text-sm text-foreground flex items-center gap-2">
            <span className="font-medium">Туршлага:</span>
            <span>
              {startedAt.split('T')[0]} - {skill.present ? 'Одоог хүртэл' : endedAt?.split('T')[0]}
              {endedAt && (
                <span className="ml-2 text-foreground0">
                  ({calculateYears(endedAt, startedAt)} жил)
                </span>
              )}
            </span>
          </div>
        </div>
      </div>

      <div className="text-foreground text-base leading-relaxed">{skill.detail}</div>

      <div className="flex justify-end mt-2">
        <Button
          disabled={loading2}
          onClick={() => {
            setdeletingItem(skill.id);
            deleteSkill(skill.id);
          }}
          sx={{
            color: loading2 && deletingItem === skill.id ? '#9ca3af' : '#dc2626',
            fontSize: '12px',
            padding: '4px 12px',
            borderRadius: '6px',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: loading2 ? 'transparent' : 'rgba(220, 38, 38, 0.04)',
            },
            '&:disabled': { color: '#9ca3af' },
          }}
        >
          {loading2 && deletingItem === skill.id ? <>Түр хүлээнэ үү...</> : <>Устгах</>}
        </Button>
      </div>
    </div>
  );
};
