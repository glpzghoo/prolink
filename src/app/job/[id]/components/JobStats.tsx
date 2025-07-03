import { CustomJob, CustomUser } from '../../types';

const avgRating = (user: CustomUser) => {
  if (!user.reviewee || user.reviewee.length === 0) return 0;
  const total = user.reviewee.reduce((prev, acc) => prev + acc.rating, 0);
  return Number((total / user.reviewee.length / 20).toFixed(1));
};

export default function JobStats({ post }: { post: CustomJob }) {
  return (
    <div className="flex flex-wrap gap-4 text-sm text-foreground border-b pb-4 mb-6">
      <div>
        Пост <span className=" font-bold">{post.jobPostView}</span> үзэлттэй байна,
      </div>
      <span>·</span>
      <div>
        Одоогоор нийт <span className=" font-bold">{post.jobApplication.length}</span> хүн ажиллах
        хүсэлт тавьсан байна!
      </div>
      <span>·</span>
      <div>
        Дундаж: <span className=" font-bold">{avgRating(post.poster)}/5</span>
      </div>
    </div>
  );
}
