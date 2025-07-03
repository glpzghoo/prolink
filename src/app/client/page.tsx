import { Metadata } from "next";
import ClientListClient, { CustomUser } from "./ClientListClient";

export const metadata: Metadata = {
  title: "Clients - ProLink",
  description: "Компаниудын жагсаалт",
};

export default async function ClientPage() {
  const res = await fetch(`${process.env.BASE_URL}/api/account/user/all`, { cache: 'no-store' });
  let users: CustomUser[] = [];
  if (res.ok) {
    const data = await res.json();
    if (data.success) {
      const filtered = data.data.users.filter((user: CustomUser) => user.role === "CLIENT");
      users = filtered.sort((a: CustomUser, b: CustomUser) => b.profileViews - a.profileViews);
    }
  }
  return <ClientListClient initialUsers={users} />;
}
