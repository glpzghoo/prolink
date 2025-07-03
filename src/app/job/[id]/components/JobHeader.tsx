import { calculateTime } from '@/lib/helper';
import Link from 'next/link';
import { GoDotFill } from 'react-icons/go';
import { Button } from '@mui/material';
import { CustomJob } from '../../types';

interface JobHeaderProps {
  post: CustomJob;
  copyURL: () => void;
}

export default function JobHeader({ post, copyURL }: JobHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span
            className={`text-sm font-medium ${post.status === 'ACTIVE' ? 'text-foreground' : 'text-pink-400'} flex items-center gap-1`}
          >
            {post.status === 'ACTIVE' ? (
              <>
                Идэвхитэй зар <GoDotFill className="animate-ping" />
              </>
            ) : (
              'Идэвхигүй зар'
            )}
          </span>
        </div>
        <h1 className="text-2xl font-bold text-foreground">{post.title}</h1>
        <div className="flex flex-col sm:flex-row gap-2 text-sm text-foreground">
          <span>
            Нийтэлсэн:{' '}
            <Link href={`/client/${post.poster.id}`} className="hover:underline">
              <span
                className={`font-semibold ${post.poster.emailVerified ? 'text-foreground' : 'text-red-600'}`}
                title={
                  post.poster.emailVerified ? 'Баталгаажсан хэрэглэгч' : 'Баталгаажаагүй хэрэглэгч'
                }
              >
                {post.poster.companyName}
              </span>
            </Link>
          </span>
          <span>· {calculateTime(post.postedAt)}</span>
        </div>
      </div>
      <Button onClick={copyURL} sx={{ color: 'green' }} className="flex gap-1">
        <div className="text-foreground hover:text-foreground text-sm border cursor-pointer border-gray-300 rounded px-3 py-2">
          Хуваалцах
        </div>
      </Button>
    </div>
  );
}
