import { CustomUser } from '../types';

export default function ProfileStats({
  user,
  avgRating,
}: {
  user: CustomUser;
  avgRating: () => number;
}) {
  return (
    <div className="flex flex-wrap gap-4 text-sm text-foreground border-b pb-4 mb-6">
      <span>
        Энэ profile нийт <span className=" font-bold">{user.profileViews}</span> үзэлттэй байна!
      </span>
      <span>·</span>
      <span>
        <strong>{user.reviewee.length}</strong> үнэлгээ
      </span>
      <span>·</span>
      <span>
        Дундаж үнэлгээ: <span className=" font-bold"> {avgRating()} </span>/5
      </span>
    </div>
  );
}
