import { Metadata } from "next";
import ProfileClient from "./ProfileClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const res = await fetch(
    `${process.env.BASE_URL}/api/freelancers/id?id=${id}`,
    { cache: "no-store" }
  );
  if (!res.ok) return { title: "Freelancer - ProLink" };
  const data = await res.json();
  if (!data.success) return { title: "Freelancer - ProLink" };
  const user = data.data.user;
  return {
    title: `${user.lastName} ${user.firstName} - ProLink`,
    description: user.about || `${user.lastName} ${user.firstName} профайл`,
  };
}

export default function Page() {
  return <ProfileClient />;
}
