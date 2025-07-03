import { Metadata } from 'next';
import FreelancerListClient, { CustomUser } from './FreelancerListClient';

export const metadata: Metadata = {
  title: 'Freelancers - ProLink',
  description: 'Шилдэг чөлөөт ажилчдын жагсаалт',
};

export default async function FreelancePage() {
  const res = await fetch(`${process.env.BASE_URL}/api/account/user/all`, { cache: 'no-store' });
  let users: CustomUser[] = [];
  if (res.ok) {
    const data = await res.json();
    if (data.success) {
      const filteredUsers = data.data.users.filter((user: CustomUser) => !user.companyName);
      users = filteredUsers.sort((a: CustomUser, b: CustomUser) => b.profileViews - a.profileViews);
    }
  }
  return <FreelancerListClient initialUsers={users} />;
}
