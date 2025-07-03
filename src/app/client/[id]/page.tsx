import { Metadata } from "next";

async function getData(id: string) {
  const res = await fetch(`http://localhost:3000/api/freelancers/id?id=${id}`, { cache: "no-store" });
  const json = await res.json();
  return json.data.user as any;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const user = await getData(params.id);
  const title = user.companyName || `${user.firstName} ${user.lastName}`;
  return {
    title: `${title} | ProLink`,
    description: user.about?.slice(0, 160) || "Profile",
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const user = await getData(params.id);
  if (!user) return <div className="p-4">User not found</div>;
  const title = user.companyName || `${user.firstName} ${user.lastName}`;
  return (
    <div className="bg-white p-4">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="mb-4">{user.about}</p>
      <h2 className="font-semibold mb-2">Сэтгэгдэл</h2>
      <ul className="space-y-2">
        {user.reviewee.map((rev: any) => (
          <li key={rev.id} className="border-b pb-2">
            <strong>{rev.reviewer.companyName || rev.reviewer.firstName}:</strong> {rev.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
